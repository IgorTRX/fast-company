import React from 'react'

const SearchStatus = (props) => {
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
      <span
        className={props.length > 0 ? 'badge bg-primary' : 'badge bg-danger'}>
        {props.length > 0
          ? `${props.length} ${renderPhrase(props.length)} c тобой сегодня`
          : 'Никто с тобой не тусанет'}
      </span>
    </>
  )
}

export default SearchStatus
