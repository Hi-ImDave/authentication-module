import axios from 'axios'

const API_URL = '/api/mail'

// Send invite
const sendInvite = async (inviteData) => {
  const response = await axios.post(API_URL + '/sendInvite', inviteData)

  return response.data
}

// Send email verification
const sendVerification = async (userData) => {
  const response = await axios.post(API_URL + '/sendVerification', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Request password reset
const resetRequest = async (email) => {
  const response = await axios.post(API_URL + '/resetRequest', email)
  return response.data
}

// Confirm password reset
const resetConfirm = async (userId) => {
  const response = await axios.post(API_URL + '/resetConfirm', userId)
  return response.data
}

const mailService = {
  sendInvite,
  sendVerification,
  resetRequest,
  resetConfirm,
}

export default mailService
