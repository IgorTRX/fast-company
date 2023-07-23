import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const history = useHistory()
  const { signIn } = useAuth()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    setEnterError(null)
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Поле обязательно для заполнения' }
    },
    password: {
      isRequired: { message: 'Поле обязательно для заполнения' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      await signIn(data)
      history.push(
        history.location.state.from.pathname
          ? history.location.state.from.pathname
          : '/'
      )
    } catch (error) {
      setEnterError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>

      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        type="submit"
        disabled={!isValid || enterError}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
