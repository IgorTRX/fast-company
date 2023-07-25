import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../service/comment.service'
import { toast } from 'react-toastify'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvaider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getComments()
  }, [])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }
    try {
      const { content } = await commentService.createComment(comment)
      console.log(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      console.log(content)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  // обработка ошибок
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <CommentsContext.Provider value={{ comments, createComment, isLoading }}>
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
