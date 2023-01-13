import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { useParams, useNavigate } from 'react-router-dom'

import { reset, resetPassword } from '../features/auth/authSlice'

import Button from '../components/layout/Button.jsx'

const ResetPass = () => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const { password, password2 } = formData

  const { id, token } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onPasswordClick = () => {
    setShowPassword((prevState) => !prevState)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        _id: id,
        password,
        token: token,
      }
      await dispatch(resetPassword(userData))
      toast.success('Password reset')
      await dispatch(reset())
      navigate('/')
    }
  }

  return (
    <>
      <div className='hero min-h-screen bg-emerald-500 bg-opacity-60'>
        <div className='hero-content flex-col '>
          <div className='text-center '>
            <h1 className='text-2xl font-bold'>Please choose a new password</h1>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={onSubmit}>
              <div className='form-control space-y-3'>
                <input
                  type={!showPassword ? 'password' : 'text'}
                  placeholder='Enter Password'
                  className='input input-bordered'
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  required
                />
                <input
                  type={!showPassword ? 'password' : 'text'}
                  placeholder='Confirm Password'
                  className='input input-bordered'
                  id='password2'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='flex flex-row'>
                <p className='text-sm'>
                  {!showPassword ? 'show' : 'hide'} password
                </p>
                <input
                  type='checkbox'
                  className='toggle toggle-success'
                  onClick={onPasswordClick}
                />
              </div>
              <div className='form-control mt-6'>
                <Button title='Reset Password' className='btn-primary' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPass
