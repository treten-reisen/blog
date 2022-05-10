import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo, { StrapiSeo } from "../components/seo"
import type { PageProps } from "gatsby"
import BlocksRenderer from "../components/blocks-renderer"

export type StrapiArticle = {
  blocks: any
  seo: StrapiSeo
}

const Article = ({ data }: PageProps<{ strapiArticle: StrapiArticle }>) => (
  <Layout>
    <Seo seo={data.strapiArticle.seo} />
    <BlocksRenderer blocks={data.strapiArticle.blocks} />
  </Layout>
)

export const query = graphql`
  query ($slug: String) {
    strapiArticle(slug: { eq: $slug }) {
      id
      slug
      title
      blocks {
        ...Blocks
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export default Article
