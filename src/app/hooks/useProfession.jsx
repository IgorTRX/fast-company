import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionService from '../service/profession.service'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext()

export const useProfession = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvaider = ({ children }) => {
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  // вызываем функцию получения profession
  useEffect(() => {
    getProfessions()
  }, [])

  // обработка ошибок 2
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  // получаем professions
  async function getProfessions() {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  // получаем profession по id
  function getProfession(id) {
    return professions.find((prof) => prof._id === id)
  }

  // обработка ошибок 1
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

// типизация входящих
ProfessionProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
