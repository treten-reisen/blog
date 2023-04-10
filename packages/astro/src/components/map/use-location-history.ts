import { useCallback } from "react"

import { getLocationHistory } from "../../data/get-location-history"
import useFetch from "../../hooks/use-fetch"

const useLocationHistory = () => {
  const fetchFunc = useCallback(() => getLocationHistory(), [])
  return useFetch(fetchFunc)
}

export default useLocationHistory
