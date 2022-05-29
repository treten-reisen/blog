import { PageProps } from "gatsby"
import "twin.macro"

import ArticleList from "../components/article-list"
import Hero from "../components/hero"
import Layout from "../components/layout"
import Seo from "../components/seo"

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
