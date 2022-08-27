"use strict";

/**
 * live-location service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::live-location.live-location");
