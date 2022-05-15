import { Helmet } from "react-helmet"
import { useGlobal } from "../hooks/use-global"
import { StrapiSeo } from "../utils/seo"
import { theme } from "twin.macro"

export type SeoProps = {
  seo?: Partial<StrapiSeo>
  location: Location
  type: "article" | "website"
}

const Seo = ({ seo = {}, location, type }: SeoProps) => {
  const { siteName, defaultSeo, favicon, siteURL } = useGlobal()

  // Merge default and page-specific SEO values
  const fullSeo = { ...defaultSeo, ...seo }

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
      const imageUrl = `${siteURL}${fullSeo.shareImage.localFile.childImageSharp.resize.src}`
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
    tags.push({ name: "twitter:card", content: "summary_large_image" })
    tags.push({ name: "theme-color", content: theme("colors.lime.500") })
    tags.push({ property: "og:url", content: `${siteURL}${location.pathname}` })
    tags.push({ property: "og:type", content: type })
    tags.push({ property: "og:locale", content: "de_DE" })
    tags.push({ property: "og:site_name", content: siteName })

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
