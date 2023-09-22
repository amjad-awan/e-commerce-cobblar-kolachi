const express = require("express");
const { loginRequired } = require("../middleware/loginRequired.js");

const route = express.Router();

route.post("/protected-route", loginRequired);

module.exports = route;
