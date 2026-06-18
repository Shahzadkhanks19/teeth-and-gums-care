/* =====================================
   AUTH MIDDLEWARE
===================================== */

const jwt = require("jsonwebtoken");

/* =====================================
   PROTECT ADMIN ROUTES
===================================== */

const protectAdmin = (req, res, next) => {
  let token;

  /*
    Check Authorization Header

    Expected Format:
    Authorization: Bearer TOKEN
  */
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      /*
        Extract JWT Token
      */
      token = req.headers.authorization.split(" ")[1];

      /*
        Verify Token
      */
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      /*
        Attach Admin Data To Request
      */
      req.admin = decoded;

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  /*
    No Token Found
  */
  return res.status(401).json({
    success: false,
    message: "Not authorized, no token",
  });
};

/* =====================================
   EXPORT MIDDLEWARE
===================================== */

module.exports = protectAdmin;