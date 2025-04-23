import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiArticleSchema } from "./schema/article.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiArticleResponseSchema = strapiSingleSchema(strapiArticleSchema)

export type StrapiArticleResponse = z.infer<typeof strapiArticleResponseSchema>

export const getArticle = async (documentId: string) => {
  const status = import.meta.env.STRAPI_PUBLICATION_STATE === "preview" ? "draft" : "published"
  const params = new URLSearchParams({
      status,
    "populate[image][populate]": "*",
    "populate[seo][populate]": "*",
    "populate[blocks][populate]": "*",
  })

  const response = await fetch(
    `${import.meta.env.PUBLIC_STRAPI_API_URL}/api/articles/${documentId}?${params}`,
    setAuthHeaders()
  )
  return parseResponse(response, strapiArticleResponseSchema)
}
