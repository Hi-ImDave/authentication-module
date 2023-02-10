import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import Button from './Button'

const Card = ({ title, description, navigate, className, children }) => {
  const { viewDark } = useSelector((state) => state.preference)

  return (
    <div
      className={`card transition-colors duration-1000 ease-in-out ${
        viewDark ? 'bg-darkModeCard' : 'bg-lightModeCard'
      } shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:scale-105 ${className}`}
    >
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{title}</h2>
        <p>{description}</p>
        {children}
        <div className='card-actions'>
          <Link to={navigate}>
            <Button title='View' color='glass' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
