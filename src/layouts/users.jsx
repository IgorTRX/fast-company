import React from 'react'
import UsersList from '../components/usersList'
import PropTypes from 'prop-types'
import UserPage from '../components/userPage'
import { useParams } from 'react-router-dom'

const Users = () => {
  const params = useParams()
  const { userId } = params

  return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>
}

Users.propTypes = {
  match: PropTypes.object.isRequired
}

export default Users
