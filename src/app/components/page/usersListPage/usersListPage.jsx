import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import PropTypes from 'prop-types'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import TextField from '../../common/form/textField'
import _ from 'lodash'
import { useUser } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchQuery, setSearchQuery] = useState('') // Search...
  const pageSize = 8

  const { users } = useUser()
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const { currentUser } = useAuth()

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId))
    console.log(userId)
  }

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    })
    // setUsers(newArray)
    console.log(newArray)
  }

  // Search...
  const handleSearchQuery = (target) => {
    setSelectedProf()
    setSearchQuery(target.value)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery]) // Search...

  const handleProfessionSelect = (item) => {
    searchQuery && setSearchQuery('') // Search...
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  function filterUsers(data) {
    const filteredUsers = selectedProf
      ? data.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchQuery
      ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data
    return filteredUsers.filter((user) => user._id !== currentUser._id)
  }
  const filteredUsers = filterUsers(users)
  const count = filteredUsers.length

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className="d-flex">
      {professions && !professionsLoading && (
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
          name="searchQuery"
          value={searchQuery}
          onChange={handleSearchQuery}
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

UsersListPage.propTypes = {
  users: PropTypes.array
}

export default UsersListPage
