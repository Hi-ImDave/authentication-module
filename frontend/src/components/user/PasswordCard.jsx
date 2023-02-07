import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEye, FaEyeSlash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { changePassword, reset } from '../../features/auth/authSlice'

const PasswordCard = () => {
  const { user, isLoading, isSuccess } = useSelector((state) => state.auth)
  const { viewMode } = useSelector((state) => state.preference)

  const [changeDetails, setChangeDetails] = useState(false)
  const [hidePass, setHidePass] = useState(true)
  const [formData, setFormData] = useState({
    _id: user._id,
    password: '',
    passwordConfirm: '',
  })

  const dispatch = useDispatch()

  const { password, passwordConfirm } = formData

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

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
      password: '',
      passwordConfirm: '',
    })
    setChangeDetails((prevState) => !prevState)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    dispatch(changePassword(formData))
    setFormData({
      password: '',
      passwordConfirm: '',
    })
    toast.success('Password changed successfully')
  }

  return (
    <div
      className={`card w-max ${
        viewMode ? 'bg-cyan-900' : 'bg-sky-900'
      } shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:scale-105`}
    >
      <div className='card-body '>
        <div className=' flex flex-row justify-start'>
          <div className=' flex flex-row justify-start'>
            {changeDetails ? (
              <>
                <div className='absolute top-3 left-3'>
                  <div
                    className='tooltip'
                    data-tip={hidePass ? 'show password' : 'hide password'}
                    onClick={() => {
                      setHidePass((prevState) => !prevState)
                    }}
                  >
                    {hidePass ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
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
                  <div
                    className='tooltip tooltip-error'
                    data-tip='discard changes'
                  >
                    <FaTimes
                      className='text-4xl  hover:text-error'
                      onClick={onCancel}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div
                className='tooltip tooltip-primary absolute top-3 right-3'
                data-tip='change password'
              >
                <FaEdit
                  className='text-4xl  hover:text-violet-600'
                  onClick={onEditClick}
                />
              </div>
            )}
          </div>
          <div className='w-5/6 ml-5'>
            <div className=' grid grid-cols-2 gap-2 justify-items-start'>
              <input
                type={hidePass ? 'password' : 'text'}
                id='password'
                placeholder='new password'
                className={
                  !changeDetails
                    ? 'input w-full max-w-xs '
                    : 'input input-info w-full max-w-xs'
                }
                value={password}
                onChange={onChange}
                disabled={!changeDetails}
              />
              <input
                type={hidePass ? 'password' : 'text'}
                id='passwordConfirm'
                placeholder='confirm new password'
                className={
                  !changeDetails
                    ? 'input w-full max-w-xs'
                    : 'input input-info w-full max-w-xs'
                }
                value={passwordConfirm}
                onChange={onChange}
                disabled={!changeDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordCard
