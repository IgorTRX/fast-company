import React, { useEffect } from 'react'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams, Redirect } from 'react-router-dom'
import { UserProvaider } from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../store/users'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  const { currentUser } = useAuth()

  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsersList())
    }
  }, [])

  if (!dataStatus) return 'Loading...'

  return (
    <>
      <UserProvaider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <EditUserPage />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvaider>
    </>
  )
}

export default Users
