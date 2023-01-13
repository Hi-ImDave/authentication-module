const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const { sendVerification, sendReset } = require('../controllers/mailController')

router.post('/sendReset', sendReset)
router.post('/sendVerification', sendVerification)

module.exports = router
