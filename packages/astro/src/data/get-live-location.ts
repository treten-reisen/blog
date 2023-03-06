import { z, ZodError } from "zod"

const pointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
})

const featureSchema = (geometrySchema: typeof pointSchema) =>
  z.object({
    type: z.literal("Feature"),
    properties: z.record(z.any()).nullable(),
    geometry: geometrySchema,
  })

export const getLiveLocation = async () => {
  const response = await fetch(`${import.meta.env.STRAPI_API_URL}/api/live-location/latest`, {
    headers: { Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
  })
  const data = await response.json()
  try {
    return featureSchema(pointSchema).parse(data)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error.issues, undefined, 2))
    }
    throw error
  }
}
