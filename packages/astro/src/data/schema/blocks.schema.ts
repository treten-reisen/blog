import { getImage } from "@astrojs/image"
import { z } from "zod"
import { strapiImageSchema } from "./strapi.schema"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"

const strapiBlockRichTextSchema = z
  .object({
    id: z.number(),
    __component: z.literal("shared.rich-text"),
    body: z.string(),
  })
  .transform(async rt => ({
    ...rt,
    html: String(
      await unified().use(remarkParse).use(remarkHtml).process(rt.body)
    ),
  }))

export type StrapiBlockRichText = z.infer<typeof strapiBlockRichTextSchema>

const strapiBlockMediaSchema = z.object({
  id: z.number(),
  __component: z.literal("shared.media"),
  file: strapiImageSchema,
})

export type StrapiBlockMedia = z.infer<typeof strapiBlockMediaSchema>

export const strapiBlockSchema = z.union([
  strapiBlockMediaSchema,
  strapiBlockRichTextSchema,
])

export type StrapiBlock = z.infer<typeof strapiBlockSchema>

export type StrapiBlockComponentName = StrapiBlock["__component"]
export type StrapiBlockOfType<N extends StrapiBlockComponentName> =
  StrapiBlock extends infer T
    ? T extends { __component: N }
      ? T
      : never
    : never
