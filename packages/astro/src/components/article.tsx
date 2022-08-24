import "./article.css"

export type ArticleProps = {
  html: string
}

const Article = ({ html }: ArticleProps) => (
  <article
    className="prose font-serif"
    dangerouslySetInnerHTML={{
      __html: html,
    }}
  />
)

export default Article
