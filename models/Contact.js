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
      
    },

    phone2: {
      type: String,
     
    },

    function: {
      type: String,
    },

    address: {
      type: String,
      
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
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Geocode & create location
ContactSchema.pre("save", async function (next) {
  if (this.address) {
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

    // Do not save address
    this.address = undefined;
  }
  next();
});


module.exports = mongoose.model("Contact", ContactSchema);
