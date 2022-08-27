"use strict";

/**
 *  live-location controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::live-location.live-location", ({ strapi }) => ({
  async update(ctx) {
    const curr = await strapi.service("api::live-location.live-location").find({ populate: "*" });

    const newValues = [ctx.request.body, ...curr.values];

    const result = await strapi
      .service("api::live-location.live-location")
      .createOrUpdate({ data: { values: newValues }, populate: "*" });

    return { data: ctx.request.body };
  },
}));
