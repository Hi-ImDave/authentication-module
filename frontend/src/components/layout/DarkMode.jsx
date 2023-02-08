import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FaRegMoon, FaRegSun } from 'react-icons/fa'

import { setViewMode } from '../../features/preferences/preferenceSlice'

const DarkMode = () => {
  const { user } = useSelector((state) => state.auth)
  console.log(user.settings.darkMode)
  const [darkMode, setDarkMode] = useState(user.settings.darkMode)
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
