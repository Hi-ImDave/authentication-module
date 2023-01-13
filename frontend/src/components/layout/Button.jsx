import React from 'react'

const Button = ({ title, btnType, className, onClick }) => {
  return (
    <button
      className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg  ${className} `}
      type={btnType}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
