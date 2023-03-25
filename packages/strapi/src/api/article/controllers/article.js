/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.request.params

    const entry = await strapi.entityService.findOne("api::article.article", id, {
      fields: ["likes"],
    })
    const likes = Number.parseInt(entry.likes || 0, 10)

    const updatedEntry = await strapi.entityService.update("api::article.article", id, {
      data: {
        likes: likes + 1,
      },
      fields: ["likes"],
    })

    return { likes: Number.parseInt(updatedEntry.likes, 10) }
  },
  async getLikes(ctx) {
    const { id } = ctx.request.params

    const entry = await strapi.entityService.findOne("api::article.article", id, {
      fields: ["likes"],
    })
    const likes = Number.parseInt(entry.likes || 0, 10)

    return { likes }
  },
}))
