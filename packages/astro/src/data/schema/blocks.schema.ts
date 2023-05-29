import { z } from "zod"

import { transformStrapiImage } from "../image"
import { markdownToHtml } from "../parse-markdown"

import { strapiImageDataSchema, strapiSingleSchema, strapiCollectionSchema } from "./strapi.schema"

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
  file: strapiSingleSchema(strapiImageDataSchema).transform(async image =>
    transformStrapiImage(image.data, { height: 384 * 2 })
  ),
})

export type StrapiBlockMedia = z.infer<typeof strapiBlockMediaSchema>

const strapiBlockMediaGallerySchema = z.object({
  id: z.number(),
  __component: z.literal("shared.media-gallery"),
  files: strapiCollectionSchema(strapiImageDataSchema).transform(async ({ data }) =>
    Promise.all(data.map(image => transformStrapiImage(image)))
  ),
})

export type StrapiBlockMediaGallery = z.infer<typeof strapiBlockMediaGallerySchema>

const strapiBlockEmbeddedMediaSchema = z
  .object({
    id: z.number(),
    __component: z.literal("shared.embedded-media"),
    media: z.string(),
  })
  .transform(async rt => ({
    ...rt,
    html: String(await markdownToHtml(rt.media)),
  }))

export type StrapiBlockEmbeddedMedia = z.infer<typeof strapiBlockEmbeddedMediaSchema>

export const strapiBlockSchema = z.union([
  strapiBlockMediaSchema,
  strapiBlockRichTextSchema,
  strapiBlockEmbeddedMediaSchema,
  strapiBlockMediaGallerySchema,
])

export type StrapiBlock = z.infer<typeof strapiBlockSchema>

export type StrapiBlockComponentName = StrapiBlock["__component"]
export type StrapiBlockOfType<N extends StrapiBlockComponentName> = StrapiBlock extends infer T
  ? T extends { __component: N }
    ? T
    : never
  : never
