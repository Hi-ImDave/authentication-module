import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { logout, reset } from '../../features/auth/authSlice'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <div onClick={onLogout}>
      <div className='btn btn-ghost normal-case text-base md:text-xl'>
        <FaSignOutAlt className='mx-1' />
        Logout
      </div>
    </div>
  )
}

export default Logout
