import path from "path"

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const articleTemplate = path.resolve("./src/templates/article.tsx")

  const result = await graphql(
    `
      {
        allStrapiArticle {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Strapi pages`,
      result.errors
    )

    return
  }

  const articles = result.data.allStrapiArticle.nodes

  if (articles.length > 0) {
    articles.forEach(article => {
      createPage({
        path: `/article/${article.slug}`,
        component: articleTemplate,
        context: {
          slug: article.slug,
        },
      })
    })
  }
}
