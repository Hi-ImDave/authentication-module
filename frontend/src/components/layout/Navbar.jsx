import { Link } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import VerifyEmailBar from './VerifyEmailBar'

import Dropdown from './Dropdown'
import ColorTheme from './ColorTheme'
import Logout from './Logout'

import ThemeSetting from '../ThemeSetting'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const theme = ThemeSetting()

  return (
    <>
      <div className={`navbar ${theme.transition} ${theme.cardBG} text-white`}>
        <div className='navbar-start'>{user && <Dropdown />}</div>
        <div className='navbar-center'>
          <Link
            to={user ? '/dashboard' : '/'}
            className='btn btn-ghost normal-case mr-4 text-lg md:text-3xl'
          >
            Authentication Module
          </Link>
        </div>
        <div className='navbar-end lg:space-x-8'>
          <ColorTheme />
          <div>
            {user ? (
              <Logout />
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
