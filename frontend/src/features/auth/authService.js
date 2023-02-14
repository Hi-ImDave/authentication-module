import axios from 'axios'

const API_URL = '/api/auth'

// Invite user
const inviteUser = async (data) => {
  const response = await axios.post(API_URL + '/invite', data)

  if (response.data) {
    return response.data
  }
}

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

// Login with google

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
        isAdmin: response.data.isAdmin,
        isMuted: response.data.isMuted,
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

// update settings
const updateSettings = async (settings) => {
  const response = await axios.put(API_URL + '/updateSettings', settings)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Verify user email
const verify = async (userId) => {
  const response = await axios.put(API_URL + '/verify', userId)
  if (response.data) {
    localStorage.removeItem('user')
  }
}

// Reset password
const resetPassword = async (user) => {
  const response = await axios.put(API_URL + '/reset', user)

  return response.data
}

// change password
const changePassword = async (user) => {
  const response = await axios.put(API_URL + '/changePass', user)

  return response.data
}

// Get all users
const getUsers = async () => {
  const response = await axios.get(API_URL + '/getAll')

  return response.data
}

// Get pending invites
const getPending = async () => {
  const response = await axios.get(API_URL + '/pending')

  return response.data
}

// Delete user
const deleteUser = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + '/deleteUser/' + userID, config)

  return response.data
}

// Delete pending invite
const deleteInvite = async (inviteID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(
    API_URL + '/deleteInvite/' + inviteID,
    config
  )

  return response.data
}

// mute/unmute user
const muteUser = async (userID) => {
  const response = await axios.put(API_URL + '/muteUser', { userID: userID })

  return response.data
}

const authService = {
  inviteUser,
  register,
  update,
  updateSettings,
  logout,
  login,
  verify,
  resetPassword,
  changePassword,
  getUsers,
  getPending,
  deleteUser,
  deleteInvite,
  muteUser,
}

export default authService
