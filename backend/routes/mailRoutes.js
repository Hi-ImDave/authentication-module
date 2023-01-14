const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const {
  sendVerification,
  resetRequest,
  resetConfirm,
} = require('../controllers/mailController')

router.post('/sendVerification', sendVerification)
router.post('/resetRequest', resetRequest)
router.post('/resetConfirm', resetConfirm)

module.exports = router
