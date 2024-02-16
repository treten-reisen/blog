import { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { dateStringSchema } from "./schema/date.schema"
import { featureSchema, lineStringSchema } from "./schema/geojson.schema"

export const getLocationHistory = async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/live-location/history`, setAuthHeaders())

  return parseResponse(
    response,
    featureSchema(lineStringSchema, z.object({ times: z.array(dateStringSchema.nullable()) }))
  )
}

export type GetLocationHistoryResponse = Awaited<ReturnType<typeof getLocationHistory>>
