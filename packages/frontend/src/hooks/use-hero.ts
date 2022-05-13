import { graphql, useStaticQuery } from "gatsby"

export type StrapiHero = {
  title: string
  logo: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: any
      }
      url: string
    }
    ext: string
  }
  image: {
    localFile: {
      url: string
    }
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
          ext
        }
        image {
          localFile {
            url
          }
        }
      }
    }
  `)
  return strapiHero
}
