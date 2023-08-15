const mongoose = require("mongoose");

const origineSchema = new mongoose.Schema(
  {
    origineName: {
      type: String,
      required: [true, "Merci d'entrer un nom pour l'orgine"],
      unique: true
    },
  },

  
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Origine", origineSchema);
