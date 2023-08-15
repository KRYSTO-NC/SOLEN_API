const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {

  
    firstname: {
      type: String,
      required: [true, "merci d'entrer un prénom"],
    },

    lastname: {
      type: String,
      required: [true, "Merci d'entrer un nom de famille"],
    },

    email: {
      type: String,
      required: [true, "Merci d'entrer un email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    
    phone: {
      type: String,
      required: [true, "Merci d'entrer un numéro de télèphone"],
      unique: true
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'installateur', "Chargé d'affaires", 'Commercial'],
      default: 'user',
    },

    password: {
      type: String,
      required: [true, "Merci d'entrer un mot de passe"],
      minlength: 6,
      select: false,
    },
    
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
    },


    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('User', UserSchema)
