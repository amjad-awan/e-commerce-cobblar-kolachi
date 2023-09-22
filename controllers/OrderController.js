const express = require("express");
const OrderModal = require("../modals/OrderModal.js");

const router = express.Router();

// Create a new order
const orderController = async (req, res) => {
  console.log("red orderBy", req.body);
  try {
    const {
      products,
      address,
      postalCode,
      phone,
      firstName,
      lastName,
      email,
      city,
      orderBy,
      country,
    } = req.body;

    // Create an array of product IDs and quantities from the request
    const orderedProducts = products.map((item) => ({
      product: item.productId, // Assuming you send a productId from the frontend
      quantity: item.quantity,
      showSize: item.showSize,
      productcategory: item.productcategory,
    }));

    await OrderModal.create({
      products: orderedProducts,
      address,
      postalCode,
      phone,
      firstName,
      lastName,
      email,
      city,
      country,
      orderBy,
    });

    res
      .status(200)
      .json({ success: true, message: "order created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrdersController = async (req, res) => {
  try {
    const orders = await OrderModal.find().populate({
      path: "products.product", // Ensure this path matches the field in your orderSchema
      select: "-photos -reviews",
    });

    res
      .status(200)
      .json({ orders, success: true, message: "orders fetched successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you pass the user's email as a route parameter

    const orders = await OrderModal.find({ orderBy: userId }).populate({
      path: "products.product products.productcategory",
      select: "-photos -photo",
    });

    res.status(200).json({
      success: true,
      message: `Orders for user ${userId} fetched successfully!`,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Controller function to update order status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await OrderModal.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  orderController,
  getOrdersController,
  getUserOrdersController,
  updateOrderStatus,
  router, // Exporting the router for use in your main application file
};
