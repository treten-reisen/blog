import { z } from "zod"

import { transformStrapiImage } from "../image"

import { strapiBlockSchema } from "./blocks.schema"
import { dateStringSchema } from "./date.schema"
import { strapiSeoSchema } from "./seo.schema"
import { strapiEntitySchema, strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

export const strapiArticleSchema = strapiEntitySchema(
  z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    image: strapiSingleSchema(strapiImageDataSchema).transform(async image =>
      transformStrapiImage(image.data, { width: 1200 })
    ),
    publishedAt: z.nullable(dateStringSchema),
    blocks: z.array(strapiBlockSchema),
    seo: strapiSeoSchema,
    listed: z.boolean(),
  })
)

export type StrapiArticle = z.infer<typeof strapiArticleSchema>
