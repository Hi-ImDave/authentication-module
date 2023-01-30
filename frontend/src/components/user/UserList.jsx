import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaEdit, FaUsers, FaEnvelope } from 'react-icons/fa'

import Badge from '../layout/Badge'

import { getUsers, reset } from '../../features/auth/authSlice'
import { Spinner } from '../layout/Spinner'

const UserList = () => {
  const { user, users, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  )

  const { email } = user

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
      dispatch(reset())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='p-10 w-3/4'>
      <h2 className='text-center text-4xl mb-4 text-black font-semibold underline'>
        Active Users
      </h2>

      <div className='grid grid-cols-3 gap-2  '>
        {users.map((user) => (
          <div
            key={user._id}
            className='card w-96 bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:scale-105'
          >
            <div className='card-body'>
              {user.email === email && (
                <Badge
                  badgeColor='badge-success'
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
                <FaEnvelope className='hover:text-success' />
                <FaEdit className='hover:text-warning' />
              </div>

              <div className='absolute space-x-2 bottom-0 right-0 pb-4 pr-4'>
                {user.isActive && (
                  <Badge badgeColor='badge-primary' title='verified email' />
                )}
                {user.isAdmin && (
                  <Badge badgeColor='badge-error' title='admin' />
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
