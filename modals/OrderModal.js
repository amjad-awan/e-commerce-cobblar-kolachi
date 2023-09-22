const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        productcategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
        quantity: Number,
        showSize: String,
      },
    ],

    address: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    phone: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    email: {
      type: String,
    },

    orderBy: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    status: {
      type: String,
      default: "not accepted",
      enum: ["not accepted", "processing", "delivering", "delivered", "cancel"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
