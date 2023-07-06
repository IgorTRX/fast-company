import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ id }) => {
  const { isLoading, getQuality } = useQualities()

  const userQualities = getQuality(id)

  if (!isLoading) {
    return (
      <>
        {userQualities.map((quality) => (
          <Quality {...quality} key={quality._id} />
        ))}
      </>
    )
  } else return 'Loading...'
}

QualitiesList.propTypes = {
  id: PropTypes.PropTypes.arrayOf(PropTypes.string)
}

export default QualitiesList
