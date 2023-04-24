/**
 * live-location service.
 */

const { createCoreService } = require("@strapi/strapi").factories

module.exports = createCoreService("api::live-location.live-location", ({ strapi }) => ({
  async latest() {
    return (
      await strapi.entityService.findMany("api::live-location.live-location", {
        fields: ["timestamp"],
        sort: { timestamp: "DESC" },
        populate: { location: "*" },
      })
    )[0]
  },
  async history() {
    strapi.log.info(`Trying to get history from db...`)

    const latest = await strapi.entityService
      .findMany("api::live-location.live-location", {
        fields: ["timestamp"],
        sort: { timestamp: "DESC" },
        populate: { location: "*" },
      })
      .then(it => it[0])

    const resp = await strapi.db.connection.raw(`
    SELECT timestamp, longitude, latitude FROM (
      SELECT *, 
        lag(longitude) over (order by timestamp desc) as last_longitude,
        lag(latitude) over (order by timestamp desc) as last_latitude
        FROM (
          SELECT * 
        FROM live_locations l 
        JOIN live_locations_components comps 
        ON comps.entity_id=l.id
        JOIN components_shared_locations comp
        ON comp.id=comps.component_id
        WHERE comps.component_type='shared.location'
        ORDER BY timestamp DESC
        ) AS loc) AS l
    WHERE (l.longitude!=l.last_longitude OR l.latitude!=l.last_latitude)
    AND (l.timestamp >= '2023-04-03')
    ORDER BY timestamp DESC
    `)

    // this is needed because raw responses differ from the local sqlite to the production postgres db
    // postgres: { rows: [..data] }
    // sqlite: [...data]
    const data = resp && resp.rows ? resp.rows : resp || []

    strapi.log.info(`Executed history query. Count: ${data.length}`)
    return [latest.location, ...data]
  },
  async nights() {
    const resp = await strapi.db.connection.raw(`
    SELECT night_time, comp.longitude, comp.latitude FROM (
      SELECT 
        distinct max(timestamp) OVER (PARTITION BY date(timestamp)) as night_time
      FROM live_locations
	  WHERE timestamp < CURRENT_DATE
    ) AS l
    JOIN live_locations loc
    ON loc.timestamp=l.night_time
    JOIN live_locations_components comps 
    ON comps.entity_id=loc.id
    JOIN components_shared_locations comp
    ON comp.id=comps.component_id
    WHERE comps.component_type='shared.location'
      AND timestamp >= '2023-04-02'
    ORDER BY night_time DESC
    `)

    // this is needed because raw responses differ from the local sqlite to the production postgres db
    // postgres: { rows: [..data] }
    // sqlite: [...data]
    const data = resp && resp.rows ? resp.rows : resp || []

    strapi.log.info(`Executed nights query. Count: ${data.length}`)
    return data
  },
}))
