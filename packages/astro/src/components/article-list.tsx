import * as dateFns from "date-fns"

import type { StrapiArticleListItem } from "../data/get-article-list"

export type ArticleListProps = { articles: StrapiArticleListItem[] }

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-fit-sm sm:gap-responsive lg:grid-cols-fit-lg">
      {articles.map(article => (
        <ArticleListItem item={article} key={article.attributes.slug} />
      ))}
    </div>
  )
}

const ArticleListItem = ({ item }: { item: StrapiArticleListItem }) => {
  return (
    <a href={`/articles/${item.attributes.slug}`} className="flex flex-col space-y-2">
      <header className="flex flex-col space-y-2">
        <img
          src={item.attributes.image.src || undefined}
          alt={item.attributes.image.alt || undefined}
          className="h-52 object-cover lg:h-64"
        />
        <h2 className="font-sans text-lg font-bold tracking-tight text-gray-700">{item.attributes.title}</h2>
      </header>
      <section className="font-sans tracking-tight text-gray-600">{item.attributes.summary}</section>
      <footer className="self-end font-sans text-base tracking-tight text-gray-500">
        {dateFns.intlFormat(
          item.attributes.createdAt,
          { year: "numeric", month: "long", day: "numeric" },
          { locale: "de" }
        )}
      </footer>
    </a>
  )
}

export default ArticleList
