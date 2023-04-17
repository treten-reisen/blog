import { useCallback } from "react"

import { getNightsLocations } from "../../data/get-nights-locations"
import useFetch from "../../hooks/use-fetch"

const useNightsLocations = () => {
  const fetchFunc = useCallback(() => getNightsLocations(), [])
  return useFetch(fetchFunc)
}

export default useNightsLocations
