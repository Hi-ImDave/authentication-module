// MODULES
import { useSelector } from 'react-redux'

// PAGES

// COMPONENTS

const Welcome = () => {
  const { viewDark } = useSelector((state) => state.preference)

  return (
    <div
      className={`hero min-h-screen transition-colors duration-1000 ease-in-out ${
        viewDark ? 'bg-darkModeBG' : 'bg-lightModeBG'
      } bg-opacity-80`}
    >
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Authentication Module</h1>
          <p className='mb-5'>
            Welcome. This is a modular application with full authentication
            features. The purpose of this application is to integrate it with
            web applications that require user authentication.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
