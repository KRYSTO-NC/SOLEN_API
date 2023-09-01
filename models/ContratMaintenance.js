const mongoose = require('mongoose')

const ContratMaintenanceSchema = new mongoose.Schema(
  {
    installation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Installation',
      required: true,
    },

    dateDebut: {
      type: Date,
      required: true,
    },
    dateFin: {
      type: Date,
      required: true,
    },
    optionsMaintenance: [
      {
        option: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'OptionMaintenance',
        },
        recurence: {
          type: String,
          enum: ['Hebdomadaire', 'Mensuelle', 'Trimestrielle', 'Annuelle'],
          required: true,
        },
      },
    ],
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('ContratMaintenance', ContratMaintenanceSchema)
