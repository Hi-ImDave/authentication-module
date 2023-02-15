import UserList from '../components/user/UserList'
import InviteForm from '../components/layout/InviteForm'
import PendingList from '../components/user/PendingList'

import ThemeSetting from '../components/ThemeSetting'

const Admin = () => {
  const theme = ThemeSetting()

  const path = window.location.pathname
  console.log(path)

  return (
    <div
      className={`transition-colors duration-1000 ease-in-out ${theme.pageBG} bg-opacity-80`}
    >
      <div className='flex justify-around'>
        <div className='w-2/5'>
          <InviteForm />
          <PendingList />
        </div>
        <div className='divider divider-horizontal shadow-xl before:bg-black after:bg-black'></div>

        <UserList />
      </div>
    </div>
  )
}

export default Admin
