import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo, { StrapiSeo } from "../components/seo"
import type { PageProps } from "gatsby"
import BlocksRenderer from "../components/blocks-renderer"
import "twin.macro"
import { StrapiBlocks } from "../components/blocks"

export type StrapiArticle = {
  blocks: StrapiBlocks
  seo: StrapiSeo
}

const Article = ({ data }: PageProps<{ strapiArticle: StrapiArticle }>) => (
  <Layout>
    <Seo seo={data.strapiArticle.seo} />
    <a href="/">{"< Back"}</a>
    <main tw="p-responsive md:container">
      <BlocksRenderer blocks={data.strapiArticle.blocks} />
    </main>
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
