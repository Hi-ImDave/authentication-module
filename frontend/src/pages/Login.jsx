import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { login, reset } from '../features/auth/authSlice'
import { setViewDark } from '../features/preferences/preferenceSlice'
import { Spinner } from '../components/layout/Spinner'
import Button from '../components/layout/Button.jsx'
import ThemeSetting from '../components/ThemeSetting'

const Login = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  const theme = ThemeSetting()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/dashboard')
      dispatch(setViewDark(user.settings))
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
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
      <div
        className={`hero min-h-screen ${theme.transition} ${theme.pageBG} bg-opacity-80`}
      >
        <div className='hero-content flex-col '>
          <div className='text-center flex'>
            <FaSignInAlt className='mr-3 text-2xl md:text-5xl font-bold' />
            <h1 className='text-2xl md:text-5xl font-bold'>Login now!</h1>
          </div>
          <div
            className={`card flex-shrink-0 w-full max-w-sm shadow-2xl ${theme.cardBG}`}
          >
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
