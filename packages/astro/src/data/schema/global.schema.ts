import { z } from "zod"

import { transformStrapiImage } from "../image"

import { strapiSeoSchema } from "./seo.schema"
import { strapiSocialMediaSchema } from "./social-media.schema"
import { strapiEntitySchema, strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

export const strapiGlobalSchema = strapiEntitySchema(
  z.object({
    siteName: z.string(),
    siteURL: z.string().url(),
    favicon: strapiSingleSchema(strapiImageDataSchema),
    socialMedia: z.array(strapiSocialMediaSchema),
    defaultSeo: strapiSeoSchema,
    avatar: strapiSingleSchema(strapiImageDataSchema).transform(async image => transformStrapiImage(image.data)),
    logo: strapiSingleSchema(strapiImageDataSchema),
  })
).transform(async global => ({
  ...global,
  attributes: {
    ...global.attributes,
  },
}))

export type StrapiGlobal = z.infer<typeof strapiGlobalSchema>
