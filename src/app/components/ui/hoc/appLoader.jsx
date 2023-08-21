import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from '../../../store/users'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionsList } from '../../../store/professions'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersLoadingStatus = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])

  if (usersLoadingStatus) return 'Loading...'
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader
