import rss from "@astrojs/rss"

import { getArticleList } from "../data/get-article-list"

const articles = await getArticleList()
export const get = async () =>
  rss({
    title: "treten.reisen Blog",
    description: "Der Blog für meine Fahrradtour 8000 km um die Ostsee",
    site: import.meta.env.SITE,
    items: articles.data.map(post => ({
      link: import.meta.env.BASE_URL + post.attributes.slug,
      title: post.attributes.title,
      pubDate: post.attributes.publishedAt || new Date(),
    })),
    customData: `<language>de-de</language>`,
    stylesheet: "/rss/styles.xsl",
  })
