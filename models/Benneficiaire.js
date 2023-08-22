const mongoose = require("mongoose");

const BenneficiaireSchema = new mongoose.Schema(
  {

    numClientEEC: {
      type: String,
    },
 


    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
      },
  
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Benneficiaire", BenneficiaireSchema);
