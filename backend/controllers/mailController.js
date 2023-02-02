const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const User = require('../models/userModel')
const Token = require('../models/tokenModel')

// @desc    Send registration invite link
// @route   /api/mail/sendInvite
// @access  Private
const sendInvite = asyncHandler(async (req, res) => {
  const { _id, email } = req.body
  const output = `
    <p>You've been invited to register an account with the authentication module. Please click the link below to register your account</p>
    <a href="http://localhost:3000/register/${_id}">Registration here</a>
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
    subject: "You've been invited to register!",
    text: '',
    html: output,
  })

  console.log('Message sent: %s', info.messageId)
})

// @desc    Send email verification link
// @route   /api/mail/sendVerification
// @access  Private
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
    subject: "Don't forget to verify your account!",
    text: '',
    html: output,
  })

  console.log('Message sent: %s', info.messageId)
})

// @desc    Send Request password reset
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
  } else {
    res.status(404)
    throw new Error('No user with that email address')
  }
})

// @desc    Send passsword reset confirmation
// @route   /api/mail/resetConfirm
// @access  Private
const resetConfirm = asyncHandler(async (req, res) => {
  const { userId } = req.body

  const user = await User.findOne({ _id: userId })

  if (user) {
    const output = `
    <p>You recently requested to reset your password.</p>
    <p>This email is to confirm that your password has successfully been updated</p>
    <a href="http://localhost:3000/login">Please login here</a>
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
      to: user.email,
      subject: 'Password reset success!',
      text: '',
      html: output,
    })

    res.status(201).json({
      email: user.email,
    })

    console.log('Message sent: %s', info.messageId)
  } else {
    res.status(404)
    throw new Error('No user with that email address')
  }
})

module.exports = {
  sendInvite,
  sendVerification,
  resetRequest,
  resetConfirm,
}
