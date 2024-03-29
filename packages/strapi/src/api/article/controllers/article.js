/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories

const getArticleLikes = async (strapi, id) => {
  let entry = (
    await strapi.entityService.findMany("api::article-likes.article-likes", {
      filters: {
        article: {
          id: {
            $eq: id,
          },
        },
      },
      fields: ["count"],
    })
  )[0]

  if (!entry) {
    entry = await strapi.entityService.create("api::article-likes.article-likes", {
      data: {
        article: id,
        count: 0,
      },
    })
  }

  return { count: Number.parseInt(entry?.count || 0, 10), id: entry.id }
}

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.request.params

    const { count, id: likesId } = await getArticleLikes(strapi, id)

    const updatedEntry = await strapi.entityService.update("api::article-likes.article-likes", likesId, {
      data: {
        count: count + 1,
      },
      fields: ["count"],
    })

    return { likes: Number.parseInt(updatedEntry.count, 10) }
  },
  async getLikes(ctx) {
    const { id } = ctx.request.params
    const { count } = await getArticleLikes(strapi, id)
    return { likes: count }
  },
}))
