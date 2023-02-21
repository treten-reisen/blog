import { z } from "zod"

import { transformStrapiImage } from "../image"

import { dateStringSchema } from "./date.schema"
import { strapiEntitySchema, strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

export const strapiHeroSchema = strapiEntitySchema(
  z.object({
    publishedAt: dateStringSchema,
    title: z.string(),
    image: strapiSingleSchema(strapiImageDataSchema).transform(async image => transformStrapiImage(image.data)),
    logo: strapiSingleSchema(strapiImageDataSchema),
  })
)

export type StrapiHero = z.infer<typeof strapiHeroSchema>
