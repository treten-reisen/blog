import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

export type StrapiArticleListItem = {
  slug: string
  title: string
  createdAt: string
  summary: string
  image: {
    localFile: {
      childImageSharp: {
        fluid: {
          srcSetWebp: string
          srcWebp: string
          sizes: string
        }
      }
    }
  }
}

export const useArticleList = () => {
  const { allStrapiArticle } = useStaticQuery<{
    allStrapiArticle: { edges: Array<{ node: StrapiArticleListItem }> }
  }>(graphql`
    query ArticleListQuery {
      allStrapiArticle {
        edges {
          node {
            slug
            createdAt(formatString: "LL", locale: "de")
            title
            summary
            image {
              localFile {
                childImageSharp {
                  fluid(maxHeight: 208, maxWidth: 480) {
                    srcSetWebp
                    srcWebp
                    sizes
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return allStrapiArticle.edges.map(({ node }) => node)
}
