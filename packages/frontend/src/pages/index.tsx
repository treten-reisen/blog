import Hero from "../components/hero"
import "twin.macro"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ArticleList from "../components/article-list"
import { PageProps } from "gatsby"

const Index = ({ location }: PageProps) => (
  <Layout>
    <Seo location={location} type="website" />
    <header>
      <Hero />
    </header>
    <main tw="md:container py-6 sm:py-responsive px-responsive">
      <ArticleList />
    </main>
  </Layout>
)

export default Index
