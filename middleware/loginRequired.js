const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ success: false, message: "Token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginRequired,
};
