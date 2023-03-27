import { z } from "zod"

import { strapiSeoSchema } from "./seo.schema"
import { strapiEntitySchema } from "./strapi.schema"

export const strapiPageSchema = strapiEntitySchema(
  z.object({
    title: z.string(),
    slug: z.string(),
    seo: strapiSeoSchema,
  })
)

export type StrapiPage = z.infer<typeof strapiPageSchema>
