import { graphql } from "gatsby"
import tw, { css } from "twin.macro"

export type StrapiRichTextRendererProps = {
  data: StrapiBlockRichText
}

const StrapiRichTextRenderer = ({ data }: StrapiRichTextRendererProps) => (
  <article
    css={css`
      ${tw`prose mx-auto font-serif`}
      & h1,h2,h3,h4,h5,h6 {
        ${tw`font-sans`}
      }
    `}
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
