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

  // вызываем функцию получения users
  useEffect(() => {
    getUsers()
  }, [])

  // обработка ошибок 2
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  // получаем users
  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  // обработка ошибок 1
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  function getUserById(id) {
    return users.find((user) => user._id === id)
  }

  // т.к. у нас все данные пользователей отображаются на одной странице и пользователи являются тем от чего у нас зависят все остальные данные, поэтому мы можем сделать глобальную загрузку здесь
  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : 'Loading...'}
    </UserContext.Provider>
  )
}

// типизация входящих
UserProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
