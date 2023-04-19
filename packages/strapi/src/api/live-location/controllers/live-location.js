/**
 *  live-location controller
 */

const { createCoreController } = require("@strapi/strapi").factories
const { lineString, point, featureCollection } = require("@turf/helpers")

module.exports = createCoreController("api::live-location.live-location", ({ strapi }) => ({
  async latest() {
    const latest = await strapi.service("api::live-location.live-location").latest()

    return (
      latest &&
      point([latest.location.longitude, latest.location.latitude], {
        timestamp: latest.timestamp,
      })
    )
  },
  async history(ctx) {
    const locations = await strapi.service("api::live-location.live-location").history()

    if (locations.length < 2) {
      ctx.status = 404
      return "There are less than two locations"
    }

    return lineString(
      locations.map(loc => [loc.longitude, loc.latitude]),
      { times: locations.map(loc => loc.timestamp) }
    )
  },
  async nights(ctx) {
    const locations = await strapi.service("api::live-location.live-location").nights()

    if (locations.length < 2) {
      ctx.status = 404
      return "There are less than two locations"
    }

    return featureCollection(
      locations.map((loc, index) =>
        point([loc.longitude, loc.latitude], { timestamp: loc.night_time }, { id: index + 1 })
      )
    )
  },
}))
