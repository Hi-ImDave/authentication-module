const express = require('express')
const router = express.Router()

const {
  inviteUser,
  registerUser,
  loginUser,
  updateUser,
  updateSettings,
  uploadImage,
  verify,
  resetPassword,
  changePassword,
  getUsers,
  getPending,
  deleteUser,
  deleteInvite,
  muteUser,
} = require('../controllers/authController')

const { protect } = require('../middleware/authMiddleware')

router.post('/invite', inviteUser)

router.post('/', registerUser)

router.post('/login', loginUser)

router.put('/updateUser', updateUser)

router.put('/updateSettings', updateSettings)

router.post('/me', uploadImage)

router.put('/verify', verify)

router.put('/reset', resetPassword)

router.put('/changePass', changePassword)

router.get('/getAll', getUsers)

router.get('/pending', getPending)

router.delete('/deleteUser/:id', deleteUser)

router.delete('/deleteInvite/:id', deleteInvite)

router.put('/muteUser', muteUser)

module.exports = router
