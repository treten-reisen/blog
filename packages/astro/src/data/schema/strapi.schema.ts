import { AnyZodObject, z, ZodTypeAny } from "zod"

import { dateStringSchema } from "./date.schema"

export const strapiEntitySchema = <T extends AnyZodObject>(attributesShape: T) =>
  z.object({
    id: z.number(),
    createdAt: dateStringSchema,
    updatedAt: dateStringSchema,
  }).merge(attributesShape)

export const strapiCollectionSchema = <T extends ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
  })

export const strapiSingleSchema = <T extends ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: itemSchema,
  })

export const strapiImageDataSchema = strapiEntitySchema(
  z.object({
    url: z.string().transform(url => new URL(url, import.meta.env.PUBLIC_STRAPI_API_URL).toString()),
    alternativeText: z.string(),
    width: z.nullable(z.number()).transform(width => width || undefined),
    height: z.nullable(z.number()).transform(height => height || undefined),
    caption: z.string().nullable(),
  })
)

export type StrapiImageData = z.infer<typeof strapiImageDataSchema>
