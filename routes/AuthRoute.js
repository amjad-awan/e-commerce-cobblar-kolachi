const express = require("express");
const {
  authController,
  loginController,
  protectedRouteController,
} = require("../controllers/AuthController.js");
const { loginRequired } = require("../middleware/loginRequired.js");

const route = express.Router();

route.post("/create-user", authController);
route.post("/login-user", loginController);
route.post("/protected-route", loginRequired, protectedRouteController);

module.exports = route;
