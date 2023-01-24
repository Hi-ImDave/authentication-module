import UserList from '../components/user/UserList'

const Admin = () => {
  return (
    <div className='drawer drawer-mobile '>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content '>
        <UserList />
        <label
          htmlFor='my-drawer-2'
          className='btn btn-primary drawer-button lg:hidden'
        >
          Open drawer
        </label>
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
        <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
          <li>
            <span>Users</span>
          </li>
          <li>
            <span>Sidebar Item 2</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Admin
