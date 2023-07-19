import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useQualities } from '../../hooks/useQualities'
import { useProfession } from '../../hooks/useProfession'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const { signUp } = useAuth()
  const { qualities } = useQualities()
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }))

  const { professions } = useProfession()
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }))

  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Email введен некорректно' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalLetter: {
        message: 'Пароль должен содержать минимум одну заглавную букву'
      },
      isContainDigit: { message: 'Пароль должен содержать минимум одно число' },
      isMinAmountNumbers: {
        message: 'Пароль должен состаять минимум из 8 символов',
        value: 8
      }
    },
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' },
      isMinAmountNumbers: {
        message: 'Имя должно состаять минимум из 3 символов',
        value: 3
      }
    },
    profession: {
      isRequired: { message: 'Обязательно выберете вашу профессию' }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
      }
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
      await signUp(data)
      history.push('/')
    } catch (error) {
      setErrors(error)
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
      <TextField
        label="Имя"
        type="name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <SelectField
        label="Выберите вашу профессию"
        name="profession"
        value={data.profession}
        onChange={handleChange}
        defaultOption="Choose..."
        options={professionsList}
        error={errors.profession}
      />
      <RadioField
        label="Выберите ваш пол"
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />

      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
