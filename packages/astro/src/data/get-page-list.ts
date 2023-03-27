import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiPageSchema } from "./schema/page.schema"
import { strapiCollectionSchema } from "./schema/strapi.schema"

const strapiPageListResponseSchema = strapiCollectionSchema(strapiPageSchema)

export type StrapiPageListResponse = z.infer<typeof strapiPageListResponseSchema>

export type StrapiPageListItem = StrapiPageListResponse["data"][number]

export const getPageList = async () => {
  const params = new URLSearchParams({
    "populate[seo][populate]": "*",
  })
  const url = new URL(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/pages?${params}`)

  const response = await fetch(url, setAuthHeaders())

  return parseResponse(response, strapiPageListResponseSchema)
}
