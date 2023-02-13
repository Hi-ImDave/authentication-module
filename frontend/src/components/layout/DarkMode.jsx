const DarkMode = ({ toggle, onToggleProp, checkbox, onCheckbox }) => {
  return (
    <label className='label cursor-pointer p-5'>
      <span className='label-text'>Enable Dark Mode</span>
      <input
        type='checkbox'
        className='toggle'
        checked={toggle}
        onChange={onToggleProp}
      />
      <div className='tooltip' data-tip='pure black dark mode'>
        <input
          type='checkbox'
          checked={!toggle ? false : checkbox}
          className='checkbox '
          onChange={onCheckbox}
          disabled={!toggle}
        />
      </div>
    </label>
  )
}

export default DarkMode
