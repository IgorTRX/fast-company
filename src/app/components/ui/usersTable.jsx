import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table'
import { Link } from 'react-router-dom'
import Profession from './profession'

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      )
    }
  }

  return <Table {...{ onSort, selectedSort, columns, data: users }} />
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UsersTable
