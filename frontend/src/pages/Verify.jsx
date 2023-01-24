import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { reset, verify } from '../features/auth/authSlice'

const Verify = () => {
  const { verificationId } = useParams()
  const userData = { verificationId }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(verify(userData))

    setTimeout(() => {
      dispatch(reset())
      navigate('/login')
    }, 3000)
  })

  return (
    <div className='min-h-screen bg-white bg-opacity-80 text-center'>
      <form className='card-body'>
        <p>Thank you for verifying your account</p>
        <p>You will now be redirected to the login page</p>
      </form>
    </div>
  )
}

export default Verify
