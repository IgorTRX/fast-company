import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, id, toggle }) => {
  return (
    <span onClick={() => toggle(id)}>
      <i
        className={status ? 'bi bi-person-check' : 'bi bi-person-add'}
        style={{ fontSize: '2rem', color: 'cornflowerblue' }}
      ></i>
    </span>
  )
}
BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
}
export default BookMark
