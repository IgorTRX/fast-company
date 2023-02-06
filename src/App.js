import React, { useState, useEffect } from 'react'
import Users from './components/users'
import api from './api/index'

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    )
  }

  return (
    <div>
      {users && (
        <Users
          onDelete={handleDelete}
          onToggle={handleToggleBookMark}
          users={users}
        />
      )}
    </div>
  )
}

export default App
