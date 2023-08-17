import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // стили
import { AuthProvaider } from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])
  return (
    <>
      <AuthProvaider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Redirect to="/" />
        </Switch>
      </AuthProvaider>
      <ToastContainer />
    </>
  )
}
export default App
