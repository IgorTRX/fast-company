import { createSlice } from '@reduxjs/toolkit'
import professionService from '../service/profession.service'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested(state) {
      state.isLoading = true
    },
    professionsReceived(state, action) {
      state.entities = action.payload
      // state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequesFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceived, professionsRequesFailed } =
  actions

export const loadProfessionsList = () => async (dispatch) => {
  dispatch(professionsRequested())
  try {
    const { content } = await professionService.get()
    dispatch(professionsReceived(content))
  } catch (error) {
    dispatch(professionsRequesFailed(error.message))
  }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading

export const getProfessionById = (professionId) => (state) => {
  return state.professions.entities.find((prof) => prof._id === professionId)
}

export default professionsReducer
