const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    origine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Origine',
    },
    title: {
      type: String,
      enum: ['Mr', 'Mme', 'Mlle'],
      default: 'Monsieur',
    },

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
        "Merci d'entrer un email valide",
      ],
    },

    phone: {
      type: String,
      required: [true, "Merci d'entrer un numéro de télèphone"],
    },

    phone2: {
      type: String,
    },

    function: {
      type: String,
    },

    adresse: {
      type: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Contact', ContactSchema)
