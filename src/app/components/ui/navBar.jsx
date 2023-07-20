import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const NavBar = () => {
  const { currentUser } = useAuth()
  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <ul className="nav">
          <li className="nav-item d-flex">
            {currentUser ? (
              <Link className="nav-link" aria-current="page" to="">
                {currentUser.name}
              </Link>
            ) : (
              <Link className="nav-link" aria-current="page" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
