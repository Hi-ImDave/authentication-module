import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FiMoon, FiSun } from 'react-icons/fi'

import { setViewDark } from '../../features/preferences/preferenceSlice'

const DarkMode = () => {
  const { viewDark, fontSize, pureBlack } = useSelector(
    (state) => state.preference
  )
  const [darkMode, setDarkMode] = useState(viewDark)

  const dispatch = useDispatch()
  const onSubmit = (event) => {
    event.preventDefault()
    setDarkMode((prevState) => !prevState)

    const settings = {
      darkMode: !darkMode,
      pureBlack: pureBlack,
      fontSize: fontSize,
    }

    dispatch(setViewDark(settings))
  }

  return (
    <div onClick={onSubmit}>
      {viewDark ? (
        <div className='transition translate-y-4 -translate-x-6 ease-in duration-700 origin-bottom text-2xl'>
          <FiMoon />
        </div>
      ) : (
        <div className='transition rotate-90 -translate-y-4 ease-in duration-700 origin-bottom text-2xl'>
          <FiSun />
        </div>
      )}
    </div>
  )
}

export default DarkMode
