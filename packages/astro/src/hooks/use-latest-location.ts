import type { Feature, Point } from "geojson"

import useFetch from "./use-fetch"

const useLatestLocation = (backendUrl: string) => {
  return useFetch<Feature<Point, { timestamp: string }>>(`${backendUrl}/api/live-location/latest`)
}

export default useLatestLocation
