const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  productdescription: {
    type: String,
    required: true,
  },
  productcategory: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  productfeatures: [{ type: String, required: true }],
  featured: {
    type: Boolean,
    default: false,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  oldprice: {
    type: Number,
    required: true,
  },
  newprice: {
    type: Number,
    default: false,
  },
  reviews: [
    {
      username: String,
      email: String,
      title: String,
      rating: Number,
      body: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  photos: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

module.exports = mongoose.model("product", productSchema);
