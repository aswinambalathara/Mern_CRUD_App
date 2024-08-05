const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.isAuthUser = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Token",
      });
    }

    req.user = user
    next();
  } catch (error) {
    console.error(`UserAuthError == ${error}`);
  }
};


module.exports.isAuthAdmin = (req, res, next) => {
    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "No token provided",
        });
      }
  
      const admin = jwt.verify(token, process.env.JWT_SECRET);
      if (!admin) {
        return res.status(401).json({
          status: false,
          message: "Invalid Token",
        });
      }
      
      req.admin = admin
      next();
    } catch (error) {
      console.error(`AdminAuthError == ${error}`);
    }
  };