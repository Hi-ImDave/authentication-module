const FontSize = ({ max, range, onSlideProp }) => {
  return (
    <>
      <input
        type='range'
        min='0'
        max={max}
        value={range}
        className='range '
        step='25'
        onChange={onSlideProp}
      />

      <div className='w-full space-x-20 text-center  '>
        <span className='text-lg align-text-middle'>a</span>
        <span className='text-xl align-text-middle'>a</span>
        <span className='text-2xl align-text-middle'>a</span>
        <span className='text-3xl align-text-middle'>a</span>
        <span className='text-4xl align-text-middle'>a</span>
      </div>
    </>
  )
}

export default FontSize
