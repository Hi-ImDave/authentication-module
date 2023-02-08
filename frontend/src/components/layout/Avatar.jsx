const Avatar = ({ profilePicture, altDescription }) => {
  return (
    <div className='avatar'>
      <div className='w-24 rounded-full'>
        <img src={profilePicture} alt={altDescription} />
      </div>
    </div>
  )
}

export default Avatar
