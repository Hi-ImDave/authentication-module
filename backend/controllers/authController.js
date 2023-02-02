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

  const inviteExists = await Invite.findOne({ email })
  const userExists = await User.findOne({ email })

  if (inviteExists || userExists) {
    res.status(400)
    throw new Error('This user already has an invite pending')
  }

  let token = crypto.randomBytes(32).toString('hex')
  const salt = await bcrypt.genSalt(10)
  const hashedToken = await bcrypt.hash(token, salt)

  const newInvite = await Invite.create({
    email,
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

  // Find if user already exists
  const userExists = await User.findOne({ email })

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

  if (email !== inviteExists.email) {
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
    email,
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
  const user = await User.findOne({ email })

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

  // Update user
  const user = await User.findOneAndUpdate(
    {
      prevEmail,
    },
    { firstName, lastName, email }
  )

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      isActive: emailUpdated ? false : user.isActive,
      isAdmin: user.isAdmin,
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
    })
  }
})

// @desc    Reset password
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
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
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

// @desc    Delete an invite
// @route   GET /api/auth/deleteInvite
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

module.exports = {
  inviteUser,
  registerUser,
  loginUser,
  updateUser,
  verify,
  uploadImage,
  resetPassword,
  getUsers,
  getPending,
  deleteInvite,
}
