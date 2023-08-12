import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../service/quality.service'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested(state) {
      state.isLoading = true
    },
    qualitiesReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    qualitiesRequesFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceived, qualitiesRequesFailed } = actions

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested())
  try {
    const { content } = await qualityService.get()
    dispatch(qualitiesReceived(content))
  } catch (error) {
    dispatch(qualitiesRequesFailed(error.message))
  }
}

export default qualitiesReducer
