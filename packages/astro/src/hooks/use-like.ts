import useFetch from "./use-fetch"
import useLazyFetch from "./use-lazy-fetch"

const useLike = (backendUrl: string, articleId: number) => {
  const initialFetch = useFetch<{ likes: number }>(`${backendUrl}/api/articles/${articleId}/likes`)
  const { perform, ...updated } = useLazyFetch<{ likes: number }>(`${backendUrl}/api/articles/${articleId}/likes`, {
    method: "PUT",
  })

  const performLike = () => perform()

  return {
    initialFetchState: initialFetch.state,
    data: updated.data || initialFetch.data,
    state: updated.state || initialFetch.state,
    error: updated.error || initialFetch.error,
    performLike,
  }
}

export default useLike
