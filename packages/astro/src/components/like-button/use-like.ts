import { useCallback } from "react"

import { getArticleLikes } from "../../data/get-article-likes"
import { likeArticle } from "../../data/like-article"
import useFetch from "../../hooks/use-fetch"
import useLazyFetch from "../../hooks/use-lazy-fetch"

const useLike = (articleId: string) => {
  const getLikesFunc = useCallback(() => getArticleLikes(articleId), [articleId])
  const likeArticleFunc = useCallback(() => likeArticle(articleId), [articleId])

  const initialFetch = useFetch(getLikesFunc)
  const { perform, ...updated } = useLazyFetch(likeArticleFunc)

  const performLike = useCallback(() => perform(), [perform])

  return {
    initialFetchState: initialFetch.state,
    data: updated.data || initialFetch.data,
    state: updated.state || initialFetch.state,
    error: updated.error || initialFetch.error,
    performLike,
  }
}

export default useLike
