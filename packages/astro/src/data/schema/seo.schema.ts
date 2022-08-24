import { getImage } from "@astrojs/image"
import { z } from "zod"
import { strapiImageSchema } from "./strapi.schema"

export const strapiSeoSchema = z
  .object({
    id: z.number(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    shareImage: strapiImageSchema,
    article: z.boolean(),
  })
  .transform(async seo => ({
    ...seo,
    shareImage: await getImage({
      src: seo.shareImage.data.attributes.url,
      width: 1200,
      height: 630,
    }),
  }))

export type StrapiSeo = z.infer<typeof strapiSeoSchema>
