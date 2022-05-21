import { graphql, useStaticQuery } from "gatsby"
import { StrapiMedia } from "../utils/media"
import { StrapiSeo } from "../utils/seo"

export type StrapiGlobal = {
  siteName: string
  siteURL: string
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

export const useGlobal = () => {
  const { strapiGlobal } = useStaticQuery<{
    strapiGlobal: StrapiGlobal
  }>(graphql`
    query {
      strapiGlobal {
        siteName
        siteURL
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
