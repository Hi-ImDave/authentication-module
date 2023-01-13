const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUser,
  uploadImage,
  verify,
  resetPassword,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.put('/updateUser', updateUser)

router.post('/me', uploadImage)

router.put('/verify', verify)

router.put('/reset', resetPassword)

module.exports = router
