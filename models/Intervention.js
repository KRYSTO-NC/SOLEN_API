const mongoose = require("mongoose");

const InterventionSchema = new mongoose.Schema(
  {
    joursDeRetard: {
      type: Number,
      default: 0 // Valeur par défaut à 0
    },

    installation: {
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
    status: {
        type: String,
        enum: ["Demande", "EnAttente", "EnCours", "Terminer", "EnRetard"]
      },
      
      enAttente: {
        status: {
          type: Boolean,
          default: false 
        },
        remarque: {
          type: String
        }
      },

      dateDemande: {
        type: Date,
      },

      facturation: {
        type : Boolean
      },
      garantie: {
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

InterventionSchema.pre('save', function (next) {
  // Si en attente est à TRUE, mettre le statut à "EnAttente" et retourner
  if (this.enAttente.status === true) {
    this.status = 'EnAttente';
    return next();
  }

  // Si dateIntervention est définie, mettre le statut à "Terminer"
  if (this.dateIntervention) {
    this.status = 'Terminer';
  }

  // Si datePrevisionelIntervention est inférieure à la date du jour et une date de demande existe, mettre le statut à "EnCour" ou "EnRetard"
  if (this.datePrevisionelIntervention && this.dateDemande) {
    const today = new Date();
    if (this.datePrevisionelIntervention >= today) {
      this.status = 'EnCours';
    } else {
      this.status = 'EnRetard';
      // Calculer le nombre de jours de retard
      const delay = today - this.datePrevisionelIntervention;
      const daysOfDelay = Math.ceil(delay / (1000 * 60 * 60 * 24));
      // Ajouter un nouveau champ pour le nombre de jours de retard
      this.joursDeRetard = daysOfDelay;
    }
  }

  next();
});



module.exports = mongoose.model("Intervention", InterventionSchema);
