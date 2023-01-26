import { z } from "zod"

import { strapiAstroImageSchema } from "./strapi.schema"

export const strapiSeoSchema = z.object({
  id: z.number(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  shareImage: strapiAstroImageSchema({ width: 1200, height: 630 }),
  article: z.boolean(),
})

export type StrapiSeo = z.infer<typeof strapiSeoSchema>
