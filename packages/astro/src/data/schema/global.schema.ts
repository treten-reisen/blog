import { z } from "zod"
import { dateStringSchema } from "./date.schema"
import { strapiSeoSchema } from "./seo.schema"
import { strapiSocialMediaSchema } from "./social-media.schema"
import { strapiEntitySchema, strapiImageSchema } from "./strapi.schema"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"

export const strapiGlobalSchema = strapiEntitySchema(
  z.object({
    publishedAt: dateStringSchema,
    siteName: z.string(),
    siteURL: z.string().url(),
    imprint: z.string(),
    favicon: strapiImageSchema,
    socialMedia: z.array(strapiSocialMediaSchema),
    defaultSeo: strapiSeoSchema,
  })
).transform(async global => ({
  ...global,
  attributes: {
    ...global.attributes,
    imprintHtml: String(
      await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(global.attributes.imprint)
    ),
  },
}))

export type StrapiGlobal = z.infer<typeof strapiGlobalSchema>
