import { useState } from "react"

const useLazyFetch = <Args extends [], T>(fetchFunc: (...args: Args) => Promise<T>) => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [state, setState] = useState<"pending" | "success" | "error" | null>(null)
  const [error, setError] = useState<unknown | undefined>(undefined)

  const perform = (...args: Args) => {
    setState("pending")
    fetchFunc(...args)
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
