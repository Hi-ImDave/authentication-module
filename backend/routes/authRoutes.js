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
  getPending,
  deleteUser,
  deleteInvite,
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

router.get('/pending', getPending)

router.delete('/deleteUser/:id', deleteUser)

router.delete('/deleteInvite/:id', deleteInvite)

module.exports = router
