import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
// import { useUser } from '../../../hooks/useUsers'

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()

  // const { users } = useUser()
  // function getUser(id) {
  //   return users.find((user) => user._id === id)
  // }

  useEffect(() => {
    // setUser(getUser(userId))
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    )
  }
  return 'Loading...!'
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
