import React from 'react'

//props{status, ...rest}
const BookMark = (props) => {
  return (
    <span onClick={() => props.toggle(props._id)}>
      <i
        className={props.bookmark ? 'bi bi-person-check' : 'bi bi-person-add'}
        style={{ fontSize: '2rem', color: 'cornflowerblue' }}></i>
    </span>
  )
}

export default BookMark
