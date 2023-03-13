import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import QualitiesList from './qualitiesList'
import { Link } from 'react-router-dom'

const UserPage = ({ id }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
  }, [])

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>CompletedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <Link to={`/users`}>
          <button>Все пользователи</button>
        </Link>
      </>
    )
  }
  return 'Loading...'
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage
