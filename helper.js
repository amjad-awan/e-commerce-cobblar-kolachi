const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getToken = async (userId) => {
  console.log("userId", userId);
  return Jwt.sign({ _id: userId }, process.env.JWT_SECRET);
};

exports.encodPassword = async (password) => {
  try {
    const genSalt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(password, genSalt);
    return encodedPassword;
  } catch (error) {
    throw new Error("Password encoding failed");
  }
};
