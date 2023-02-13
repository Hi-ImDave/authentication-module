const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add last name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    profileImg: {
      data: Buffer,
      contentType: String,
    },
    password: {
      type: String,
      required: [true, 'Please choose a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    isMuted: {
      type: Boolean,
      required: true,
      default: false,
    },
    settings: {
      darkMode: {
        type: Boolean,
        required: true,
        default: false,
      },
      pureBlack: {
        type: Boolean,
        required: true,
        default: false,
      },
      fontSize: {
        type: String,
        required: true,
        default: '0',
        enum: ['0', '25', '50', '75', '100'],
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
