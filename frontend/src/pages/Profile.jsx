import UserDetails from '../components/user/UserDetails'
import PasswordCard from '../components/user/PasswordCard'

const Profile = () => {
  return (
    <>
      <div className='min-h-screen bg-white bg-opacity-80 p-8 space-y-5'>
        <UserDetails />
        <PasswordCard />
      </div>
    </>
  )
}

export default Profile
