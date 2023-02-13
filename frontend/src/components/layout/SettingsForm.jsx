import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

import DarkMode from './DarkMode'
import FontSize from './FontSize'
import ThemeSetting from '../ThemeSetting'

const SettingsForm = () => {
  const { user } = useSelector((state) => state.auth)
  const theme = ThemeSetting()

  const [toggle, setToggle] = useState(user.settings.darkMode)

  const [checkbox, setCheckbox] = useState(user.settings.pureBlack)

  const [range, setRange] = useState(user.settings.fontSize)

  const [changeDetails, setChangeDetails] = useState(false)

  const onToggle = () => {
    setToggle((prevState) => !prevState)
    !toggle && setCheckbox(false)
  }

  const onCheckbox = () => {
    setCheckbox((prevState) => !prevState)
  }

  const onSlide = (event) => {
    setRange(event.target.value)
  }

  const onEditClick = (event) => {
    changeDetails && onSubmit(event)
    setChangeDetails((prevState) => !prevState)
  }

  const onCancel = () => {
    //
    setChangeDetails((prevState) => !prevState)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (
      toggle !== user.settings.darkMode ||
      range !== user.settings.fontSize ||
      checkbox !== user.settings.pureBlack
    ) {
      return console.log('changes made')
    }
    console.log('everything is the same')
  }

  return (
    <div
      className={`form-control flex card w-1/6 transition-colors duration-1000 ease-in-out ${theme.cardBG} shadow-xl  space-y-5`}
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
