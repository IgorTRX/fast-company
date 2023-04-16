import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import { useHistory } from 'react-router-dom'

const UserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  const handleClick = () => {
    history.push('/users')
  }

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>CompletedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}>Все пользователи</button>
      </>
    )
  }
  return 'Loading...'
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
