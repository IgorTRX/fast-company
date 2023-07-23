import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // стили
import { ProfessionProvaider } from './hooks/useProfession'
import { QualitiesProvaider } from './hooks/useQualities'
import { AuthProvaider } from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'

const App = () => {
  return (
    <>
      <AuthProvaider>
        <NavBar />
        <ProfessionProvaider>
          <QualitiesProvaider>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Redirect to="/" />
            </Switch>
          </QualitiesProvaider>
        </ProfessionProvaider>
      </AuthProvaider>
      <ToastContainer />
    </>
  )
}
export default App
