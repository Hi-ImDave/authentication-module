import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'

import { inviteUser, getPending } from '../../features/auth/authSlice'
import { sendInvite } from '../../features/mail/mailSlice'

const InviteForm = () => {
  const { viewMode } = useSelector((state) => state.preference)

  const [formData, setFormData] = useState({
    email: '',
  })

  const { email } = formData

  const dispatch = useDispatch()

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (!email) {
      toast.error('Please enter a valid email address')
    } else {
      const data = {
        email,
      }
      const response = await dispatch(inviteUser(data))
      if (response.payload) {
        dispatch(sendInvite(response.payload))
      }
      dispatch(getPending())
      setFormData({ email: '' })
    }
  }

  return (
    <div
      className={`card ${
        viewMode ? 'bg-cyan-900' : 'bg-sky-900'
      } shadow-xl form-control h-min w-3/4 mt-24 ml-8`}
    >
      <div className='card-body '>
        <form onSubmit={onSubmit}>
          <div className='form-control flex flex-row justify-between'>
            <input
              type='text'
              placeholder='User email'
              className='input  input-success w-full max-w-xs bg-white bg-opacity-80 text-black mt-4'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
            <button className='btn btn-xs btn-success sm:btn-sm md:btn-md  m-3'>
              <FaPlus className='mr-2' />
              Invite new user
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InviteForm
