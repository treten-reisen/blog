import type { z } from "zod"

import { strapiArticleSchema } from "./schema/article.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiArticleResponseSchema = strapiSingleSchema(strapiArticleSchema)

export type StrapiArticleResponse = z.infer<typeof strapiArticleResponseSchema>

export const getArticle = async (id: number) => {
  const response = await fetch(
    `${
      import.meta.env.STRAPI_API_URL
    }/api/articles/${id}?populate[image]=%2A&populate[seo][populate]=%2A&populate[blocks][populate]=%2A`,
    {
      headers: { Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
    }
  )
  const data = await response.json()
  return strapiArticleResponseSchema.parseAsync(data)
}
