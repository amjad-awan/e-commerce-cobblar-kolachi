const express = require("express");
const {
  getOrdersController,
  getUserOrdersController,
  orderController,
  updateOrderStatus,
} = require("../controllers/OrderController.js");

const route = express.Router();

route.post("/create-order", orderController);
route.get("/get-orders", getOrdersController);
route.get("/user-orders/:userId", getUserOrdersController);
route.put("/:orderId/status", updateOrderStatus);

module.exports = route;
