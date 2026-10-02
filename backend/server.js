// server.js

// External packages
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Application routes
const bookRoutes =
  require('./routes/books');

// Custom middleware
const notFound =
  require('./middleware/notFound');

const errorHandler =
  require('./middleware/errorHandler');

// Create Express app.
const app = express();

// Backend port.
const PORT =
  process.env.PORT || 3000;


// ============================================================
// GLOBAL MIDDLEWARE
// ============================================================

// Adds security-related HTTP headers.
app.use(helmet());


// Allow the Vite frontend.
//
// React runs on localhost:5173.
// Express runs on localhost:3000.
app.use(
  cors({
    origin:
      'http://localhost:5173'
  })
);


// Allows Express to read JSON bodies.
//
// Example:
//
// {
//   "title": "My Book"
// }
app.use(express.json());


// Logs requests such as:
//
// GET /api/books 200
// POST /api/books 201
app.use(morgan('dev'));


// ============================================================
// HOME ROUTE
// ============================================================

app.get('/', (req, res) => {
  res.status(200).json({
    message:
      'Library API is running'
  });
});


// ============================================================
// BOOK ROUTES
// ============================================================

// Every books route begins with:
//
// /api/books
app.use(
  '/api/books',
  bookRoutes
);


// ============================================================
// ERROR HANDLING
// ============================================================

// Handle routes that do not exist.
app.use(notFound);


// Global error handler.
// Keep this LAST.
app.use(errorHandler);


// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(
    `Library API running at http://localhost:${PORT}`
  );
});