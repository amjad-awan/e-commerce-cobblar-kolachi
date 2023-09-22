const mongoose = require("mongoose");

const CelibirtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photos: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

module.exports = mongoose.model("Celibirties", CelibirtySchema);
