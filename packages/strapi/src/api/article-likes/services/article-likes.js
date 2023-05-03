/**
 * article-likes service
 */

const { createCoreService } = require("@strapi/strapi").factories

module.exports = createCoreService("api::article-likes.article-likes")
