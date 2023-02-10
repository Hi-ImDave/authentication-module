import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import { register, reset } from '../features/auth/authSlice'
import { sendVerification } from '../features/mail/mailSlice'
import { Spinner } from '../components/layout/Spinner'
import Button from '../components/layout/Button.jsx'

const Register = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  const { viewDark } = useSelector((state) => state.preference)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  })

  const { id } = useParams()

  console.log(id)

  const { firstName, lastName, email, password, password2 } = formData

  const dispatch = useDispatch()

  const navigate = useNavigate()

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

  const onSubmit = async (event) => {
    event.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        id,
        firstName,
        lastName,
        email,
        password,
      }

      const response = await dispatch(register(userData))
      dispatch(
        sendVerification({
          _id: response.payload._id,
          firstName,
          lastName,
          email,
        })
      )
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div
        className={`hero min-h-screen transition-colors duration-1000 ease-in-out ${
          viewDark ? 'bg-darkModeBG' : 'bg-lightModeBG'
        } bg-opacity-80`}
      >
        <div className='hero-content flex-col'>
          <div className='text-center flex '>
            <FaUser className='mr-3 text-2xl  md:text-5xl font-bold' />
            <h1 className='text-2xl md:text-5xl font-bold'>Register now!</h1>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <div className='card-body'>
              <form className='' onSubmit={onSubmit}>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>First name</span>
                  </label>
                  <input
                    type='text'
                    placeholder='First Name'
                    className='input input-bordered'
                    id='firstName'
                    name='firstName'
                    value={firstName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Last name</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Last Name'
                    className='input input-bordered'
                    id='lastName'
                    name='lastName'
                    value={lastName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='Email'
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
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Re-Enter Password</span>
                  </label>
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    className='input input-bordered'
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='form-control mt-6'>
                  <Button
                    title='Register'
                    className='btn-primary btn-lg md:btn-md'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
