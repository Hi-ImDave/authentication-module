import React from 'react'

const InviteForm = () => {
  return (
    <div className='card bg-base-100 shadow-xl form-control h-min w-1/4 mt-24 ml-8'>
      <div className='card-body '>
        <label className='cursor-pointer label '>
          <span className='label-text mr-4'>
            Invite with administrator privileges
          </span>
          <input type='checkbox' className='checkbox checkbox-error' />
        </label>
        <input
          type='text'
          placeholder='User email'
          className='input  input-success w-full max-w-xs bg-white bg-opacity-80 text-black mt-4'
        />
      </div>
      <button className='btn btn-xs btn-success sm:btn-sm md:btn-md  m-3'>
        Invite new user
      </button>
    </div>
  )
}

export default InviteForm
