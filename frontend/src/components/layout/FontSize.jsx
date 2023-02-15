const FontSize = ({ max, range, onSlideProp }) => {
  return (
    <>
      <input
        type='range'
        min='0'
        max={max}
        value={range}
        className='range '
        step='20'
        onChange={onSlideProp}
      />

      <div className='flex w-full justify-between items-center'>
        <div>
          <span className='text-base'>a</span>
        </div>
        <div>
          <span className='text-lg'>a</span>
        </div>
        <div>
          <span className='text-xl'>a</span>
        </div>
        <div>
          <span className='text-2xl'>a</span>
        </div>
        <div>
          <span className='text-3xl'>a</span>
        </div>
        <div>
          <span className='text-4xl'>a</span>
        </div>
      </div>
    </>
  )
}

export default FontSize
