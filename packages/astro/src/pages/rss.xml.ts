import rss from "@astrojs/rss"

import { getArticleList } from "../data/get-article-list"

export async function get() {
  const articles = await getArticleList()

  return rss({
    title: "treten.reisen Blog",
    description: "Meine Fahrradreise 8000 km um die Ostsee",
    site: import.meta.env.SITE,
    items: articles.data.map(article => ({
      title: article.seo.metaTitle || article.title,
      link: `${import.meta.env.BASE_URL}/articles/${article.slug}/index.html`,
      pubDate: article.publishedAt || new Date(),
    })),
    customData: `<language>de-de</language>`,
    stylesheet: "/rss/styles.xsl",
  })
}
