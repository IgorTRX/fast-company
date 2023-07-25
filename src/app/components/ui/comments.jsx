import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import API from '../../api'
import { useComments } from '../../hooks/useCommets'

const Comments = () => {
  const { userId } = useParams()
  const [comments, setComments] = useState([])
  const { createComment } = useComments()

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
  }, [])

  const handleSubmit = (data) => {
    createComment(data)
  }

  const handleRemoveComment = (id) => {
    API.comments.remove(id).then((id) => {
      setComments(comments.filter((x) => x._id !== id))
    })
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
