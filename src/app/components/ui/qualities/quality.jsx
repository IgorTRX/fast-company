import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ _id, color, name }) => {
  return (
    <span key={_id} className={`badge bg-${color} m-1`}>
      {name}
    </span>
  )
}
Quality.propTypes = {
  _id: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string
}
export default Quality
