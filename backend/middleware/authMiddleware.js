const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protected = asyncHandler(async (req, res, next) => {
  let token;

  if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // console.log(token)

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded)

      // Get user data from token
      req.user = await User.findById(decoded.id).select("-password");
      next();

    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Please authenticate");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Please authenticate, no token available");
  }
});

module.exports = { protected };
