import UserList from '../components/user/UserList'
import InviteForm from '../components/layout/InviteForm'

import { FaUsers, FaUserPlus } from 'react-icons/fa'

const Admin = () => {
  return (
    <div className='drawer drawer-mobile bg-white bg-opacity-80'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex'>
        <InviteForm />

        <UserList />
      </div>
    </div>
  )
}

export default Admin
