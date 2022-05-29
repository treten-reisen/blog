import { graphql, useStaticQuery } from "gatsby"
import { StrapiMedia } from "../utils/media"
import { StrapiSeo } from "../utils/seo"

export type StrapiGlobal = {
  siteName: string
  siteURL: string
  socialMedia: StrapiSocialMedia[]
  favicon: StrapiMedia
  defaultSeo: StrapiSeo
  imprint: {
    data: {
      childMarkdownRemark: {
        html: string
      }
    }
  }
}

export type StrapiSocialMediaPlatform =
  | "facebook"
  | "twitter"
  | "youtube"
  | "instagram"

export type StrapiSocialMedia = {
  platform: StrapiSocialMediaPlatform
  username: string
  url: string
}

export const useGlobal = () => {
  const { strapiGlobal } = useStaticQuery<{
    strapiGlobal: StrapiGlobal
  }>(graphql`
    query {
      strapiGlobal {
        siteName
        siteURL
        socialMedia {
          platform
          url
          username
        }
        favicon {
          localFile {
            url
          }
        }
        defaultSeo {
          ...Seo
        }
        imprint {
          data {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `)

  return strapiGlobal
}
