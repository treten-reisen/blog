import { graphql, PageProps } from "gatsby"
import * as React from "react"
import { Hero, StrapiHero } from "../components/hero"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Index = ({ data }: PageProps<QueryResult>) => (
  <Layout>
    <Seo />
    <Hero strapiHero={data.strapiHero} />
    <h1>treten.reisen</h1>
    <p>Willkommen bei treten.reisen</p>
  </Layout>
)

type QueryResult = {
  strapiHero: StrapiHero
}

export const query = graphql`
  query IndexQuery {
    strapiHero {
      ...Hero
    }
  }
`

export default Index
