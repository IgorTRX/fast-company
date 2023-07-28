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
// import { useUser } from '../../../hooks/useUsers'

const EditUserPage = () => {
  const history = useHistory()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const { currentUser, updateUserData } = useAuth()
  const { isLoading: qualitiesLoading, qualities } = useQualities()
  const { isLoading: professionsLoading, professions } = useProfession()
  // const { getUsers } = useUser()

  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }))
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }))

  useEffect(() => {
    if (!qualitiesLoading && !professionsLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: getQualitiesListById(currentUser.qualities)
      })
    }
  }, [qualitiesLoading, professionsLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) setIsLoading(false)
  }, [data])

  function getQualitiesListById(qualitisIds) {
    const qualitiesArray = []
    for (const qualId of qualitisIds) {
      for (const quality of qualitiesList) {
        if (quality.value === qualId) {
          qualitiesArray.push(quality)
          break
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
    try {
      await updateUserData({
        ...data,
        qualities: data.qualities.map((qual) => qual.value)
      })
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
          {!isLoading ? (
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
