import React from 'react'
import Users from '../layouts/users'
import PropTypes from 'prop-types'
import UserPage from './userPage'

const UsersList = ({ match }) => {
  const userId = match.params.userId

  return <>{userId ? <UserPage id={userId} /> : <Users />}</>
}

UsersList.propTypes = {
  match: PropTypes.object.isRequired
}

export default UsersList
