const mongoose = require("mongoose");

const ForfaitSchema = new mongoose.Schema(
  {
 
    typeInstallation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeInstallation",
    },

    commune: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commune",
    },

    levage: {
      type: Boolean,
    },
    nacelle: {
      type: Boolean,
    },
    traveauxAnnexeConformite: {
      type: Boolean,
    },

    typeToiture: {
      type: String,
      enum: ["toles", "isotechnique", "toitureTerasse", "autres"],
    },
    ToitureTholeType: {
      type: String,
      enum: ["ondulee", "bacAcier", "KlipLock"],
    },
    ToitureIsotechniqueType: {
      type: String,
      enum: ["ondulee", "bacAcier"],
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Forfait", ForfaitSchema);
