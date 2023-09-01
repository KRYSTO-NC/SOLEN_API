const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

// Définition du schéma de l'installation
const InstallationSchema = new mongoose.Schema(
  {
    // Informations générales
    typeInstallation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeInstallation",
    },
    refference: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Etude", "EnService", "Projet", "SansSuite"],
    },
    demandeur: {
      IdDolibarr: {
        type: String,
      },
      remarque: String,
    },

    benneficiaire: {
      IdDolibarr: {
        type: String,
      },
      remarque: String,
    },

    concessionaire: {
      type: String,
      enum: ["EEC", "Enercal"],
    },
    numCompteurEnercal: {
      type: Date,
    },
    address: {
      type: String,
      required: true,
    },

    numClientEnercal: {
      type: Date,
    },
    datePose: {
      type: Date,
    },
    datePrevisionelMiseEnService: {
      type: Date,
    },
    dateMiseEnService: {
      type: Date,
    },
    // Gestion de la garantie
    garantie: {
      actif: {
        type: Boolean,
      },
      duree: {
        type: Number,
        default: 1, // Durée par défaut de 1 an
      },
      dateFin: {
        type: Date,
      },
    },
    // Informations sur la demande EEC
    demandeEEC: {
      date: {
        type: Date,
      },
      dateReponse: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["enDemande", "Acceptée", "Refusé", "sous-reserve"],
      },
      remarque: String,
    },
    // Informations sur la demande Enercal
    demandeEnercal: {
      date: {
        type: Date,
      },
      dateReponse: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["enDemande", "Acceptée", "Refusé", "sous-reserve"],
      },
      remarque: String,
    },
    // Informations sur la demande Dimenc
    demandeDimenc: {
      date: {
        type: Date,
      },
      dateAcusee: {
        type: Date,
      },
      finDelaiRetraction: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["enDemande", "Acceptée", "Refusé", "sous-reserve"],
      },
      remarque: String,
    },
    // Informations sur la conformité
    conformite: {
      date: {
        type: Date,
      },
      remarque: String,
    },

    // Informations techniques
    puissanceSouscrite: {
      type: Number,
    },
    puissanceTotalOnduleur: {
      type: Number,
    },
    puissancePvEtHybrid: {
      type: Number,
    },
    valeurBridagePuissance: {
      type: Number,
    },
    valeurBridageReinjection: {
      type: Number,
    },
    stockage: {
      type: Boolean,
    },
    capaciteBatterie: {
      type: Number,
    },
    onduleurs: [
      {
        ref: {
          type: String,
        },
        nombre: {
          type: Number,
        },
      },
    ],
    systemeDeSupportage: [
      {
        ref: {
          type: String,
        },
        nombre: {
          type: Number,
        },
      },
    ],
    batteries: [
      {
        ref: {
          type: String,
        },
        nombre: {
          type: Number,
        },
        suppervision: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate avec des virtuals
InstallationSchema.virtual("interventions", {
  ref: "Intervention",
  localField: "_id",
  foreignField: "installation",
  justOne: false,
});

module.exports = mongoose.model("Installation", InstallationSchema);
