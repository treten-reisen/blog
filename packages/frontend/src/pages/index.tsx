import { graphql, PageProps } from "gatsby"
import { Hero } from "../components/hero"
import "twin.macro"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Index = () => (
  <Layout>
    <Seo />
    <header>
      <Hero />
    </header>
    <main tw="md:container p-6">
      <h1>treten.reisen</h1>
      <p>Willkommen bei treten.reisen</p>
    </main>
  </Layout>
)

export default Index
