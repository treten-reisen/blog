import { z } from "zod"

import { strapiBlockSchema } from "./blocks.schema"
import { dateStringSchema } from "./date.schema"
import { strapiSeoSchema } from "./seo.schema"
import { strapiAstroImageSchema, strapiEntitySchema } from "./strapi.schema"

export const strapiArticleSchema = strapiEntitySchema(
  z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    image: strapiAstroImageSchema({ width: 1200 }),
    publishedAt: z.nullable(dateStringSchema),
    blocks: z.array(strapiBlockSchema),
    seo: strapiSeoSchema,
  })
)

export type StrapiArticle = z.infer<typeof strapiArticleSchema>
