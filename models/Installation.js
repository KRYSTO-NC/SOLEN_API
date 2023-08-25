const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')
const InstallationSchema = new mongoose.Schema(
  {
    typeInstallation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeInstallation',
    },
    refference: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Etude', 'EnService', 'AttentAutorisation' , 'Projet', 'SansSuite' , "AInstaller", "RetardInstallation"],
    },
    datePrevisionelMiseEnService: {
      type: Date,
    },
    dateMiseEnService: {
      type: Date,
    },

    dateDemandeEEC: {
      type: Date,
    },
    dateAutorisationsEEC: {
      type: Date,
    },

    nombreJourRetard: {
      type: Number,
      default: 0,
    },
    nombreJoursDepuisDemande: {
      type: Number,
      default: 0,
    },

    demandeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Demandeur',
    },
    
    benneficiaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Benneficiaire',
    },

   
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
    concessionaire: {
      type: String,
      enum: ['EEC', 'Enercal'],
    },

  

    numCompteurEnercal: {
      type: Date,
    },

    numClientEnercal: {
      type: Date,
    },

    onduleurs: [
      {
        ref: {
          type: String, // Ou Number, selon le type de la référence dolibar
        },
        nombre: {
          type: Number,
        },
      },
    ],
    systemeDeSupportage: [
      {
        ref: {
          type: String, // Ou Number, selon le type de la référence dolibar
        },
        nombre: {
          type: Number,
        },
      },
    ],
    batteries: [
      {
        ref: {
          type: String, // Ou Number, selon le type de la référence dolibar
        },
        nombre: {
          type: Number,
        },
        suppervision: {
          type: Number,
        },
      },
    ],

    address: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)


// Reverse populate with virtuals

InstallationSchema.virtual('interventions', {
  ref: 'Intervention',
  localField: '_id',
  foreignField: 'installation',
  justOne: false,
})

// Geocode & create location
InstallationSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }

  // Do not save address
  this.address = undefined
  next()
})

// Middleware pour incrémenter la référence
InstallationSchema.pre('save', async function (next) {
  console.log("Pre-save middleware for reference increment started");

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  console.log(`Year: ${year}, Month: ${month}`);

  // Trouver le dernier enregistrement en triant par référence pour l'année et le mois donnés
  const lastRecord = await this.constructor.findOne({
    refference: { $regex: new RegExp(`^${year}${month}`) },
  }).sort({ refference: -1 });

  console.log("Last record found: ", lastRecord);

  // Extraire le numéro et l'incrémenter, ou commencer par 1 si aucun enregistrement n'est trouvé
  let number = 1;
  if (lastRecord) {
    const lastNumber = lastRecord.refference.split('-')[1];
    number = parseInt(lastNumber) + 1;
  }

  console.log("Number to be used for reference: ", number);

  // Formater la référence
  this.refference = `${year}${month}-${String(number).padStart(5, '0')}`;

  console.log("Final reference value: ", this.refference);
  
  next();
});



InstallationSchema.pre('save', async function (next) {
  const now = new Date();

  // Check if all dates are undefined and set status to 'Etude'
  if (!this.dateMiseEnService && !this.datePrevisionelMiseEnService && !this.dateDemandeEEC) {
    this.status = 'Etude';
  }

  // Mettre à jour le statut
  if (this.dateMiseEnService) {
    this.status = 'EnService';
  } else if (this.datePrevisionelMiseEnService) {
    if (this.datePrevisionelMiseEnService > now) {
      this.status = 'RetardInstallation';
    } else {
      this.status = 'AInstaller';
    }
  } else if (this.dateDemandeEEC && !this.datePrevisionelMiseEnService) {
    this.status = 'AttenteAutorisation';
  }

  // Calculer le nombre de jours de retard
  if (this.datePrevisionelMiseEnService && this.datePrevisionelMiseEnService > now) {
    this.nombreJourRetard = Math.ceil((this.datePrevisionelMiseEnService - now) / (1000 * 60 * 60 * 24));
  } else {
    this.nombreJourRetard = 0;
  }

  // Calculer le nombre de jours depuis la demande
  if (this.dateDemandeEEC) {
    this.nombreJoursDepuisDemande = Math.ceil((now - this.dateDemandeEEC) / (1000 * 60 * 60 * 24));
  } else {
    this.nombreJoursDepuisDemande = 0;
  }

  next();
});
module.exports = mongoose.model('Installation', InstallationSchema)
