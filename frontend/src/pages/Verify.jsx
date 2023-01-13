import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { verify } from '../features/auth/authSlice'

const Verify = () => {
  const { verificationId } = useParams()
  const userData = { verificationId }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verify(userData))
  })

  return (
    <div className='min-h-screen bg-emerald-500 bg-opacity-60 text-center'>
      <form className='card-body'>
        <div>Thank you for verifying your account</div>
      </form>
    </div>
  )
}

export default Verify
