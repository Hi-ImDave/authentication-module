import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import VerifyEmailBar from './VerifyEmailBar'

import { logout, reset } from '../../features/auth/authSlice'
import Dropdown from './Dropdown'
import DarkMode from './DarkMode'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const { viewMode } = useSelector((state) => state.preference)

  const [darkMode, setDarkMode] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <div
        className={`navbar ${
          viewMode ? 'bg-cyan-900' : 'bg-slate-700'
        } text-white`}
      >
        <div className='navbar-start'>{user && <Dropdown />}</div>
        <div className='navbar-center'>
          <Link
            to='/dashboard'
            className='btn btn-ghost normal-case text-lg md:text-3xl'
          >
            Authentication Module
          </Link>
        </div>
        <div className='navbar-end space-x-6'>
          <DarkMode />
          <div>
            {user ? (
              <div onClick={onLogout}>
                <div className='btn btn-ghost normal-case text-base md:text-xl'>
                  <FaSignOutAlt className='mx-1' />
                  Logout
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <Link
                    to='/login'
                    className='btn btn-ghost normal-case text-base md:text-xl'
                  >
                    <FaSignInAlt className='mx-1' /> Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && !user.isActive && <VerifyEmailBar />}
    </>
  )
}

export default Navbar
