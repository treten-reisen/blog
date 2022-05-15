import { graphql, useStaticQuery } from "gatsby"
import { StrapiMedia } from "../utils/media"
import { StrapiSeo } from "../utils/seo"

export type StrapiGlobal = {
  siteName: string
  favicon: StrapiMedia
  defaultSeo: StrapiSeo
}

export const useGlobal = () => {
  const { strapiGlobal } = useStaticQuery<{
    strapiGlobal: StrapiGlobal
  }>(graphql`
    query {
      strapiGlobal {
        siteName
        favicon {
          localFile {
            url
          }
        }
        defaultSeo {
          ...Seo
        }
      }
    }
  `)

  return strapiGlobal
}
