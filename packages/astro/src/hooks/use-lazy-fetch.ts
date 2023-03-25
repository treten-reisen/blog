import { useState } from "react"

const useLazyFetch = <T>(url: string, init?: Omit<RequestInit, "body">) => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [state, setState] = useState<"pending" | "success" | "error" | null>(null)
  const [error, setError] = useState<unknown | undefined>(undefined)

  const perform = (body?: unknown) => {
    setState("pending")
    fetch(url, { ...init, body: JSON.stringify(body) })
      .then(response => response.json())
      .then(data => {
        setData(data)
        setState("success")
      })
      .catch(error => {
        setError(error)
        setState("error")
      })
  }

  return {
    data,
    state,
    error,
    perform,
  }
}

export default useLazyFetch
