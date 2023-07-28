import React from 'react'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams, Redirect } from 'react-router-dom'
import { UserProvaider } from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  const { currentUser } = useAuth()

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
