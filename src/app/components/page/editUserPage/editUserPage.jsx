import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import {
  TextField,
  SelectField,
  MultiSelectField,
  RadioField
} from '../../common/form'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import { useProfession } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useUser } from '../../../hooks/useUsers'

const EditUserPage = () => {
  const history = useHistory()
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    qualities: [],
    sex: 'male'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { currentUser, editUser } = useAuth()
  const { isLoading: qualitiesLoading, qualities } = useQualities()
  const { isLoading: professionsLoading, professions } = useProfession()
  const { getUsers } = useUser()

  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }))
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }))

  if (!qualitiesLoading && !professionsLoading && !isLoading) {
    defaultFields()
    setIsLoading(true)
  }

  function defaultFields() {
    setData((prevState) => ({
      ...prevState,
      ...data,
      name: currentUser.name,
      email: currentUser.email,
      qualities: currentUserQualities(qualitiesList),
      profession: currentUser.profession,
      sex: currentUser.sex
    }))
  }

  function currentUserQualities(elements) {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const index in currentUser.qualities) {
        if (elem.value === currentUser.qualities[index]) {
          qualitiesArray.push(elem)
        }
      }
    }
    return qualitiesArray
  }

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = {
      ...data,
      _id: currentUser._id,
      qualities: data.qualities.map((qual) => qual.value)
    }
    try {
      await editUser(newData)
      await getUsers()
      history.push(`/users/${currentUser._id}`)
    } catch (error) {
      setErrors(error)
    }
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Поле обязательно для заполнения' },
      isEmail: { message: 'Email введен некорректно' }
    },
    name: { isRequired: { message: 'Поле обязательно для заполнения' } }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // для активации кнопки
  const isValid = Object.keys(errors).length === 0

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {isLoading ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
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
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
