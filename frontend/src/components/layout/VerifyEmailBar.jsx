import { useSelector, useDispatch } from 'react-redux'

import { sendVerification } from '../../features/mail/mailSlice'

const VerifyEmailBar = () => {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onVerifyResend = () => {
    const { _id, firstName, lastName, email } = user
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
  )
}

export default VerifyEmailBar
