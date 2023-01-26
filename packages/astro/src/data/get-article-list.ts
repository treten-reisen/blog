import type { z } from "zod"

import { strapiArticleSchema } from "./schema/article.schema"
import { strapiCollectionSchema, strapiEntitySchema } from "./schema/strapi.schema"

const strapiArticleListResponseSchema = strapiCollectionSchema(
  strapiEntitySchema(
    strapiArticleSchema.shape.attributes.pick({
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
      image: true,
      slug: true,
      title: true,
      summary: true,
    })
  )
)

export type StrapiArticleListResponse = z.infer<typeof strapiArticleListResponseSchema>

export type StrapiArticleListItem = StrapiArticleListResponse["data"][number]

export const getArticleList = async () => {
  const publicationState = import.meta.env.STRAPI_PUBLICATION_STATE === "preview" ? "preview" : "live"

  const params = new URLSearchParams({
    publicationState,
    "populate[image]": "*",
  })

  const url = new URL(`${import.meta.env.STRAPI_API_URL}/api/articles?${params}`)

  const response = await fetch(url, {
    headers: { Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
  })
  const data = await response.json()
  return strapiArticleListResponseSchema.parseAsync(data)
}
