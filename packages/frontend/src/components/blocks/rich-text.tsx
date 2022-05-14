import { graphql } from "gatsby"
import "twin.macro"

export type StrapiRichTextRendererProps = {
  data: StrapiBlockRichText
}

const StrapiRichTextRenderer = ({ data }: StrapiRichTextRendererProps) => (
  <article
    tw="prose mx-auto"
    dangerouslySetInnerHTML={{
      __html: data.body.data.childMarkdownRemark.html,
    }}
  />
)

export type StrapiBlockRichText = {
  body: {
    data: {
      id: string
      childMarkdownRemark: {
        html: string
      }
    }
  }
}

export const query = graphql`
  fragment BlockRichText on STRAPI__COMPONENT_SHARED_RICH_TEXT {
    body {
      data {
        id
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default StrapiRichTextRenderer
