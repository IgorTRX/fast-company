import { createSlice } from '@reduxjs/toolkit'
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
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFailed } = actions

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
