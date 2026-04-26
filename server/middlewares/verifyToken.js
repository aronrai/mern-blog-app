const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomError("Access denied. No token provided.", 401));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedPayload.id;
    next();
  } catch (error) {
    return next(new CustomError("Invalid or expired token.", 401));
  }
};

module.exports = verifyToken;
