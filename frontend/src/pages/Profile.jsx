import { useSelector } from 'react-redux'
import UserDetails from '../components/user/UserDetails'
import PasswordCard from '../components/user/PasswordCard'
import SettingsForm from '../components/layout/SettingsForm'

const Profile = () => {
  const { viewDark } = useSelector((state) => state.preference)

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-1000 ease-in-out ${
          viewDark ? 'bg-darkModeBG' : 'bg-lightModeBG'
        } bg-opacity-80 p-8 space-y-5`}
      >
        <UserDetails />
        <PasswordCard />
        <SettingsForm />
      </div>
    </>
  )
}

export default Profile
