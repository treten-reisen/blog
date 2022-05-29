import { graphql, PageProps } from "gatsby"
import "twin.macro"
import { Helmet } from "react-helmet"

import { StrapiBlocks } from "../components/blocks"
import BlocksRenderer from "../components/blocks-renderer"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { StrapiSeo } from "../utils/seo"

export type ArticleProps = PageProps<{ strapiArticle: StrapiArticle }>

const Article = ({ data, location }: ArticleProps) => (
  <Layout>
    <ArticleSeo article={data.strapiArticle} location={location} />
    <BlocksRenderer blocks={data.strapiArticle.blocks} />
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
