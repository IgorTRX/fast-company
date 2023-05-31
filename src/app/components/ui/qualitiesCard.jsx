import React from 'react'
import PropTypes from 'prop-types'
import Qualities from './qualities'

const QualitiesCard = ({ data }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <Qualities qualities={data} />
        </p>
      </div>
    </div>
  )
}
QualitiesCard.propTypes = {
  data: PropTypes.array
}

export default QualitiesCard
