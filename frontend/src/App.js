// MODULES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'swiper/css/bundle'
import 'react-toastify/dist/ReactToastify.css'

// PAGES
import PrivateRoute from './components/PrivateRoute'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Verify from './pages/Verify'

import Navbar from './components/layout/Navbar'
import ForgotPass from './pages/ForgotPass'
import ResetPass from './pages/ResetPass'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/verify/:verificationId' element={<Verify />} />
          <Route path='/forgot-password' element={<ForgotPass />} />
          <Route path='/reset/:resetId' element={<ResetPass />} />
        </Routes>

        {/* <Footer /> */}
      </Router>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  )
}

export default App
