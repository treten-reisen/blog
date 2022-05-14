import React from "react"
import "twin.macro"
import {
  StrapiArticleListItem,
  useArticleList,
} from "../hooks/use-article-list"

const ArticleList = () => {
  const articles = useArticleList()

  return (
    <>
      {articles.map(article => (
        <ArticleListItem item={article} />
      ))}
    </>
  )
}

const ArticleListItem = ({ item }: { item: StrapiArticleListItem }) => {
  return (
    <a href={`/articles/${item.slug}`} tw="flex flex-col space-y-2">
      <header tw="flex flex-col space-y-2">
        <img
          src={item.image.localFile.childImageSharp.fluid.srcWebp}
          srcSet={item.image.localFile.childImageSharp.fluid.srcSetWebp}
          sizes={item.image.localFile.childImageSharp.fluid.sizes}
          tw="h-52 w-full object-cover"
        />
        <h2 tw="font-sans font-bold text-base tracking-tight text-gray-700">
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
