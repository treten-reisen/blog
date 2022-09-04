"use strict";

/**
 * live-location service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::live-location.live-location", ({ strapi }) => ({
  latest: async () => {
    return (
      await strapi.entityService.findMany("api::live-location.live-location", {
        fields: ["timestamp"],
        sort: { timestamp: "DESC" },
        populate: { location: "*" },
      })
    )[0];
  },
  history: async () => {
    return await strapi.entityService.findMany("api::live-location.live-location", {
      fields: ["timestamp"],
      sort: { timestamp: "DESC" },
      populate: { location: "*" },
    });
  },
}));
