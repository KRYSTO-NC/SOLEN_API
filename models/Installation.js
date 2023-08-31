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
      enum: [
        "Etude",
        "EnService",
        "AttenteAutorisation",
        "AttenteConformité",
        "Projet",
        "SansSuite",
        "AInstaller",
        "RetardInstallation",
      ],
    },
    demandeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Demandeur",
    },
    benneficiaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Benneficiaire",
    },
    concessionaire: {
      type: String,
      enum: ["EEC", "Enercal"],
    },
    numCompteurEnercal: {
      type: Date,  // Vérifier si c'est le bon type
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
    numClientEnercal: {
      type: Date,  // Vérifier si c'est le bon type
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
        default: function () {
          return !!this.dateMiseEnService;  // true si dateMiseEnService est définie
        },
      },
      duree: {
        type: Number,
        default: 1,  // Durée par défaut de 1 an
      },
      dateFin: {
        type: Date,
        default: function () {
          if (this.dateMiseEnService) {
            const dateFin = new Date(this.dateMiseEnService);
            dateFin.setFullYear(dateFin.getFullYear() + this.garantie.duree);
            return dateFin;
          }
          return null;
        },
      },
    },
    // Informations sur la demande EEC
    demandeEEC: {
      dateDemande: {
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
      dateDemande: {
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
      dateDemande: {
        type: Date,
      },
      dateAcusée: {
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
      dateDemande: {
        type: Date,
      },
      dateAcusée: {
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
    // Status global de la demande
    statusDemande: {
      type: String,
      enum: ["Encours", "Acceptée", "Refusé"],
    },
    nombreJourRetard: {
      type: Number,
      default: 0,
    },
    nombreJoursDepuisDemande: {
      type: Number,
      default: 0,
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

// Géocodage et création de la localisation
InstallationSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  this.address = undefined;
  next();
});

// Middleware pour calculer le nombre de jours depuis la date de demande et le nombre de jours de retard
InstallationSchema.pre("save", function (next) {
  // Calculs pour le nombre de jours de retard et depuis la date de demande
  const now = new Date();
  if (this.datePrevisionelMiseEnService) {
    const diff = Math.abs(now - this.datePrevisionelMiseEnService);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    this.nombreJourRetard = now > this.datePrevisionelMiseEnService ? diffDays : 0;
  }
  if (this.demandeEEC.dateDemande) {
    const diff = Math.abs(now - this.demandeEEC.dateDemande);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    this.nombreJoursDepuisDemande = diffDays;
  }
  next();
});

// Middleware pour calculer la date de fin du délai de rétractation pour demandeDimenc
InstallationSchema.pre("save", function (next) {
  if (this.demandeDimenc.dateAcusée) {
    const dateFinDelai = new Date(this.demandeDimenc.dateAcusée);
    dateFinDelai.setDate(dateFinDelai.getDate() + 30);
    this.demandeDimenc.finDelaiRetraction = dateFinDelai;
  }
  next();
});

// Middleware pour calculer le statut global de la demande
InstallationSchema.pre("save", function (next) {
  const statusEEC = this.demandeEEC.status;
  const statusEnercal = this.demandeEnercal.status;
  const statusDimenc = this.demandeDimenc.status;

  if ((statusEEC === "Acceptée" || statusEnercal === "Acceptée") && statusDimenc === "Acceptée") {
    this.statusDemande = "Acceptée";
  } else if (statusEEC === "Refusé" || statusEnercal === "Refusé" || statusDimenc === "Refusé") {
    this.statusDemande = "Refusé";
  } else {
    this.statusDemande = "Encours";
  }
  next();
});


module.exports = mongoose.model("Installation", InstallationSchema);
