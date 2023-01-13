const Avatar = ({ profilePicture }) => {
  return (
    <div className='avatar'>
      <div className='w-24 rounded-full'>
        <img src={profilePicture} />
      </div>
    </div>
  )
}

export default Avatar
