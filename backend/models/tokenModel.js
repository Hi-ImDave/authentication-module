const mongoose = require('mongoose')

// Used for resetting user password securely
const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
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
})

module.exports = mongoose.model('Token', tokenSchema)
