const mongoose = require("mongoose");


const CommuneSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "merci d'entrer un nom"],
    },

    codePostal: {
      type: String,
      required: [true, "merci d'entrer un code postal"],
    },

  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Commune", CommuneSchema);
