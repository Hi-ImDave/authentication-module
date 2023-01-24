import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    if (user.isAdmin) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }

    setCheckingStatus(false)
  }, [user])

  return { loggedIn, isAdmin, checkingStatus }
}
