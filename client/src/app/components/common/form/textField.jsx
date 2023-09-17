import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({
  label,
  placeholder, // Search...
  type,
  name,
  value,
  onChange,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '') // значек ошибки
  }

  const switchShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          placeholder={placeholder} // Search...
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={switchShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {/* поменял && на ? чтоб убрать лишнее закругление */}
        {error ? <div className="invalid-feedback">{error}</div> : <div></div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField
