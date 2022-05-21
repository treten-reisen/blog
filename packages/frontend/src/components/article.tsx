import tw, { css } from "twin.macro"

export type ArticleProps = {
  html: string
}

const Article = ({ html }: ArticleProps) => (
  <article
    css={css`
      ${tw`prose font-serif`}
      & h1,h2,h3,h4,h5,h6 {
        ${tw`font-sans`}
      }
    `}
    dangerouslySetInnerHTML={{
      __html: html,
    }}
  />
)

export default Article
