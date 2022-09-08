import { useEffect, useState } from "react"
import { getComments, StrapiCommentsResponse } from "../data/get-comments"
import { CommentCollectionType, postComment } from "../data/post-comment"

export type CommentButtonProps = {
  strapiUrl: string
  collection: CommentCollectionType
  id: number
}

const CommentButton = ({ collection, id, strapiUrl }: CommentButtonProps) => {
  const [comments, setComments] = useState<StrapiCommentsResponse | null>(null)

  useEffect(() => {
    reloadComments()
  }, [])

  const reloadComments = () => {
    getComments(strapiUrl, collection, id).then(response =>
      setComments(response)
    )
  }

  const handleClick = async () => {
    await postComment(strapiUrl, collection, id, {
      author: {
        id: "anonymous",
        name: "PatrAnon",
        email: "anonymous@anon.com",
      },
      content: "Test comment",
    })
    reloadComments()
  }

  return (
    <>
      <div className="flex flex-col">
        {comments && comments.data.map(comment => <div>{comment.content}</div>)}
      </div>
      <button onClick={handleClick}>postComment</button>
    </>
  )
}

export default CommentButton
