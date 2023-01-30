const mongoose = require('mongoose')

// Used to generate invite token to allow new user to register account
const inviteSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Invite', inviteSchema)
