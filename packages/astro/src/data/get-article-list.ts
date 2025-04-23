import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiArticleSchema } from "./schema/article.schema"
import { strapiCollectionSchema, strapiEntitySchema } from "./schema/strapi.schema"

const strapiArticleListResponseSchema = strapiCollectionSchema(
  strapiEntitySchema(
    strapiArticleSchema.pick({
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
      image: true,
      slug: true,
      title: true,
      summary: true,
      seo: true,
    })
  )
)

export type StrapiArticleListResponse = z.infer<typeof strapiArticleListResponseSchema>

export type StrapiArticleListItem = StrapiArticleListResponse["data"][number]

export type GetArticleListOptions = {
  includeUnlisted?: boolean
  pagination?: {
    page: number
    pageSize: number
  }
}

export const getArticleList = async ({ includeUnlisted = false, pagination }: GetArticleListOptions = {}) => {
  const publicationState = import.meta.env.STRAPI_PUBLICATION_STATE === "preview" ? "preview" : "live"

  const params = new URLSearchParams({
    publicationState,
    "populate[image]": "*",
    "populate[seo][populate]": "*",
    sort: "publishedAt:desc",
  })

  if (!includeUnlisted) {
    params.append("filters[listed][$eq]", "true")
  }

  if (pagination) {
    params.append("pagination[page]", pagination.page.toString())
    params.append("pagination[pageSize]", pagination.pageSize.toString())
  }

  const url = new URL(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/articles?${params}`)

  const response = await fetch(url, setAuthHeaders())

  return parseResponse(response, strapiArticleListResponseSchema)
}
