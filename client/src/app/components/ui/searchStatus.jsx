import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const people = ['человек тусанет', 'человека тусанут']
    if (number > 100) number = number % 100
    if (number <= 20 && number >= 10) return people[0]
    if (number > 20) number = number % 10
    return number > 1 && number < 5 ? people[1] : people[0]
  }
  // const renderPhrase = (number) => {
  //   const lastOne = Number(number.toString().slice(-1))
  //   if (number > 4 && number < 15) return 'человек тусанет'
  //   if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
  //   if (lastOne === 1) return 'человек тусанет'
  //   return 'человек тусанет'
  // }

  return (
    <>
      <span className={length > 0 ? 'badge bg-primary' : 'badge bg-danger'}>
        {length > 0
          ? `${length} ${renderPhrase(length)} c тобой сегодня`
          : 'Никто с тобой не тусанет'}
      </span>
    </>
  )
}
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
}
export default SearchStatus
