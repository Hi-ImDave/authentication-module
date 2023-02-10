import { useSelector } from 'react-redux'
import DarkMode from './DarkMode'
import FontSize from './FontSize'

const SettingsForm = () => {
  const { viewDark } = useSelector((state) => state.preference)

  return (
    <div
      className={`form-control card w-1/6 transition-colors duration-1000 ease-in-out ${
        viewDark ? 'bg-darkModeCard' : 'bg-lightModeCard'
      } shadow-xl  space-y-5`}
    >
      <DarkMode />

      <FontSize />
    </div>
  )
}

export default SettingsForm
