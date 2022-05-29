import "twin.macro"

import { PageProps } from "gatsby"

import Article from "../components/article"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useGlobal } from "../hooks/use-global"

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
