import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
  return (
    <span {...rest}>
      <i
        className={status ? 'bi bi-person-check' : 'bi bi-person-add'}
        style={{ fontSize: '2rem', color: 'cornflowerblue' }}
      ></i>
    </span>
  )
}

BookMark.propTypes = {
  status: PropTypes.bool
}

export default BookMark
