import { getImage } from "@astrojs/image"
import { AnyZodObject, z, ZodObject, ZodRawShape, ZodTypeAny } from "zod"
import { dateStringSchema } from "./date.schema"

export const strapiEntitySchema = <T extends AnyZodObject>(
  attributesShape: T
) =>
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
      url: z
        .string()
        .transform(url =>
          new URL(url, import.meta.env.STRAPI_API_URL).toString()
        ),
      alternativeText: z.string(),
    })
  ),
})
