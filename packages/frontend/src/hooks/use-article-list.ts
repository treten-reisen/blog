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
        gatsbyImageData: IGatsbyImageData
      }
    }
    alternativeText: string
  }
}

export const useArticleList = () => {
  const { allStrapiArticle } = useStaticQuery<{
    allStrapiArticle: { edges: Array<{ node: StrapiArticleListItem }> }
  }>(graphql`
    query ArticleListQuery {
      allStrapiArticle(sort: { fields: createdAt, order: DESC }) {
        edges {
          node {
            slug
            createdAt(formatString: "LL", locale: "de")
            title
            summary
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, height: 256, width: 660)
                }
              }
              alternativeText
            }
          }
        }
      }
    }
  `)

  return allStrapiArticle.edges.map(({ node }) => node)
}
