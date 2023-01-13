import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { sendReset } from '../features/mail/mailSlice.js'
import { toast } from 'react-toastify'

import Button from '../components/layout/Button.jsx'
import { FaSignInAlt } from 'react-icons/fa'

const ForgotPass = () => {
  const [formData, setFormData] = useState({
    email: '',
  })

  const { email } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    dispatch(sendReset(formData))
    navigate('/login')
    toast.success('Code sent successfully')
  }

  return (
    <>
      <div className='hero min-h-screen bg-emerald-500 bg-opacity-60'>
        <div className='hero-content flex-col '>
          <div className='text-center '>
            <h1 className='text-2xl font-bold'>
              Please enter the email address associated with your account
            </h1>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={onSubmit}>
              <div className='form-control'>
                <input
                  type='email'
                  placeholder='Enter Email'
                  className='input input-bordered'
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className='form-control mt-6'>
                <Button title='Send reset code' className='btn-primary' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPass
