import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { reset, verify } from '../features/auth/authSlice'
import ThemeSetting from '../components/ThemeSetting'

const Verify = () => {
  const theme = ThemeSetting()

  const { verificationId } = useParams()
  const userData = { verificationId }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(verify(userData))

    setTimeout(() => {
      dispatch(reset())
      navigate('/dashboard')
    }, 2000)
  })

  return (
    <div
      className={`min-h-screen ${theme.transition} ${theme.pageBG} bg-opacity-80 text-center`}
    >
      <form className='card-body'>
        <p>Thank you for verifying your account</p>
        <p>You will now be redirected to the login page</p>
      </form>
    </div>
  )
}

export default Verify
