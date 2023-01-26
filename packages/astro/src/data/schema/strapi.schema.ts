import { getImage } from "@astrojs/image"
import { AnyZodObject, z, ZodTypeAny } from "zod"

import { dateStringSchema } from "./date.schema"

export const strapiEntitySchema = <T extends AnyZodObject>(attributesShape: T) =>
  z.object({
    id: z.number(),
    attributes: z
      .object({
        createdAt: dateStringSchema,
        updatedAt: dateStringSchema,
      })
      .merge(attributesShape),
  })

export const strapiCollectionSchema = <T extends ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
  })

export const strapiSingleSchema = <T extends ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: itemSchema,
  })

export const strapiImageSchema = z.object({
  data: strapiEntitySchema(
    z.object({
      url: z.string().transform(url => new URL(url, import.meta.env.STRAPI_API_URL).toString()),
      alternativeText: z.string(),
      width: z.nullable(z.number()).transform(width => width || undefined),
      height: z.nullable(z.number()).transform(width => width || undefined),
    })
  ),
})

export const strapiAstroImageSchema = (size?: { width?: number; height?: number }) =>
  strapiImageSchema.transform(async image => {
    return getImage({
      src: image.data.attributes.url,
      alt: image.data.attributes.alternativeText,
      format: "webp",
      width: size?.width || size?.height ? size.width : image.data.attributes.width,
      height: size?.width || size?.height ? size.height : image.data.attributes.height,
      aspectRatio:
        size?.width || size?.height
          ? size?.width && size?.height
            ? undefined
            : image.data.attributes.width && image.data.attributes.height
            ? image.data.attributes.width / image.data.attributes.height
            : undefined
          : undefined,
    })
  })
