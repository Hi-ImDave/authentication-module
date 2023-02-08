import { useSelector } from 'react-redux'
import UserDetails from '../components/user/UserDetails'
import PasswordCard from '../components/user/PasswordCard'

const Profile = () => {
  const { viewMode } = useSelector((state) => state.preference)

  return (
    <>
      <div
        className={`min-h-screen ${
          viewMode ? 'bg-lightModeBG' : 'bg-darkModeBG'
        } bg-opacity-80 p-8 space-y-5`}
      >
        <UserDetails />
        <PasswordCard />
      </div>
    </>
  )
}

export default Profile
