import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiPageSchema } from "./schema/page.schema"
import { strapiCollectionSchema } from "./schema/strapi.schema"

const strapiPageListResponseSchema = strapiCollectionSchema(strapiPageSchema)

export const getPage = async (slug: string) => {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[seo][populate]": "*",
  })

  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/pages?${params}`, setAuthHeaders())
  const pages = await parseResponse(response, strapiPageListResponseSchema)

  if (pages.data.length != 1) {
    throw new Error(
      `Failed to load page with slug '${slug}'. Expected single page response, got ${
        pages.data.length
      }\n${JSON.stringify(pages.data, undefined, 2)}`
    )
  }

  return pages.data[0]
}
