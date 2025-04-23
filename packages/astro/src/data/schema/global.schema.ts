import { z } from "zod"

import { transformStrapiImage } from "../image"

import { strapiSeoSchema } from "./seo.schema"
import { strapiSocialMediaSchema } from "./social-media.schema"
import { strapiEntitySchema, strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

export const strapiGlobalSchema = strapiEntitySchema(
  z.object({
    siteName: z.string(),
    siteURL: z.string().url(),
    favicon: strapiImageDataSchema,
    socialMedia: z.array(strapiSocialMediaSchema),
    defaultSeo: strapiSeoSchema,
    avatar: strapiImageDataSchema.transform(async image => transformStrapiImage(image)),
    logo: strapiImageDataSchema,
  })
).transform(async global => ({
  ...global
}))

export type StrapiGlobal = z.infer<typeof strapiGlobalSchema>
