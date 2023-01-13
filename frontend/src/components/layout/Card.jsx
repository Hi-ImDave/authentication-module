import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from './Button'

const Card = ({ title, description, navigate, className }) => {
  return (
    <div className={`card  bg-cyan-900 shadow-xl hover:scale-105 ${className}`}>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{title}</h2>
        <p>{description}</p>
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
