import { z } from "zod"

import { transformStrapiImage } from "../image"

import { strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

export const strapiSeoSchema = z.object({
  id: z.number(),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  shareImage: strapiSingleSchema(strapiImageDataSchema.nullable()).transform(async image =>
    image.data ? transformStrapiImage(image.data, { width: 1200, height: 630 }) : image.data
  ),
  article: z
    .boolean()
    .nullable()
    .transform(article => !!article),
})

export type StrapiSeo = z.infer<typeof strapiSeoSchema>
