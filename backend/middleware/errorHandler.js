// middleware/errorHandler.js

// Express error middleware has four parameters:
// err, req, res, next

const errorHandler = (
  err,
  req,
  res,
  next
) => {
  // Log the error for developers.
  console.error(err.stack);

  // Use the supplied status or fall back to 500.
  const statusCode =
    err.status || 500;

  res.status(statusCode).json({
    error:
      err.name || 'Server Error',

    message:
      err.message ||
      'Something went wrong on the server'
  });
};

module.exports = errorHandler;