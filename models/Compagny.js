const mongoose = require("mongoose");

const CompagnySchema = new mongoose.Schema(
  {
  
    ridet: {
      type: String,
    },
    nomCommercial: {
      type: Number,
    },
    raisonSocial: {
      type: Number,
    },
  
    type: {
      type: String,
      enum: ["EI", "SA", "SARL", "SAS", "SNC", "Associations", "Administration", "SCI", "SCP", "GIE", "GIP"],
    },


    contacts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Contact"
        }
      ],

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
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Geocode & create location
CompagnySchema.pre("save", async function (next) {
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
  next();
});

module.exports = mongoose.model("Compagny", CompagnySchema);
