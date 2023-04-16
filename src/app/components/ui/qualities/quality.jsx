import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ color, name, _id }) => {
  return (
    <span key={_id} className={`badge bg-${color} m-1`}>
      {name}
    </span>
  )
}
Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
}
export default Quality
