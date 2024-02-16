import { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { featureCollectionSchema, featureSchema, pointSchema } from "./schema/geojson.schema"

export const getNightsLocations = async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/live-location/nights`, setAuthHeaders())

  return parseResponse(
    response,
    featureCollectionSchema(featureSchema(pointSchema, z.object({ timestamp: z.string() })))
  )
}

export type GetNightsLocationsResponse = Awaited<ReturnType<typeof getNightsLocations>>
