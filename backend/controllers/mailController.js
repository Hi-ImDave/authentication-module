const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const User = require('../models/userModel')
const Token = require('../models/tokenModel')

const sendVerification = asyncHandler(async (req, res) => {
  const { _id, email } = req.body
  const output = `
    <p>Please click the link to verify your email</p>
    <a href="http://localhost:3000/verify/${_id}">verification link here</a>
  `

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"David Mott" <373cf75d435404>',
    to: email,
    subject: 'Hello ✔',
    text: '',
    html: output,
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

// Request password reset
// @desc    Request password reset
// @route   /api/mail/resetRequest
// @access  Private
const resetRequest = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('User does not exist')
  }
  let token = await Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }
  let resetToken = crypto.randomBytes(32).toString('hex')
  const salt = await bcrypt.genSalt(10)
  const hashedToken = await bcrypt.hash(resetToken, salt)

  const userToken = await Token.create({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
  })

  if (userToken) {
    const output = `
    <p>Please click the link to reset your password</p>
    <p>Link expires in 1 hour</p>
    <a href="http://localhost:3000/reset/${resetToken}/${user._id}">Reset password here</a>
  `

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"David Mott" <373cf75d435404>',
      to: email,
      subject: 'Reset Password',
      text: '',
      html: output,
    })

    res.status(201).json({
      email,
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } else {
    res.status(404)
    throw new Error('No user with that email address')
  }
})

module.exports = {
  sendVerification,
  resetRequest,
}
