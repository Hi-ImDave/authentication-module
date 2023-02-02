import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'

import VerifyEmailBar from './VerifyEmailBar'

import { logout, reset } from '../../features/auth/authSlice'
import { sendVerification } from '../../features/mail/mailSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <div className='navbar bg-cyan-900 text-white'>
        <div className='navbar-start'>
          {user && (
            <div className='dropdown dropdown-hover '>
              <label tabIndex={0} className='btn btn-ghost btn-circle m-1'>
                <HiMenuAlt2 className='h-5 w-5' />
              </label>

              <ul
                tabIndex={0}
                className='menu dropdown-content  p-2 shadow bg-slate-800 rounded-box w-52'
              >
                <li>
                  <Link to='/dashboard'>My Dashboard</Link>
                </li>

                <li>
                  <Link to='/profile'>Profile</Link>
                </li>
                {user.isAdmin && (
                  <li>
                    <Link to='/admin'>Admin Panel</Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className='navbar-center'>
          <Link
            to='/dashboard'
            className='btn btn-ghost normal-case text-lg md:text-3xl'
          >
            Authentication Module
          </Link>
        </div>

        {user ? (
          <div className='navbar-end' onClick={onLogout}>
            <div className='btn btn-ghost normal-case text-base md:text-xl'>
              <FaSignOutAlt className='mx-1' />
              Logout
            </div>
          </div>
        ) : (
          <div className='navbar-end'>
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
      {user && !user.isActive && <VerifyEmailBar />}
    </>
  )
}

export default Navbar
