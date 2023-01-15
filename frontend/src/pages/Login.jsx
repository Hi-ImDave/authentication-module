import { useState, useEffect } from 'react'
import { FaSignInAlt, FaTwitter, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { login, reset } from '../features/auth/authSlice'
import { Spinner } from '../components/layout/Spinner'
import Button from '../components/layout/Button.jsx'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset)
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onGoogleClick = () => {
    console.log('google')
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='hero min-h-screen bg-emerald-500 bg-opacity-60'>
        <div className='hero-content flex-col '>
          <div className='text-center flex'>
            <FaSignInAlt className='mr-3 text-2xl md:text-5xl font-bold' />
            <h1 className='text-2xl md:text-5xl font-bold'>Login now!</h1>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={onSubmit}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
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
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  className='input input-bordered'
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  required
                />
                <label className='label'>
                  <Link to='/forgot-password'>
                    <p className='label-text-alt link link-hover'>
                      Forgot password?
                    </p>
                  </Link>
                </label>
              </div>
              <div className='form-control mt-6'>
                <Button
                  title='Login'
                  className='btn-primary btn-lg md:btn-md'
                />
              </div>
            </form>
            <div className='divider'>OR</div>
            <div className='m-6 flex justify-around '>
              <Button
                title={<FcGoogle size='2em' />}
                className='btn-ghost btn-circle '
                onClick={onGoogleClick}
              />
              <Button
                title={<FaTwitter size='2em' color='#00ACEE' />}
                className='btn-ghost btn-circle '
              />
              <Button
                title={<FaFacebook size='2em' color='#3B5998' />}
                className='btn-ghost btn-circle '
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
