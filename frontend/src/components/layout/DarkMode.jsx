import { useState } from 'react'

const DarkMode = () => {
  const [toggle, setToggle] = useState(true)
  const onChange = () => {
    setToggle((prevState) => !prevState)
  }

  return (
    <label className='label cursor-pointer p-5'>
      <span className='label-text'>Enable Dark Mode</span>
      <input
        type='checkbox'
        className='toggle'
        checked={toggle}
        onChange={onChange}
      />
    </label>
  )
}

export default DarkMode
