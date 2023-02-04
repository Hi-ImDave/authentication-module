import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Avatar from '../layout/Avatar'
import { toast } from 'react-toastify'
import { Spinner } from '../layout/Spinner'
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

import { update, reset } from '../../features/auth/authSlice'
import { sendVerification } from '../../features/mail/mailSlice'

const UserDetails = () => {
  const { user, isLoading, isSuccess } = useSelector((state) => state.auth)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: user.token,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
  })
  const prevEmail = user.email
  const prevFirstName = user.firstName
  const prevLastName = user.lastName

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  const { firstName, lastName, email, _id, token, isAdmin, isActive } = formData

  const onSubmit = (event) => {
    event.preventDefault()

    if (
      firstName == prevFirstName &&
      lastName == prevLastName &&
      email == prevEmail
    ) {
      return onCancel
    }

    const userData = {
      _id,
      firstName,
      lastName,
      email,
      token,
      isAdmin,
      isActive,
      prevEmail,
    }

    dispatch(update(userData))
    if (prevEmail !== email) {
      dispatch(
        sendVerification({
          _id,
          firstName,
          lastName,
          email,
        })
      )
    }
    toast.success('Changes submitted successfully!')
  }

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  const onEditClick = (event) => {
    changeDetails && onSubmit(event)
    setChangeDetails((prevState) => !prevState)
  }

  const onCancel = () => {
    setFormData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: user.token,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    })
    setChangeDetails((prevState) => !prevState)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='card w-max bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:scale-105'>
      <div className='card-body '>
        <div className=' flex flex-row justify-start'>
          <div className='m-5 '>
            <Avatar profilePicture='https://placeimg.com/192/192/people' />
          </div>

          {changeDetails ? (
            <div className='flex absolute top-3 right-3'>
              <div
                className='tooltip tooltip-success'
                data-tip='submit changes'
              >
                <FaCheck
                  className='text-4xl  hover:text-success'
                  onClick={onEditClick}
                />
              </div>
              <div className='tooltip tooltip-error' data-tip='discard changes'>
                <FaTimes
                  className='text-4xl  hover:text-error'
                  onClick={onCancel}
                />
              </div>
            </div>
          ) : (
            <div
              className='tooltip tooltip-primary absolute top-3 right-3'
              data-tip='edit user details'
            >
              <FaEdit
                className='text-4xl  hover:text-violet-600'
                onClick={onEditClick}
              />
            </div>
          )}
        </div>
        <div className='w-11/12 ml-5'>
          <div className=' grid grid-cols-2 gap-2 justify-items-start'>
            <input
              type='text'
              id='firstName'
              className={
                !changeDetails
                  ? 'input w-full max-w-xs'
                  : 'input input-info w-full max-w-xs'
              }
              value={firstName}
              onChange={onChange}
              disabled={!changeDetails}
            />
            <input
              type='text'
              id='lastName'
              className={
                !changeDetails
                  ? 'input w-full max-w-xs'
                  : 'input input-info w-full max-w-xs'
              }
              value={lastName}
              onChange={onChange}
              disabled={!changeDetails}
            />
            <input
              type='text'
              id='email'
              className={
                !changeDetails
                  ? 'input w-full max-w-xs col-span-2'
                  : 'input input-info w-full max-w-xs col-span-2'
              }
              value={email}
              onChange={onChange}
              disabled={!changeDetails}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
