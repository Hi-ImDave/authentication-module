import { useSelector } from 'react-redux'

import UserList from '../components/user/UserList'
import InviteForm from '../components/layout/InviteForm'
import PendingList from '../components/user/PendingList'

const Admin = () => {
  const { viewMode } = useSelector((state) => state.preference)

  return (
    <div
      className={`${
        viewMode ? 'bg-lightModeBG' : 'bg-darkModeBG'
      } bg-opacity-80`}
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
