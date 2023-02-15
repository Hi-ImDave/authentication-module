import { Link } from 'react-router-dom'

import Button from './Button'
import ThemeSetting from '../ThemeSetting'

const Card = ({ title, description, navigate, className, children }) => {
  const theme = ThemeSetting()

  return (
    <div
      className={`card ${theme.transition} ${theme.cardBG} shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:scale-105 ${className}`}
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
