import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStatus } from '../hooks/useAuthStatus'
import { Spinner } from './layout/Spinner'

const AdminRoute = () => {
  const { loggedIn, isAdmin, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }
  console.log(isAdmin)
  return loggedIn && isAdmin ? (
    <Outlet />
  ) : loggedIn ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  )
}

export default AdminRoute
