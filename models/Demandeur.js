const mongoose = require("mongoose");

const DemandeurSchema = new mongoose.Schema(
  {

    origine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Origine',
    },
    type: {
      type: String,
      enum: ["Professionnel", "Particulier"],
    },
 

    compagny: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compagny',
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

module.exports = mongoose.model("Demandeur", DemandeurSchema);
