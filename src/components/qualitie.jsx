import React from 'react'

//props{ color, name, _id }
const Qualitie = (props) => {
  return (
    <>
      <span key={props._id} className={`badge bg-${props.color} m-1`}>
        {props.name}
      </span>
    </>
  )
}

export default Qualitie
