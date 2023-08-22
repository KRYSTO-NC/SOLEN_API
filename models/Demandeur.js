const mongoose = require("mongoose");

const DemandeurSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Professionnel", "Particulier"],
      default: "user",
    },
 

    raisonSocial: {
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

module.exports = mongoose.model("Demandeur", DemandeurSchema);
