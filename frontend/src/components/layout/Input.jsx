import React from 'react'

const Input = ({
  type,
  placeholder,
  className,
  disabled,
  id,
  value,
  name,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input w-full max-w-xs ${className}`}
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

export default Input
