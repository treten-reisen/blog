import { graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import type { PageProps } from "gatsby"
import BlocksRenderer from "../components/blocks-renderer"
import "twin.macro"
import { StrapiBlocks } from "../components/blocks"
import { StrapiSeo } from "../utils/seo"
import { Helmet } from "react-helmet"

export type ArticleProps = PageProps<{ strapiArticle: StrapiArticle }>

const Article = ({ data, location }: ArticleProps) => (
  <Layout>
    <ArticleSeo article={data.strapiArticle} location={location} />
    <a href="/">{"< Back"}</a>
    <main tw="p-responsive md:container">
      <BlocksRenderer blocks={data.strapiArticle.blocks} />
    </main>
  </Layout>
)

type ArticleSeoProps = {
  article: StrapiArticle
  location: Location
}
const ArticleSeo = ({ article, location }: ArticleSeoProps) => {
  return (
    <>
      <Seo seo={article.seo} location={location} type="article" />
      <Helmet>
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:modified_time" content={article.updatedAt} />
        <meta property="article:section" content="Reisen" />
        <meta property="article:tag" content="Radreise" />
      </Helmet>
    </>
  )
}

export type StrapiArticle = {
  slug: string
  title: string
  blocks: StrapiBlocks
  seo: StrapiSeo
  publishedAt: string
  updatedAt: string
}

export const query = graphql`
  query ($slug: String) {
    strapiArticle(slug: { eq: $slug }) {
      slug
      title
      publishedAt
      updatedAt
      blocks {
        ...Blocks
      }
      seo {
        ...Seo
      }
    }
  }
`

export default Article
