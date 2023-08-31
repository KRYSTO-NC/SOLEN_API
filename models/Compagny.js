const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')
const CompagnySchema = new mongoose.Schema(
  {
    ridet: {
      type: String,
    },
    nomCommercial: {
      type: String,
    },

    raisonSocial: {
      type: String,
    },

    type: {
      type: String,
      enum: [
        'EI',
        'SA',
        'SARL',
        'SAS',
        'SNC',
        'Association',
        'Administration',
        'SCI',
        'SCP',
        'GIE',
        'GIP',
      ],
    },

    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
      },
    ],

    address: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Compagny', CompagnySchema)
