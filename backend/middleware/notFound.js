// middleware/notFound.js

// Handles routes that do not exist.
const notFound = (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} does not exist`
  });
};

module.exports = notFound;