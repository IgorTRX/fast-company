import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import UsersList from './components/usersList'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={UsersList} />
      </Switch>
    </>
  )
}
export default App
