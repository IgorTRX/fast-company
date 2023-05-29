import React from 'react'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
}

export default Users
