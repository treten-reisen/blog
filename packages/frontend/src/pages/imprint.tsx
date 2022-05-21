import Hero from "../components/hero"
import "twin.macro"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ArticleList from "../components/article-list"
import { PageProps } from "gatsby"
import Header from "../components/header"
import { useGlobal } from "../hooks/use-global"
import Article from "../components/article"
import Footer from "../components/footer"

const Index = ({ location }: PageProps) => {
  const { imprint } = useGlobal()

  return (
    <Layout>
      <Seo location={location} type="website" />
      <Article html={imprint.data.childMarkdownRemark.html} />
    </Layout>
  )
}

export default Index
