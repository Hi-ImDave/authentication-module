import axios from 'axios'

const API_URL = '/api/mail'

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

const mailService = {
  sendVerification,
  resetRequest,
}

export default mailService
