"use strict";

/**
 *  live-location controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::live-location.live-location", ({ strapi }) => ({
  latest: async () => {
    const latest = await strapi.service("api::live-location.live-location").latest();

    return (
      latest && {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [latest.location.latitude, latest.location.longitude],
        },
        properties: {
          timestamp: latest.timestamp,
        },
      }
    );
  },
}));
