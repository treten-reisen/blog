"use strict";

/**
 *  live-location controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::live-location.live-location", ({ strapi }) => ({
  async update(ctx) {
    const curr = await strapi.service("api::live-location.live-location").find({ populate: "*" });

    const newValues = [{ location: ctx.request.body, timestamp: Date.now() }, ...curr.values].map((timedLoc) => ({
      ...timedLoc,
    }));

    const result = await strapi
      .service("api::live-location.live-location")
      .createOrUpdate({ data: { values: newValues }, populate: "*" });

    return { data: ctx.request.body };
  },
}));
