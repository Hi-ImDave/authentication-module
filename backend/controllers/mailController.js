const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

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

const sendReset = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  const token = generateToken(user._id, '1h')
  console.log('token', token)
  if (user) {
    const output = `
    <p>Please click the link to reset your password</p>
    <p>Link expires in 1 hour</p>
    <a href="http://localhost:3000/reset/${token}">Reset password here</a>
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

const generateToken = (id, exp) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: exp,
  })
}

module.exports = {
  sendVerification,
  sendReset,
}
