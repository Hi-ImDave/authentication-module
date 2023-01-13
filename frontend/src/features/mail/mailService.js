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

// Send password reset email
const sendReset = async (email) => {
  const response = await axios.post(API_URL + '/sendReset', email)
  return response.data
}

const mailService = {
  sendVerification,
  sendReset,
}

export default mailService
