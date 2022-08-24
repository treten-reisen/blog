import { z } from "zod"
import { dateStringSchema } from "./date.schema"
import { strapiEntitySchema, strapiImageSchema } from "./strapi.schema"

export const strapiHeroSchema = strapiEntitySchema(
  z.object({
    publishedAt: dateStringSchema,
    title: z.string(),
    image: strapiImageSchema,
    logo: strapiImageSchema,
  })
)

export type StrapiHero = z.infer<typeof strapiHeroSchema>
