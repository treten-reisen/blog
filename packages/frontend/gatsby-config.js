require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log(process.env.STRAPI_API_URL)

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: [
          {
            singularName: "article",
            queryParams: {
              publicationState:
                process.env.GATSBY_IS_PREVIEW === "true" ? "preview" : "live",
              populate: {
                seo: {
                  populate: "*",
                },
                blocks: {
                  populate: "*",
                },
              },
            },
          },
        ],
        singleTypes: [
          {
            singularName: "global",
            queryParams: {
              populate: {
                favicon: "*",
                defaultSeo: {
                  populate: "*",
                },
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `treten.reisen`,
        short_name: `treten.reisen`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/logo.svg`,
      },
    },
    "gatsby-plugin-emotion",
    // "gatsby-plugin-offline",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
  ],
}
