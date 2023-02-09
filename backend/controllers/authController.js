const asyncHandler = require('express-async-handler')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const Invite = require('../models/inviteModel')

const sendVerification = require('./mailController')

// @desc    Invite a new user
// @route   /api/auth/invite
// @method  POST
// @access  Private
const inviteUser = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400)
    throw new Error('Please enter a valid email address')
  }

  const sanitizedEmail = email.toLowerCase()

  const inviteExists = await Invite.findOne({ email: sanitizedEmail })
  const userExists = await User.findOne({ email: sanitizedEmail })

  if (inviteExists) {
    res.status(400)
    throw new Error('This user already has an invite pending')
  }

  if (userExists) {
    res.status(400)
    throw new Error('This user already has an account')
  }

  let token = crypto.randomBytes(32).toString('hex')
  const salt = await bcrypt.genSalt(10)
  const hashedToken = await bcrypt.hash(token, salt)

  const newInvite = await Invite.create({
    email: sanitizedEmail,
    token: hashedToken,
    createdAt: Date.now(),
    isUsed: false,
  })

  if (newInvite) {
    res.status(201).json(newInvite)
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// @desc    Register a new user
// @route   /api/auth
// @method  POST
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const { id, firstName, lastName, email, password } = req.body

  // Validation
  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const sanitizedEmail = email.toLowerCase()
  // Find if user already exists
  const userExists = await User.findOne({ email: sanitizedEmail })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Find if invite exists
  const inviteExists = await Invite.findById({ _id: id })

  const inviteID = inviteExists._id.toHexString()

  if (!inviteExists || inviteID !== id) {
    res.status(400)
    throw new Error(
      'There is no valid invite for this user. Please contact an administrator'
    )
  }

  if (sanitizedEmail !== inviteExists.email.toLowerCase()) {
    res.status(400)
    throw new Error(
      'Please use the same email address you were invited to register with'
    )
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email: sanitizedEmail,
    password: hashedPassword,
  })

  if (user) {
    await Invite.findByIdAndDelete({ _id: id })
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id, '365d'),
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      settings: user.settings,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Login a user
// @route   /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const sanitizedEmail = email.toLowerCase()

  const user = await User.findOne({ email: sanitizedEmail })

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id, '365d'),
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      isMuted: user.isMuted,
      settings: user.settings,
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Update user
// @route   /api/auth/updateUser
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email, prevEmail } = req.body

  const emailUpdated = email !== prevEmail

  // Validation
  if (!firstName || !lastName || !email) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const sanitizedEmail = email.toLowerCase()

  // Update user
  const updatedUser = await User.findOneAndUpdate(
    {
      prevEmail,
    },
    { firstName, lastName, email: sanitizedEmail }
  )

  if (updatedUser) {
    res.status(201).json({
      _id: updatedUser._id,
      firstName: firstName,
      lastName: lastName,
      email: sanitizedEmail,
      isActive: emailUpdated ? false : updatedUser.isActive,
      isAdmin: updatedUser.isAdmin,
      isMuted: updatedUser.isMuted,
      settings: updatedUser.settings,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// Generate token
const generateToken = (id, exp) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: exp,
  })
}

// @desc    Upload user image
// @route   /api/auth/me
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  upload.single('image')
  const obj = {
    img: {
      data: fs.readFileSync(
        path.join(__dirname + '/uploads/' + req.file.filename)
      ),
      contentType: 'image/png',
    },
  }
  const user = req.user._id
  User.findOneAndUpdate(user, obj)
})

// @desc    Verify user email
// @route   /api/auth/verify
// @access  Private
const verify = asyncHandler(async (req, res) => {
  const { verificationId } = req.body
  const user = await User.findOneAndUpdate(
    {
      _id: verificationId,
    },
    { isActive: true }
  )
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      isMuted: user.isMuted,
    })
  }
})

// @desc    Reset password from 'forgot password'
// @route   /api/auth/reset
// @method  PUT
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { _id, password, token } = req.body
  const user = await Token.findOne({ userId: _id })
  if (!user) {
    res.status(400)
    throw new Error('Invalid or expired token')
  }
  const isValid = await bcrypt.compare(token, user.token)
  if (!isValid) {
    res.status(400)
    throw new Error('Invalid or expired token')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Update user
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { password: hashedPassword }
  )
  if (updatedUser) {
    await Token.deleteOne({ userId: _id })
    res.status(201).json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
      isAdmin: updatedUser.isAdmin,
      isMuted: updatedUser.isMuted,
      settings: updatedUser.settings,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    change password from profile
// @route   /api/auth/changePass
// @method  PUT
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { _id, password, passwordConfirm } = req.body
  console.log(_id)
  const user = await User.findById(_id)
  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }
  const passwordsMatch = password === passwordConfirm
  if (!passwordsMatch) {
    res.status(400)
    throw new Error('Please make sure both passwords match')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Update user
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { password: hashedPassword }
  )
  if (updatedUser) {
    res.status(201).json(updatedUser)
  } else {
    res.status(400)
    throw new Error(
      'An error occured while trying to update your password. Please try again'
    )
  }
})

// @desc    Get all users
// @route   GET /api/auth/getAll
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  res.status(201).json(users)
})

// @desc    Get all pending invites
// @route   GET /api/auth/pending
// @access  Private
const getPending = asyncHandler(async (req, res) => {
  const pendingInvites = await Invite.find()
  res.status(201).json(pendingInvites)
})

// @desc    Delete a user
// @route   GET /api/auth/deleteUser/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(404)
    throw new Error('Cannot find user with that email address')
  }

  const userToDelete = await User.findOne({ _id: id })
  if (!userToDelete) {
    res.status(404)
    throw new Error('User not found')
  }

  const { _id } = userToDelete
  await User.findByIdAndDelete({ _id })

  res.status(200).json({ success: true })
})

// @desc    Delete an invite
// @route   GET /api/auth/deleteInvite/:id
// @access  Private
const deleteInvite = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(404)
    throw new Error('Cannot find invite with that email address')
  }

  const inviteToDelete = await Invite.findOne({ id })

  if (!inviteToDelete) {
    res.status(404)
    throw new Error('Invite not found')
  }

  const { _id } = inviteToDelete
  await Invite.findByIdAndDelete({ _id })

  res.status(200).json({ success: true })
})

const muteUser = asyncHandler(async (req, res) => {
  const { userID } = req.body
  const user = await User.findOne({
    _id: userID,
  })

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  const { _id, isMuted } = user
  const response = await User.updateOne({ _id }, { isMuted: !isMuted })
  res.status(200).json({ success: true })
})

module.exports = {
  inviteUser,
  registerUser,
  loginUser,
  updateUser,
  verify,
  uploadImage,
  resetPassword,
  changePassword,
  getUsers,
  getPending,
  deleteUser,
  deleteInvite,
  muteUser,
}
