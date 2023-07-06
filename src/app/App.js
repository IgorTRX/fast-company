import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // стили
import { ProfessionProvaider } from './hooks/useProfession'

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionProvaider>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/users/:userId?/:edit?" component={Users} />
          <Redirect to="/" />
        </Switch>
      </ProfessionProvaider>
      <ToastContainer />
    </>
  )
}
export default App
