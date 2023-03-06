import { z, ZodError } from "zod"

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

export const getArticleList = async ({ includeUnlisted = false }: { includeUnlisted?: boolean } = {}) => {
  const publicationState = import.meta.env.STRAPI_PUBLICATION_STATE === "preview" ? "preview" : "live"

  const params = new URLSearchParams({
    publicationState,
    "populate[image]": "*",
    sort: "publishedAt:desc",
  })

  if (!includeUnlisted) {
    params.append("filters[listed][$eq]", "true")
  }

  const url = new URL(`${import.meta.env.STRAPI_API_URL}/api/articles?${params}`)

  const response = await fetch(url, {
    headers: { Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
  })
  const data = await response.json()
  try {
    return await strapiArticleListResponseSchema.parseAsync(data)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error.issues, undefined, 2))
    }
    throw error
  }
}
