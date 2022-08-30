"use strict";

/**
 * live-location service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::live-location.live-location", ({ strapi }) => ({
  latest: async () => {
    return await strapi.db.query("api::live-location.live-location").findOne({
      select: ["timestamp"],
      orderBy: { timestamp: "desc" },
      populate: { location: "*" },
    });
  },
}));
