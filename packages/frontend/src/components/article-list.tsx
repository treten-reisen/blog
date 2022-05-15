import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import "twin.macro"
import {
  StrapiArticleListItem,
  useArticleList,
} from "../hooks/use-article-list"

const ArticleList = () => {
  const articles = useArticleList()

  return (
    <div tw="grid gap-responsive sm:grid-cols-fit-sm lg:grid-cols-fit-lg">
      {articles.map(article => (
        <ArticleListItem item={article} key={article.slug} />
      ))}
    </div>
  )
}

const ArticleListItem = ({ item }: { item: StrapiArticleListItem }) => {
  return (
    <a href={`/articles/${item.slug}`} tw="flex flex-col space-y-2">
      <header tw="flex flex-col space-y-2">
        <GatsbyImage
          image={item.image.localFile.childImageSharp.gatsbyImageData}
          alt={item.image.alternativeText}
          objectFit="cover"
          tw="h-52 lg:h-64"
          loading="lazy"
        />
        <h2 tw="font-sans text-lg font-bold tracking-tight text-gray-700">
          {item.title}
        </h2>
      </header>
      <section tw="font-sans text-gray-600 tracking-tight">
        {item.summary}
      </section>
      <footer tw="self-end font-sans text-base tracking-tight text-gray-500">
        {item.createdAt}
      </footer>
    </a>
  )
}

export default ArticleList
