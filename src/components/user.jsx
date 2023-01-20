import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'

const User = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {props.qualities.map((qualiti) => (
          <Qualitie key={qualiti._id} {...qualiti} />
        ))}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}/5</td>
      <td>
        <BookMark {...props} />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.delete(props._id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
