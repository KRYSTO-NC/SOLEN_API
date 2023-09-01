const mongoose = require('mongoose')

const InterventionSchema = new mongoose.Schema(
  {
  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    technicien: {
      type: String,
    },

    type: {
      type: String,
      enum: ['SAV', 'Garantie'],
    },

    status: {
      type: String,
      enum: ['Demande', 'Terminer'],
    },

    dateDemande: {
      type: Date,
    },

    facturation: {
      type: Boolean,
    },

    garantie: {
      type: Boolean,
    },

    dateIntervention: {
      type: Date,
    },
    remarqueDemande: {
      type: String,
    },
    remarqueIntervention: {
      type: String,
    },
    installation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Installation',
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Intervention', InterventionSchema)
