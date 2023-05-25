import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment, RootState } from "../app/store"

import "./Comments.css"

interface Props {
  country: string
}

const Comments: React.FC<Props> = ({ country }) => {
  const [newComment, setNewComment] = useState("")
  const [newAuthor, setNewAuthor] = useState("")

  const dispatch = useDispatch()
  const allComments = useSelector((state: RootState) => state)
  const comments = allComments?.hasOwnProperty(country)
    ? allComments[country]
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      addComment({
        country,
        comment: {
          author: newAuthor,
          text: newComment,
        },
      }),
    )
    setNewComment("")
    setNewAuthor("")
  }

  if (!country) {
    return <div>Please select a country.</div>
  }

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div>
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              <div className="comment-icon-noimage">
                {comment?.author[0].toUpperCase() ?? "?"}
              </div>
              <div className="comment-overlay">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-text">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="comment-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Your Name"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
          ></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  )
}

export default Comments
