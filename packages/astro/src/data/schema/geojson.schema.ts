import z from "zod"

export const pointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()),
})

export const lineStringSchema = z.object({
  type: z.literal("LineString"),
  coordinates: z.array(z.array(z.number())),
})

export const featureSchema = <T extends typeof pointSchema | typeof lineStringSchema>(geometrySchema: T) =>
  z.object({
    type: z.literal("Feature"),
    properties: z.record(z.any()).nullable(),
    geometry: geometrySchema,
  })

export const anyFeatureSchema = z.object({
  type: z.literal("Feature"),
  properties: z.record(z.any()).nullable(),
  geometry: z.union([pointSchema, lineStringSchema]),
})

export const featureCollectionSchema = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(anyFeatureSchema),
})
