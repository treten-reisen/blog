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
    WHERE l.longitude!=l.last_longitude 
    OR l.latitude!=l.last_latitude
    `)
    return resp
  },
}))
