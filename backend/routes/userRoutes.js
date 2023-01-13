const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUser,
  uploadImage,
  verify,
  resetRequest,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.put('/updateUser', updateUser)

router.post('/me', uploadImage)

router.put('/verify', verify)

module.exports = router
