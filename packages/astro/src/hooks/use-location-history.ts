import { useEffect, useState } from "react"

const useLocationHistory = (backendUrl: string) => {
  const [data, setData] = useState<GeoJSON.Feature | undefined>(undefined)
  const [state, setState] = useState<"pending" | "success" | "error">("pending")
  const [error, setError] = useState<any | undefined>(undefined)

  useEffect(() => {
    fetch(`${backendUrl}/api/live-location/history`)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setState("success")
      })
      .catch(error => {
        setError(error)
        setState("error")
      })
  }, [backendUrl])

  return {
    data,
    state,
    error,
  }
}

export default useLocationHistory
