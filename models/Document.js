const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const DocumentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    designation: {
      type: String,
      required: [true, "Merci d'entrer un titre pour ce document"],
    },

    document: {
      type: String,
      default: 'no-photo.png',
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Document', DocumentSchema)