const mongoose = require("mongoose");

const optionMaintenanceSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

exports.OptionMaintenance = mongoose.model(
  "OptionMaintenance",
  optionMaintenanceSchema
);
