import axios from 'axios'

const API_URL = '/api/users'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Update user
const update = async (userData) => {
  const response = await axios.put(API_URL + '/updateUser', userData)

  if (response.data) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        _id: userData._id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        token: userData.token,
        isActive: response.data.isActive,
      })
    )
  }

  return {
    _id: userData._id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    token: userData.token,
    isAdmin: userData.isAdmin,
    isActive: response.data.isActive,
  }
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Verify user email
const verify = async (userId) => {
  const response = await axios.put(API_URL + '/verify', userId)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Reset password
const resetPassword = async (user) => {
  const response = await axios.put(API_URL + '/reset', user)

  return response.data
}

const authService = {
  register,
  update,
  logout,
  login,
  verify,
  resetPassword,
}

export default authService
