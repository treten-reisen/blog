import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { featureSchema, pointSchema } from "./schema/geojson.schema"

export const getLiveLocation = async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/live-location/latest`, setAuthHeaders())

  return parseResponse(response, featureSchema(pointSchema))
}
