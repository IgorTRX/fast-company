import React, { useState, useEffect } from 'react'
import api from '../../api'
import PropTypes from 'prop-types'
import {
  TextField,
  SelectField,
  MultiSelectField,
  RadioField
} from '../common/form'
import { useHistory } from 'react-router-dom'

const EditUserForm = ({ user, setUser }) => {
  // console.log(user)
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    profession: user.profession._id,
    qualities: Object.keys(user.qualities).map((key) => ({
      label: user.qualities[key].name,
      value: user.qualities[key]._id,
      color: user.qualities[key].color
    })),
    sex: user.sex
  })

  const history = useHistory()
  const [qualities, setQualities] = useState()
  const [professions, setProfessions] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const handleChange = (target) => {
    // console.log(target)
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(data)
    // const isValid = validate()
    // if (!isValid) return // прерывает дальнейшее выполнение кода в методе если ошибка(!false)
    const { profession, qualities } = data
    const editedData = {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    }
    api.users.update(user._id, editedData).then((data) => {
      setUser(data)
      history.push(`/users/${user._id}`)
    })
  }

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  // const handleClick = () => {
  //   history.push(`/users/${user._id}`)
  // }

  if (professions && qualities) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h3 className="mb-4">Edit</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                // error={errors.email}
              />
              <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                // error={errors.password}
              />
              <SelectField
                label="Выберите вашу профессию"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Choose..."
                options={professions}
                // error={errors.profession}
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
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
              />
              <button
                type="submit"
                // disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  return 'Loading...'
}

EditUserForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
}

export default EditUserForm
