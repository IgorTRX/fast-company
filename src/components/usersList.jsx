import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import api from '../api/index'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import TextField from './textField'
import _ from 'lodash'

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchName, setSearchName] = useState('') // Search...
  const pageSize = 8

  const [users, setUsers] = useState() // исходное начальное значение [] временно убрал

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    )
  }

  // Search...
  const handleSearchName = ({ target }) => {
    setSearchName(target.value)
    console.log(target.value)
  }
  // Search...
  useEffect(() => {
    searchName && setSelectedProf()
  }, [searchName])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setSearchName('') // Search...
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    // Search...
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchName
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : users

    const count = filteredUsers.length

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <h2>
            <SearchStatus length={count} />
          </h2>

          <TextField
            placeholder="Search..."
            type="text"
            name="search"
            value={searchName}
            onChange={handleSearchName}
          />

          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'loading...'
}

UsersList.propTypes = {
  users: PropTypes.array
}

export default UsersList
