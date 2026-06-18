/* =====================================
   GLOBAL ERROR MIDDLEWARE
===================================== */

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  /*
    Log Full Error Stack
    Useful for debugging
  */
  console.error(err.stack);

  /*
    Send Error Response
  */
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

/* =====================================
   EXPORT MIDDLEWARE
===================================== */

module.exports = errorMiddleware;