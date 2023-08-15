const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const ContactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Monsieur", "Madame", "Mademoiselle"],
      default: "Monsieur",
    },

    firstname: {
      type: String,
      required: [true, "merci d'entrer un prénom"],
    },

    lastname: {
      type: String,
      required: [true, "Merci d'entrer un nom de famille"],
    },

    email: {
      type: String,
      required: [true, "Merci d'entrer un email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },


    phone: {
      type: String,
      required: [true, "Merci d'entrer un numéro de télèphone"],
      unique: true,
    },

    phone2: {
      type: String,
      unique: true,
    },

    function: {
      type: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
