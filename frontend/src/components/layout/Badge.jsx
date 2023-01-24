import React from 'react'

const Badge = ({ badgeColor, badgeSize, title }) => {
  return <div className={`badge ${badgeColor} ${badgeSize}`}>{title}</div>
}

export default Badge
