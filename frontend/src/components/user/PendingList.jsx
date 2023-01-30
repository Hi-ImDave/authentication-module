import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaEdit, FaRegClock, FaRegTrashAlt } from 'react-icons/fa'

import Badge from '../layout/Badge'

import { getPending, reset } from '../../features/auth/authSlice'
import { Spinner } from '../layout/Spinner'

const PendingList = () => {
  const { pending, isLoading, isSuccess } = useSelector((state) => state.auth)

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
    dispatch(getPending())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const getTimeElapsed = (date) => {
    const myDate = new Date(date)
    const offset = myDate.getTimezoneOffset() * 60 * 1000

    const withOffset = myDate.getTime()

    const timeDifference = Date.now() - withOffset

    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
    return days
  }

  return (
    <div className='p-10 w-3/4'>
      <h2 className='text-center text-4xl mb-4 text-black font-semibold underline'>
        Pending Invites
      </h2>

      <div className='grid grid-cols-2 gap-2  '>
        {pending.map((invite) => (
          <div
            key={invite._id}
            className='card  bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:scale-105'
          >
            <div className='card-body flex flex-col justify-between'>
              <span>{invite.email}</span>
              <div className='flex flex-row'>
                <FaRegClock className='hover:text-success text-xl mr-2' />
                {getTimeElapsed(invite.createdAt)}d
              </div>

              <div className='absolute top-5 right-5 flex space-x-2'>
                <FaRegTrashAlt className='hover:text-error' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PendingList