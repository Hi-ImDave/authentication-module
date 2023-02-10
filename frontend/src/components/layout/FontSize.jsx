import { useState } from 'react'

const FontSize = () => {
  const [range, setRange] = useState(25)
  const max = 100

  const onChange = (event) => {
    setRange(event.target.value)
  }

  return (
    <>
      <input
        type='range'
        min='0'
        max={max}
        value={range}
        className='range'
        step='25'
        onChange={onChange}
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
