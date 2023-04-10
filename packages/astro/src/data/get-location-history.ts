import { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"

const pointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
})

const lineStringSchema = z.object({
  type: z.literal("LineString"),
  coordinates: z.array(z.tuple([z.number(), z.number()])),
})

const featureSchema = <T extends typeof pointSchema | typeof lineStringSchema>(geometrySchema: T) =>
  z.object({
    type: z.literal("Feature"),
    properties: z.record(z.any()).nullable(),
    geometry: geometrySchema,
  })

export const getLocationHistory = async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/live-location/history`, setAuthHeaders())

  return parseResponse(response, featureSchema(lineStringSchema))
}
