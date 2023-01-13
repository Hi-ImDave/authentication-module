import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Avatar from '../components/layout/Avatar'
import Button from '../components/layout/Button'
import { toast } from 'react-toastify'

import { update, reset } from '../features/auth/authSlice'

const Profile = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  const [changeDetails, setChangeDetails] = useState(false)
  const [adminPanel, setAdminPanel] = useState(false)
  const [formData, setFormData] = useState({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: user.token,
    isAdmin: user.isAdmin,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  const { firstName, lastName, email, _id, token, isAdmin } = formData

  const onSubmit = (event) => {
    event.preventDefault()
    const userData = {
      _id,
      firstName,
      lastName,
      email,
      token,
      isAdmin,
    }
    dispatch(update(userData))
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

  const onAdminClick = () => {
    setAdminPanel((prevState) => !prevState)
  }

  return (
    <>
      <div className='min-h-screen bg-emerald-500 bg-opacity-60'>
        <div className='flex flex-row justify-start'>
          <div className='m-5'>
            <Avatar profilePicture='https://placeimg.com/192/192/people' />
          </div>
          <div className='max-w-md mt-7'>
            <Button
              title={changeDetails ? 'Submit Changes' : 'Edit Profile'}
              className='btn-primary mx-1'
              onClick={onEditClick}
            />
            {isAdmin && (
              <Button
                title='Open Admin Panel'
                className='btn-primary mx-1'
                onClick={onAdminClick}
              />
            )}
          </div>
        </div>
        <div className='w-11/12 sm:w-1/2 lg:w-1/3 ml-5'>
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
            <input
              type='text'
              id='password'
              className={
                !changeDetails
                  ? 'input w-full max-w-xs'
                  : 'input input-info w-full max-w-xs'
              }
              onChange={onChange}
              disabled={!changeDetails}
            />
            <input
              type='text'
              id='passwordConfirm'
              className={
                !changeDetails
                  ? 'input w-full max-w-xs'
                  : 'input input-info w-full max-w-xs'
              }
              onChange={onChange}
              disabled={!changeDetails}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
