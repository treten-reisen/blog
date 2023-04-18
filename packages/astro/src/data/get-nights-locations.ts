import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { featureCollectionSchema } from "./schema/geojson.schema"

export const getNightsLocations = async () => {
  // const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/live-location/nights`, setAuthHeaders())

  const response = {
    async json() {
      return JSON.parse(
        '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"timestamp":"2023-04-17T03:05:01.000Z"},"geometry":{"type":"Point","coordinates":[12.563640644596525,55.693693693693696]}},{"type":"Feature","properties":{"timestamp":"2023-04-16T04:08:14.000Z"},"geometry":{"type":"Point","coordinates":[12.197338917451376,55.44144144144144]}},{"type":"Feature","properties":{"timestamp":"2023-04-15T03:01:39.000Z"},"geometry":{"type":"Point","coordinates":[12.035098660301713,55.11711711711712]}},{"type":"Feature","properties":{"timestamp":"2023-04-14T05:45:22.000Z"},"geometry":{"type":"Point","coordinates":[11.709224149643873,54.86486486486486]}},{"type":"Feature","properties":{"timestamp":"2023-04-13T02:44:16.000Z"},"geometry":{"type":"Point","coordinates":[11.088017860321491,54.88288288288288]}},{"type":"Feature","properties":{"timestamp":"2023-04-12T02:19:03.000Z"},"geometry":{"type":"Point","coordinates":[10.336287835892916,54.88288288288288]}},{"type":"Feature","properties":{"timestamp":"2023-04-11T05:53:57.000Z"},"geometry":{"type":"Point","coordinates":[9.557510001185545,54.9009009009009]}},{"type":"Feature","properties":{"timestamp":"2023-04-10T03:10:03.000Z"},"geometry":{"type":"Point","coordinates":[9.531021520518603,55.711711711711715]}},{"type":"Feature","properties":{"timestamp":"2023-04-09T02:05:29.000Z"},"geometry":{"type":"Point","coordinates":[9.481609507428292,55.24324324324324]}},{"type":"Feature","properties":{"timestamp":"2023-04-08T02:29:02.000Z"},"geometry":{"type":"Point","coordinates":[9.433974917805585,54.77477477477478]}},{"type":"Feature","properties":{"timestamp":"2023-04-07T02:00:20.000Z"},"geometry":{"type":"Point","coordinates":[9.724611639791267,54.16216216216216]}},{"type":"Feature","properties":{"timestamp":"2023-04-06T04:46:14.000Z"},"geometry":{"type":"Point","coordinates":[9.155693656643006,53.67567567567568]}},{"type":"Feature","properties":{"timestamp":"2023-04-05T02:33:36.000Z"},"geometry":{"type":"Point","coordinates":[9.15710246377528,53.26126126126126]}},{"type":"Feature","properties":{"timestamp":"2023-04-04T07:14:42.000Z"},"geometry":{"type":"Point","coordinates":[8.472782635901117,52.846846846846844]}},{"type":"Feature","properties":{"timestamp":"2023-04-03T02:33:36.000Z"},"geometry":{"type":"Point","coordinates":[8.067714206853315,52.27027027027027]}}]}'
      )
    },
  }

  return parseResponse(response as any, featureCollectionSchema)
}
