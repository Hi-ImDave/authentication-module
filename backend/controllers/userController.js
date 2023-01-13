const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc    Register a new user
// @route   /api/users
// @method  POST
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

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
// @route   /api/users/login
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
// @route   /api/users/updateUser
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body

  // Validation
  if (!firstName || !lastName || !email) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Update user
  const user = await User.findOneAndUpdate({
    firstName,
    lastName,
    email,
  })

  if (user) {
    res.status(201).json({
      firstName: firstName,
      lastName: lastName,
      email: email,
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
// @route   /api/users/me
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
// @route   /api/users/verify
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

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  verify,
  uploadImage,
}
