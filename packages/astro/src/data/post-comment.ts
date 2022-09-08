export type CommentInput = {
  author: {
    id: string
    name: string
    email: string
  }
  content: string
}

export type CommentCollectionType = "article.article"

export const postComment = async (
  strapiUrl: string,
  collection: CommentCollectionType,
  id: number,
  input: CommentInput
) => {
  console.log(input)
  const response = await fetch(
    `${strapiUrl}/api/comments/api::${collection}:${id}`,
    {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const data = await response.json()
  return data
}
