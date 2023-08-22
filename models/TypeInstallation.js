const mongoose = require("mongoose");

const TypeInstallationSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
    },

    raccordement: {
      type: String,
      enum: ["mono", "tri"],
    },
    puissance: {
      type: Number,
    },

    amperage: {
      type: Number,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("TypeInstallation", TypeInstallationSchema);
