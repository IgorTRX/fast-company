import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../service/comment.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested(state) {
      state.isLoading = true
    },
    commentsReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated(state, action) {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    commentRemoved(state, action) {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      )
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions

const commentCreateRequested = createAction('comments/commentCreateRequested')
const createCommentFailed = createAction('comments/createCommentFailed')
const commentRemoveRequested = createAction('comments/commentCreateRequested')
const removeCommentFailed = createAction('comments/createCommentFailed')

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (comment) => async (dispatch) => {
  dispatch(commentCreateRequested())
  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(createCommentFailed())
  }
}

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested())
  try {
    const { content } = await commentService.removeComment(id)
    if (content === null) dispatch(commentRemoved(id))
  } catch (error) {
    dispatch(removeCommentFailed())
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
