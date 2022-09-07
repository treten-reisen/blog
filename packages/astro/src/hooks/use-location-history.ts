import type { Feature, LineString } from "geojson"
import useFetch from "./use-fetch"

const useLocationHistory = (backendUrl: string) => {
  return useFetch<Feature<LineString>>(
    `${backendUrl}/api/live-location/history`
  )
}

export default useLocationHistory
