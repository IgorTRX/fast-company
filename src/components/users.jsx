import React from 'react'
import User from './user'

//props{ users, ...rest }
const Users = (props) => {
  return (
    <>
      {props.users.map((user) => (
        <User
          key={user._id}
          delete={props.onDelete}
          toggle={props.onToggle}
          {...user}
        />
      ))}
    </>
  )
}

export default Users
