const express = require('express')
const router = express.Router()

const {
  inviteUser,
  registerUser,
  loginUser,
  updateUser,
  uploadImage,
  verify,
  resetPassword,
  getUsers,
} = require('../controllers/authController')

const { protect } = require('../middleware/authMiddleware')

router.post('/invite', inviteUser)

router.post('/', registerUser)

router.post('/login', loginUser)

router.put('/updateUser', updateUser)

router.post('/me', uploadImage)

router.put('/verify', verify)

router.put('/reset', resetPassword)

router.get('/getAll', getUsers)

module.exports = router
