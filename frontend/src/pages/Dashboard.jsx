import { useSelector } from 'react-redux'

import Card from '../components/layout/Card'

const Dashboard = () => {
  const { viewMode } = useSelector((state) => state.preference)

  return (
    <div
      className={`hero min-h-screen ${
        viewMode ? 'bg-lightModeBG' : 'bg-darkModeBG'
      } bg-opacity-80 `}
    >
      <div className='flex justify-center content-center my-7'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  lg:gap-6 gap-4 '>
          <Card
            title='News Module'
            description='Community news and updates can go here'
            navigate='/news'
            className='lg:col-span-3 col-span-2 lg:row-span-4 row-span-3 stretch '
          />
          <Card
            title='Chat Module'
            description='Community chat rooms'
            navigate='/chat'
          />
          <Card title='Placeholder' description='lorem ipsum' navigate='' />
          <Card
            title='Profile Module'
            description='Go to your profile page'
            navigate='/profile'
          />
          <Card title='Placeholder' description='lorem ipsum' navigate='' />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
