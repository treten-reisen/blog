import remarkHtml from "remark-html"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { z } from "zod"

import { strapiSeoSchema } from "./seo.schema"
import { strapiSocialMediaSchema } from "./social-media.schema"
import { strapiEntitySchema, strapiImageSchema } from "./strapi.schema"

export const strapiGlobalSchema = strapiEntitySchema(
  z.object({
    siteName: z.string(),
    siteURL: z.string().url(),
    imprint: z.string(),
    dataPolicy: z.string(),
    favicon: strapiImageSchema,
    socialMedia: z.array(strapiSocialMediaSchema),
    defaultSeo: strapiSeoSchema,
    avatar: strapiImageSchema,
  })
).transform(async global => ({
  ...global,
  attributes: {
    ...global.attributes,
    imprintHtml: String(await unified().use(remarkParse).use(remarkHtml).process(global.attributes.imprint)),
    dataPolicyHtml: String(await unified().use(remarkParse).use(remarkHtml).process(global.attributes.dataPolicy)),
  },
}))

export type StrapiGlobal = z.infer<typeof strapiGlobalSchema>
