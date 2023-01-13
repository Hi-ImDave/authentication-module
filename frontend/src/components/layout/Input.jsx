import React from 'react'

const Input = ({ type, placeholder, className, disabled, id, value }) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      className={`input w-full max-w-xs ${className}`}
      disabled={disabled}
    />
  )
}

export default Input
