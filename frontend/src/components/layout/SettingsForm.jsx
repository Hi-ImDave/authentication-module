import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { updateSettings } from '../../features/auth/authSlice'
import { setViewDark } from '../../features/preferences/preferenceSlice'

import DarkMode from './DarkMode'
import FontSize from './FontSize'
import ThemeSetting from '../ThemeSetting'

const SettingsForm = () => {
  const { user } = useSelector((state) => state.auth)
  const theme = ThemeSetting()
  const dispatch = useDispatch()

  const [toggle, setToggle] = useState(user.settings.darkMode)

  const [checkbox, setCheckbox] = useState(user.settings.pureBlack)

  const [range, setRange] = useState(user.settings.fontSize)

  const onToggle = async () => {
    await setToggle((prevState) => !prevState)
    toggle && setCheckbox(false)
  }

  const onCheckbox = () => {
    setCheckbox((prevState) => !prevState)
  }

  const onSlide = (event) => {
    setRange(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const settings = {
      _id: user._id,
      darkMode: toggle,
      pureBlack: checkbox,
      fontSize: range,
    }

    await dispatch(updateSettings(settings))
    await dispatch(setViewDark(settings))

    toast.success('settings updated')
  }

  return (
    <div
      className={`p-5 form-control flex card w-1/6 ${theme.transition} ${theme.cardBG} shadow-xl  space-y-5`}
    >
      <DarkMode
        toggle={toggle}
        onToggleProp={onToggle}
        checkbox={checkbox}
        onCheckbox={onCheckbox}
      />

      <div className='divider shadow-xl before:bg-black after:bg-black'></div>

      <FontSize max={100} range={range} onSlideProp={onSlide} />

      <div className='divider shadow-xl before:bg-black after:bg-black'></div>

      <div className='self-center '>
        <button
          onClick={onSubmit}
          className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg my-5'
        >
          Apply changes
        </button>
      </div>
    </div>
  )
}

export default SettingsForm
