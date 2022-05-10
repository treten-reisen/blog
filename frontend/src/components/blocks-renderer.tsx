import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const componentsMap = {
  STRAPI__COMPONENT_SHARED_RICH_TEXT: ({
    data: {
      richTextBody: {
        data: {
          childMarkdownRemark: { html },
        },
      },
    },
  }) => <p dangerouslySetInnerHTML={{ __html: html }} />,
  STRAPI__COMPONENT_SHARED_MEDIA: ({
    data: {
      file: {
        localFile: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  }) => <GatsbyImage image={gatsbyImageData} alt={"test"} />,
}

const Block = ({ block }) => {
  const Component = componentsMap[block.__typename]

  if (!Component) {
    return null
  }

  return <Component data={block} />
}

const BlocksRenderer = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={`${index}${block.__typename}`} block={block} />
      ))}
    </div>
  )
}

export const query = graphql`
  fragment Blocks on STRAPI__COMPONENT_SHARED_MEDIASTRAPI__COMPONENT_SHARED_RICH_TEXTUnion {
    __typename
    ... on STRAPI__COMPONENT_SHARED_RICH_TEXT {
      richTextBody: body {
        __typename
        data {
          id
          childMarkdownRemark {
            html
          }
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_MEDIA {
      file {
        mime
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default BlocksRenderer
