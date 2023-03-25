import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiArticleSchema } from "./schema/article.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiArticleResponseSchema = strapiSingleSchema(strapiArticleSchema)

export type StrapiArticleResponse = z.infer<typeof strapiArticleResponseSchema>

export const getArticle = async (id: number) => {
  const publicationState = import.meta.env.STRAPI_PUBLICATION_STATE === "preview" ? "preview" : "live"
  const params = new URLSearchParams({
    publicationState,
    "populate[image]": "*",
    "populate[seo][populate]": "*",
    "populate[blocks][populate]": "*",
  })

  const response = await fetch(
    `${import.meta.env.PUBLIC_STRAPI_API_URL}/api/articles/${id}?${params}`,
    setAuthHeaders()
  )
  return parseResponse(response, strapiArticleResponseSchema)
}
