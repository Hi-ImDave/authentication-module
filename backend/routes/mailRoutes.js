const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const {
  sendInvite,
  sendVerification,
  resetRequest,
  resetConfirm,
} = require('../controllers/mailController')

router.post('/sendInvite', sendInvite)
router.post('/sendVerification', sendVerification)
router.post('/resetRequest', resetRequest)
router.post('/resetConfirm', resetConfirm)

module.exports = router
