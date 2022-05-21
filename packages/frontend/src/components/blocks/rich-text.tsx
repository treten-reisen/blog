import { graphql } from "gatsby"
import tw, { css } from "twin.macro"
import Article from "../article"

export type StrapiRichTextRendererProps = {
  data: StrapiBlockRichText
}

const StrapiRichTextRenderer = ({ data }: StrapiRichTextRendererProps) => (
  <Article html={data.body.data.childMarkdownRemark.html} />
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

export const strapiBlockRichTextFragment = graphql`
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
