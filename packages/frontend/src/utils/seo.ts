import { graphql } from "gatsby"
import { StrapiMedia } from "./media"

export type StrapiSeo = {
  metaTitle: string
  metaDescription: string
  shareImage: StrapiMedia
  article: boolean
}

export const query = graphql`
  fragment Seo on STRAPI__COMPONENT_SHARED_SEO {
    metaTitle
    metaDescription
    article
    shareImage {
      localFile {
        url
      }
    }
  }
`
