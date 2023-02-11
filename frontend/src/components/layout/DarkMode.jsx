import { useState } from 'react'
import { useSelector } from 'react-redux'

const DarkMode = ({ toggle, onToggleProp }) => {
  const { user } = useSelector((state) => state.auth)

  return (
    <label className='label cursor-pointer p-5'>
      <span className='label-text'>Enable Dark Mode</span>
      <input
        type='checkbox'
        className='toggle'
        checked={toggle}
        onChange={onToggleProp}
      />
    </label>
  )
}

export default DarkMode
