import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  // console.log(api.users.fetchAll())

  //для удаления users
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }
  //для количества users
  const renderPhrase = (number) => {
    const people = ['человек тусанет', 'человека тусанут']
    if (number > 100) number = number % 100
    if (number <= 20 && number >= 10) return people[0]
    if (number > 20) number = number % 10
    return number > 1 && number < 5 ? people[1] : people[0]
  }

  return (
    <>
      <h2>
        <span
          className={
            users.length !== 0 ? 'badge bg-primary' : 'badge bg-danger'
          }>
          {users.length !== 0
            ? `${users.length} ${renderPhrase(users.length)} c тобой сегодня`
            : 'Никто с тобой не тусанет'}
        </span>
      </h2>
      {users.length !== 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qualiti) => (
                    <span
                      key={qualiti._id}
                      className={`badge bg-${qualiti.color} m-1`}>
                      {qualiti.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
