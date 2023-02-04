import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  FaEdit,
  FaMicrophoneSlash,
  FaEnvelope,
  FaRegTrashAlt,
} from 'react-icons/fa'

import { toast } from 'react-toastify'
import Badge from '../layout/Badge'

import {
  getUsers,
  deleteUser,
  muteUser,
  reset,
} from '../../features/auth/authSlice'
import { Spinner } from '../layout/Spinner'

const UserList = () => {
  const { user, users, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  )

  const { email } = user
  const currentUser = user._id

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
      // dispatch(reset())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='p-10 w-3/5'>
      <h2 className='text-center text-4xl mb-4 text-black font-semibold underline'>
        Active Users
      </h2>

      <div className='grid grid-cols-3 gap-2  '>
        {
          users.map((user) => (
            <div
              key={user._id}
              className='card w-96 bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:scale-105'
            >
              <div className='card-body'>
                {user.email === email && (
                  <Badge
                    badgeColor='badge-primary'
                    badgeSize='badge-xs'
                    title='me'
                  />
                )}
                <h2 className='card-title'>
                  {' '}
                  {`${user.firstName} ${user.lastName}`}
                </h2>
                <p>{user.email}</p>
                <div className='absolute top-5 right-5 flex space-x-2'>
                  {user._id !== currentUser && (
                    <div
                      className='tooltip tooltip-error'
                      data-tip={user.isMuted ? 'unmute user' : 'mute user'}
                      onClick={async () => {
                        await dispatch(muteUser(user._id))
                        dispatch(getUsers())
                        toast.success(
                          user.isMuted
                            ? 'User has been unmuted'
                            : 'User has been muted'
                        )
                      }}
                    >
                      <FaMicrophoneSlash className='hover:text-error' />
                    </div>
                  )}
                  {user._id !== currentUser && (
                    <div
                      className='tooltip tooltip-success'
                      data-tip='Message user'
                    >
                      <FaEnvelope className='hover:text-success' />
                    </div>
                  )}

                  <div
                    className='tooltip tooltip-warning'
                    data-tip='Edit user details'
                  >
                    <FaEdit className='hover:text-warning' />
                  </div>
                  <button
                    className='tooltip tooltip-error'
                    data-tip='Delete user'
                    onClick={async () => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this user?'
                        )
                      ) {
                        await dispatch(deleteUser(user._id))
                        dispatch(getUsers())
                        toast.success('User deleted successfully')
                      }
                    }}
                  >
                    <FaRegTrashAlt className='hover:text-error' />
                  </button>
                </div>

                <div className='absolute space-x-2 bottom-0 right-0 p-4'>
                  {user.isAdmin && (
                    <Badge badgeColor='badge-info' title='admin' />
                  )}
                  {user.isActive && (
                    <Badge badgeColor='badge-success' title='verified email' />
                  )}
                  {user.isMuted && (
                    <Badge badgeColor='badge-error' title='muted' />
                  )}
                </div>
              </div>
            </div>
          ))
          // .filter((user) => user.key !== currentUser)
        }
      </div>
    </div>
  )
}

export default UserList
