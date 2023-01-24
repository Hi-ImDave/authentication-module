const mongoose = require('mongoose')

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
    expires: 3600,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Invite', inviteSchema)
