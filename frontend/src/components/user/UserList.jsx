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

const UserList = () => {
  const { user, users, isSuccess } = useSelector((state) => state.auth)
  const { viewDark } = useSelector((state) => state.preference)

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

  return (
    <div className='p-10 w-3/5  '>
      <h2
        className={`text-center text-4xl mb-4 transition-colors duration-1000 ease-in-out ${
          !viewDark && 'text-black'
        } font-semibold underline`}
      >
        Active Users
      </h2>

      <div className='grid grid-cols-3 gap-2'>
        {users.map((user) => (
          <div
            key={user._id}
            className={`card w-96 transition-colors duration-1000 ease-in-out ${
              viewDark ? 'bg-darkModeCard' : 'bg-lightModeCard'
            } shadow-xl transition ease-in-out delay-150  duration-300 hover:scale-105`}
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
                    className='tooltip tooltip-error transition duration-200 active:scale-90 '
                    data-tip={user.isMuted ? 'unmute user' : 'mute user'}
                    onClick={async () => {
                      await dispatch(muteUser(user._id))
                      dispatch(getUsers())
                      toast.success(
                        user.isMuted
                          ? `${user.firstName} ${user.lastName} has been unmuted`
                          : `${user.firstName} ${user.lastName} has been muted`
                      )
                    }}
                  >
                    <FaMicrophoneSlash
                      className={
                        user.isMuted ? 'text-error' : 'hover:text-error'
                      }
                    />
                  </div>
                )}
                {user._id !== currentUser && (
                  <div
                    className='tooltip tooltip-success transition duration-200 active:scale-90'
                    data-tip='Message user'
                  >
                    <FaEnvelope className='hover:text-success' />
                  </div>
                )}

                <div
                  className='tooltip tooltip-warning transition duration-200 active:scale-90'
                  data-tip='Edit user details'
                >
                  <FaEdit className='hover:text-warning' />
                </div>
                <button
                  className='tooltip tooltip-error transition duration-200 active:scale-90'
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
