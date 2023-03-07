import { z } from "zod"

import { transformStrapiImage } from "../image"
import { markdownToHtml } from "../parse-markdown"

import { strapiImageDataSchema, strapiSingleSchema } from "./strapi.schema"

const strapiBlockRichTextSchema = z
  .object({
    id: z.number(),
    __component: z.literal("shared.rich-text"),
    body: z.string(),
  })
  .transform(async rt => ({
    ...rt,
    html: String(await markdownToHtml(rt.body)),
  }))

export type StrapiBlockRichText = z.infer<typeof strapiBlockRichTextSchema>

const strapiBlockMediaSchema = z.object({
  id: z.number(),
  __component: z.literal("shared.media"),
  file: strapiSingleSchema(strapiImageDataSchema).transform(async image => transformStrapiImage(image.data)),
})

export type StrapiBlockMedia = z.infer<typeof strapiBlockMediaSchema>

const strapiBlockEmbeddedMediaSchema = z
  .object({
    id: z.number(),
    __component: z.literal("shared.embedded-media"),
    content: z.string(),
  })
  .transform(async rt => ({
    ...rt,
    html: String(await markdownToHtml(rt.content)),
  }))

export type StrapiBlockEmbeddedMedia = z.infer<typeof strapiBlockEmbeddedMediaSchema>

export const strapiBlockSchema = z.union([
  strapiBlockMediaSchema,
  strapiBlockRichTextSchema,
  strapiBlockEmbeddedMediaSchema,
])

export type StrapiBlock = z.infer<typeof strapiBlockSchema>

export type StrapiBlockComponentName = StrapiBlock["__component"]
export type StrapiBlockOfType<N extends StrapiBlockComponentName> = StrapiBlock extends infer T
  ? T extends { __component: N }
    ? T
    : never
  : never
