import Hero from "../components/hero"
import "twin.macro"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ArticleList from "../components/article-list"

const Index = () => (
  <Layout>
    <Seo />
    <header>
      <Hero />
    </header>
    <main tw="md:container p-responsive">
      <ArticleList />
    </main>
  </Layout>
)

export default Index
