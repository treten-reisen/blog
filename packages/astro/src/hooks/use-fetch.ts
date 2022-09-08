import { useEffect, useState } from "react"

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [state, setState] = useState<"pending" | "success" | "error">("pending")
  const [error, setError] = useState<unknown | undefined>(undefined)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setState("success")
      })
      .catch(error => {
        setError(error)
        setState("error")
      })
  }, [url])

  return {
    data,
    state,
    error,
  }
}

export default useFetch
