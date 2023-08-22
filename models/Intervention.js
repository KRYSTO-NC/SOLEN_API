const mongoose = require("mongoose");

const InterventionSchema = new mongoose.Schema(
  {

    typeInstallation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Installation",
      },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    technicien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    type: {
        type: String,
        enum: ["SAV", "Garantie"]
      },
    type: {
        type: String,
        enum: ["Demande", "EnAttente", "EnCour", "Terminer"]
      },

      dateDemande: {
        type: Date,
      },
      facturation: {
        type : Boolean
      },

      datePrevisionelIntervention: {
        type: Date,
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

  },

  
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Intervention", InterventionSchema);
