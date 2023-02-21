import { z } from "zod"

import { transformStrapiImage } from "../image"
import { markdownToHtml } from "../parse-markdown"

import { strapiSeoSchema } from "./seo.schema"
import { strapiSocialMediaSchema } from "./social-media.schema"
import { strapiEntitySchema, strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

export const strapiGlobalSchema = strapiEntitySchema(
  z.object({
    siteName: z.string(),
    siteURL: z.string().url(),
    imprint: z.string(),
    dataPolicy: z.string(),
    favicon: strapiSingleSchema(strapiImageDataSchema),
    socialMedia: z.array(strapiSocialMediaSchema),
    defaultSeo: strapiSeoSchema,
    avatar: strapiSingleSchema(strapiImageDataSchema).transform(async image => transformStrapiImage(image.data)),
  })
).transform(async global => ({
  ...global,
  attributes: {
    ...global.attributes,
    imprintHtml: String(await markdownToHtml(global.attributes.imprint)),
    dataPolicyHtml: String(await markdownToHtml(global.attributes.dataPolicy)),
  },
}))

export type StrapiGlobal = z.infer<typeof strapiGlobalSchema>
