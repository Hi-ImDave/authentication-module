import UserDetails from '../components/user/UserDetails'
import PasswordCard from '../components/user/PasswordCard'
import SettingsForm from '../components/layout/SettingsForm'
import ThemeSetting from '../components/ThemeSetting'

const Profile = () => {
  const theme = ThemeSetting()

  return (
    <>
      <div
        className={`min-h-screen ${theme.transition} ${theme.pageBG} bg-opacity-80 p-8 space-y-5`}
      >
        <UserDetails />
        <PasswordCard />
        <SettingsForm />
      </div>
    </>
  )
}

export default Profile
