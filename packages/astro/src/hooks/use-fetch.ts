import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunc: () => Promise<T>) => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [state, setState] = useState<"pending" | "success" | "error">("pending")
  const [error, setError] = useState<unknown | undefined>(undefined)

  useEffect(() => {
    fetchFunc()
      .then(data => {
        setData(data)
        setState("success")
      })
      .catch(error => {
        setError(error)
        setState("error")
      })
  }, [fetchFunc])

  return {
    data,
    state,
    error,
  }
}

export default useFetch
