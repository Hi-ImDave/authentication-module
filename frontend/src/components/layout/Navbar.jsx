import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'

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

  const { _id, firstName, lastName, email } = user

  const onVerifyResend = () => {
    dispatch(
      sendVerification({
        _id,
        firstName,
        lastName,
        email,
      })
    )
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
              </ul>
            </div>
          )}
        </div>
        <div className='navbar-center'>
          <Link to='/dashboard' className='btn btn-ghost normal-case text-3xl'>
            Chat Module
          </Link>
        </div>

        {user ? (
          <div className='navbar-end' onClick={onLogout}>
            <div className='btn btn-ghost normal-case text-xl'>
              <FaSignOutAlt className='mx-1' />
              Logout
            </div>
          </div>
        ) : (
          <div className='navbar-end'>
            <div>
              <Link to='/login' className='btn btn-ghost normal-case text-xl'>
                <FaSignInAlt className='mx-1' /> Login
              </Link>
            </div>
            <div>
              <Link
                to='/register'
                className='btn btn-ghost normal-case text-xl'
              >
                <FaUser className='mx-1' /> Register
              </Link>
            </div>
          </div>
        )}
      </div>
      {user && !user.isActive && (
        <div className='alert shadow-lg'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-info flex-shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span>Don't forget to verify your email address!</span>
          </div>
          <div className='flex-none'>
            <button className='btn btn-sm btn-primary' onClick={onVerifyResend}>
              Resend verification link
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
