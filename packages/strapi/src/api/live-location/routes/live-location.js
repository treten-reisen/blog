"use strict";

/**
 * live-location router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::live-location.live-location", { only: ["find"] });
