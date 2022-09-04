"use strict";

/**
 *  live-location controller
 */

const { lineString, point } = require("@turf/helpers");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::live-location.live-location", ({ strapi }) => ({
  latest: async () => {
    const latest = await strapi.service("api::live-location.live-location").latest();

    return (
      latest &&
      point([latest.location.longitude, latest.location.latitude], {
        timestamp: latest.timestamp,
      })
    );
  },
  history: async () => {
    const locations = await strapi.service("api::live-location.live-location").history();

    return (
      locations.length &&
      lineString(
        locations.map((loc) => [loc.location.longitude, loc.location.latitude]),
        { times: locations.map((loc) => loc.timestamp) }
      )
    );
  },
}));
