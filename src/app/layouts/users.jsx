import React from 'react'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'
import { UserProvaider } from '../hooks/useUsers'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  console.log(userId)

  return (
    <>
      <UserProvaider>
        {userId ? (
          edit ? (
            <EditUserPage />
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
