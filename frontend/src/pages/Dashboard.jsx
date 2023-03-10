import Card from '../components/layout/Card'
import Carousel from '../components/layout/Carousel'
import ThemeSetting from '../components/ThemeSetting'

const Dashboard = () => {
  const theme = ThemeSetting()

  return (
    <div
      className={`hero min-h-screen ${theme.transition} ${theme.pageBG} bg-opacity-80 `}
    >
      <div className='flex justify-center content-center my-7'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  lg:gap-6 gap-4 '>
          <Card
            title='News Module'
            description='Community news and updates can go here'
            navigate='/news'
            className='lg:col-span-3 col-span-2 lg:row-span-4 row-span-3 stretch '
            children={<Carousel />}
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
