import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfessions } from '../../store/professions'
import { signUp } from '../../store/users'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const qualities = useSelector(getQualities())
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }))

  const professions = useSelector(getProfessions())
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = {
      ...data,
      qualities: data.qualities.map((qual) => qual.value)
    }
    dispatch(signUp(newData))
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
