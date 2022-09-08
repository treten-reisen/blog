import { z } from "zod"

import { strapiBlockSchema } from "./blocks.schema"
import { dateStringSchema } from "./date.schema"
import { strapiSeoSchema } from "./seo.schema"
import { strapiEntitySchema, strapiImageSchema } from "./strapi.schema"

export const strapiArticleSchema = strapiEntitySchema(
  z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    image: strapiImageSchema,
    publishedAt: dateStringSchema,
    blocks: z.array(strapiBlockSchema),
    seo: strapiSeoSchema,
  })
)

export type StrapiArticle = z.infer<typeof strapiArticleSchema>
