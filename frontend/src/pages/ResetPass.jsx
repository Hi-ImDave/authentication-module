import { useState } from 'react'

import Button from '../components/layout/Button.jsx'

const ResetPass = () => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const { password, password2 } = formData

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onPasswordClick = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <>
      <div className='hero min-h-screen bg-emerald-500 bg-opacity-60'>
        <div className='hero-content flex-col '>
          <div className='text-center '>
            <h1 className='text-2xl font-bold'>Please choose a new password</h1>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body'>
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
