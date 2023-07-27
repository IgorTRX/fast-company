import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../service/user.service'
import { toast } from 'react-toastify'

const UserContext = React.createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvaider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  function getUserById(id) {
    return users.find((user) => user._id === id)
  }

  return (
    <UserContext.Provider value={{ users, getUsers, getUserById }}>
      {!isLoading ? children : 'Loading...'}
    </UserContext.Provider>
  )
}

UserProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
