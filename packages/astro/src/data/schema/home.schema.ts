import { z } from "zod"

import { transformStrapiImage } from "../image"

import { strapiBlockSchema } from "./blocks.schema"
import { strapiEntitySchema, strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

export const strapiHomeSchema = strapiEntitySchema(
  z.object({
    blocks: z.array(strapiBlockSchema),
    heroimage: strapiSingleSchema(strapiImageDataSchema).transform(async image => transformStrapiImage(image.data)),
  })
)

export type StrapiHome = z.infer<typeof strapiHomeSchema>
