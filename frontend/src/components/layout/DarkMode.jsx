import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FaRegMoon, FaRegSun } from 'react-icons/fa'

import { setViewMode } from '../../features/preferences/preferenceSlice'

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(true)
  const { viewMode } = useSelector((state) => state.preference)

  const dispatch = useDispatch()

  const onClick = () => {
    setDarkMode((prevState) => !prevState)
    dispatch(setViewMode(darkMode))
  }

  return (
    <div onClick={onClick}>
      {darkMode ? (
        <div>
          <FaRegMoon />
        </div>
      ) : (
        <div>
          <FaRegSun />
        </div>
      )}
    </div>
  )
}

export default DarkMode
