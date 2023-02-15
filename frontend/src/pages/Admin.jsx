import UserList from '../components/user/UserList'
import InviteForm from '../components/layout/InviteForm'
import PendingList from '../components/user/PendingList'

import ThemeSetting from '../components/ThemeSetting'

const Admin = () => {
  const theme = ThemeSetting()

  const path = window.location.pathname

  return (
    <div className={`${theme.transition} ${theme.pageBG} bg-opacity-80`}>
      <div className='flex flex-col lg:flex-row justify-around'>
        <div className='w-full lg:w-2/5'>
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
