import Hero from "../components/hero"
import "twin.macro"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ArticleList from "../components/article-list"
import { PageProps } from "gatsby"
import Footer from "../components/footer"

const Index = ({ location }: PageProps) => {
  return (
    <Layout
      header={
        <header>
          <Hero />
        </header>
      }
    >
      <Seo location={location} type="website" />
      <ArticleList />
    </Layout>
  )
}

export default Index
