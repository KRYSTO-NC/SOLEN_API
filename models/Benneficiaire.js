const mongoose = require("mongoose");

const BenneficiaireSchema = new mongoose.Schema(
  {
    nom: {
      type: String
    },

    prenom: {
      type: String
    },

    numClientEnercal: {
      type: String,
    },


    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
      },
  
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Benneficiaire", BenneficiaireSchema);
