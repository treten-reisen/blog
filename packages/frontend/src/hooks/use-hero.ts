import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

export type StrapiHero = {
  title: string
  logo: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      url: string
    }
    ext: string
    alternativeText: string
  }
  image: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
    alternativeText: string
  }
}

export const useHero = () => {
  const { strapiHero } = useStaticQuery<{ strapiHero: StrapiHero }>(graphql`
    query HeroQuery {
      strapiHero {
        title
        logo {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
            url
          }
          alternativeText
          ext
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          alternativeText
        }
      }
    }
  `)
  return strapiHero
}
