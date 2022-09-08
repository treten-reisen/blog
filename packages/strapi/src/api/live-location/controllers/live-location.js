/**
 *  live-location controller
 */

const { createCoreController } = require("@strapi/strapi").factories
const { lineString, point } = require("@turf/helpers")

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
  async history() {
    const locations = await strapi.service("api::live-location.live-location").history()

    return (
      locations.length &&
      lineString(
        locations.map(loc => [loc.location.longitude, loc.location.latitude]),
        { times: locations.map(loc => loc.timestamp) }
      )
    )
  },
}))
