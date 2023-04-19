import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import { useHistory, useParams } from 'react-router-dom'
import EditUserForm from '../../ui/editUserForm'

const UserPage = ({ userId }) => {
  const history = useHistory()
  const { edit } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  })

  const handleClick = () => {
    history.push(`/users/${userId}/edit`)
  }

  if (user) {
    return (
      <>
        {edit ? (
          <EditUserForm user={user} />
        ) : (
          <div>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <Qualities qualities={user.qualities} />
            <p>CompletedMeetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button onClick={handleClick}>Изменить</button>
          </div>
        )}
      </>
    )
  }
  return 'Loading...'
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
