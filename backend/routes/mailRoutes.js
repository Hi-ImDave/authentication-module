const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const {
  sendVerification,
  resetRequest,
} = require('../controllers/mailController')

router.post('/sendVerification', sendVerification)
router.post('/resetRequest', resetRequest)

module.exports = router
