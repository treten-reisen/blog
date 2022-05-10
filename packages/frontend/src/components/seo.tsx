import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export type StrapiMedia = {
  localFile: {
    url: string
  }
}

export type StrapiSeo = {
  metaTitle: string
  metaDescription: string
  shareImage: StrapiMedia
  article: boolean
}

export type SeoProps = {
  seo?: Partial<StrapiSeo>
}

const Seo = ({ seo = {} }: SeoProps) => {
  const { strapiGlobal } = useStaticQuery<{
    strapiGlobal: {
      siteName: string
      favicon: StrapiMedia
      defaultSeo: StrapiSeo
    }
  }>(graphql`
    query {
      strapiGlobal {
        siteName
        favicon {
          localFile {
            url
          }
        }
        defaultSeo {
          metaTitle
          metaDescription
          shareImage {
            localFile {
              url
            }
          }
        }
      }
    }
  `)

  const { siteName, defaultSeo, favicon } = strapiGlobal

  // Merge default and page-specific SEO values
  const fullSeo = { ...defaultSeo, ...seo }

  // Add site name to title
  fullSeo.metaTitle = `${fullSeo.metaTitle} | ${siteName}`

  const getMetaTags = () => {
    const tags = []

    if (fullSeo.metaTitle) {
      tags.push(
        {
          property: "og:title",
          content: fullSeo.metaTitle,
        },
        {
          name: "twitter:title",
          content: fullSeo.metaTitle,
        }
      )
    }
    if (fullSeo.metaDescription) {
      tags.push(
        {
          name: "description",
          content: fullSeo.metaDescription,
        },
        {
          property: "og:description",
          content: fullSeo.metaDescription,
        },
        {
          name: "twitter:description",
          content: fullSeo.metaDescription,
        }
      )
    }
    if (fullSeo.shareImage) {
      const imageUrl = fullSeo.shareImage.localFile.url
      tags.push(
        {
          name: "image",
          content: imageUrl,
        },
        {
          property: "og:image",
          content: imageUrl,
        },
        {
          name: "twitter:image",
          content: imageUrl,
        }
      )
    }
    if (fullSeo.article) {
      tags.push({
        property: "og:type",
        content: "article",
      })
    }
    tags.push({ name: "twitter:card", content: "summary_large_image" })

    return tags
  }

  const metaTags = getMetaTags()

  return (
    <Helmet>
      <title>{fullSeo.metaTitle}</title>
      <link rel="icon" href={favicon.localFile.url} />
      {metaTags.map((tag, i) => (
        <meta key={i} {...tag} />
      ))}
    </Helmet>
  )
}

export default Seo
