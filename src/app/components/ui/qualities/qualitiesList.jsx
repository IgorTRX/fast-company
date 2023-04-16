import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qualiti) => (
        <Quality {...qualiti} key={qualiti._id} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default QualitiesList
