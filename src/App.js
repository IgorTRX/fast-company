import React, { useState } from 'react'
import Users from './components/users'
import api from './api'
import SearchStatus from './components/searchStatus'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    )
  }

  return (
    <>
      <h2>
        <SearchStatus length={users.length} />
      </h2>
      <Users
        onDelete={handleDelete}
        onToggle={handleToggleBookMark}
        users={users}
      />
    </>
  )
}

export default App
