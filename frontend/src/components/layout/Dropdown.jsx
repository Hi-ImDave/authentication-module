import { Link } from 'react-router-dom'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useSelector } from 'react-redux'

const Dropdown = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='dropdown dropdown-hover '>
      <label tabIndex={0} className='btn btn-ghost btn-circle m-1'>
        <HiMenuAlt2 className='h-5 w-5' />
      </label>

      <ul
        tabIndex={0}
        className='menu dropdown-content  p-2 shadow bg-slate-800 rounded-box w-52'
      >
        <li>
          <Link to='/dashboard'>My Dashboard</Link>
        </li>

        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        {user.isAdmin && (
          <li>
            <Link to='/admin'>Admin Panel</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Dropdown
