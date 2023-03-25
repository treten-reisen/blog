import { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"

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
  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/live-location/latest`, setAuthHeaders())

  return parseResponse(response, featureSchema(pointSchema))
}
