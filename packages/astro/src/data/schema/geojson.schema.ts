import z, { ZodSchema } from "zod"

export const pointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()),
})

export const lineStringSchema = z.object({
  type: z.literal("LineString"),
  coordinates: z.array(z.array(z.number())),
})

export const featureSchema = <
  TGeometrySchema extends typeof pointSchema | typeof lineStringSchema,
  TPropertiesSchema extends ZodSchema
>(
  geometrySchema: TGeometrySchema,
  propertiesSchema: TPropertiesSchema
) =>
  z.object({
    type: z.literal("Feature"),
    properties: propertiesSchema,
    geometry: geometrySchema,
  })

export const featureCollectionSchema = <T extends ZodSchema>(featureSchema: T) =>
  z.object({
    type: z.literal("FeatureCollection"),
    features: z.array(featureSchema),
  })
