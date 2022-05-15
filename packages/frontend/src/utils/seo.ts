import { graphql } from "gatsby"
import { StrapiMedia } from "./media"

export type StrapiSeo = {
  metaTitle: string
  metaDescription: string
  shareImage: {
    localFile: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
  article: boolean
}

export const StrapiSeoFragment = graphql`
  fragment Seo on STRAPI__COMPONENT_SHARED_SEO {
    metaTitle
    metaDescription
    article
    shareImage {
      localFile {
        childImageSharp {
          resize(width: 1200, height: 630) {
            src
          }
        }
      }
    }
  }
`
