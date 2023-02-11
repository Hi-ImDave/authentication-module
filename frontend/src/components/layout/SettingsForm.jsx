import { useState } from 'react'
import { useSelector } from 'react-redux'
import DarkMode from './DarkMode'
import FontSize from './FontSize'

const SettingsForm = () => {
  const { user } = useSelector((state) => state.auth)
  const { viewDark } = useSelector((state) => state.preference)

  const [toggle, setToggle] = useState(user.settings.darkMode)

  const [range, setRange] = useState(user.settings.fontSize)

  const onToggle = () => {
    setToggle((prevState) => !prevState)
  }

  const onSlide = (event) => {
    setRange(event.target.value)
  }

  const onSubmit = (event) => {
    console.log(DarkMode)
  }

  return (
    <div
      className={`form-control flex  card w-1/6 transition-colors duration-1000 ease-in-out ${
        viewDark ? 'bg-darkModeCard' : 'bg-lightModeCard'
      } shadow-xl  space-y-5`}
    >
      <DarkMode toggle={toggle} onToggleProp={onToggle} />

      <FontSize max={100} range={range} onSlideProp={onSlide} />

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
