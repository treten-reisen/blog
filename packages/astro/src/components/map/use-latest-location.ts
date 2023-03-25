import { useCallback } from "react"

import { getLiveLocation } from "../../data/get-live-location"
import useFetch from "../../hooks/use-fetch"

const useLatestLocation = () => {
  const fetchFunc = useCallback(() => getLiveLocation(), [])
  return useFetch(fetchFunc)
}

export default useLatestLocation
