import { z } from "zod"

import { dateStringSchema } from "./date.schema"
import { strapiAstroImageSchema, strapiEntitySchema, strapiImageSchema } from "./strapi.schema"

export const strapiHeroSchema = strapiEntitySchema(
  z.object({
    publishedAt: dateStringSchema,
    title: z.string(),
    image: strapiAstroImageSchema(),
    logo: strapiImageSchema,
  })
)

export type StrapiHero = z.infer<typeof strapiHeroSchema>
