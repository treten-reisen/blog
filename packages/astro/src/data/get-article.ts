import { z, ZodError } from "zod"

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

  const response = await fetch(`${import.meta.env.STRAPI_API_URL}/api/articles/${id}?${params}`, {
    headers: { Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
  })
  const data = await response.json()

  try {
    return await strapiArticleResponseSchema.parseAsync(data)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error.issues, undefined, 2))
    }
    throw error
  }
}
