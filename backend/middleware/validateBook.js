// middleware/validateBook.js

// Genres allowed by the assignment.
const allowedGenres = [
  'fiction',
  'technology',
  'business',
  'autobiography'
];

// Reusable validation middleware.
//
// This runs before the POST route handler.
const validateBook = (req, res, next) => {
  const {
    title,
    author,
    isbn,
    genre
  } = req.body;

  // Store all validation problems here.
  const errors = [];

  // Validate title.
  if (
    typeof title !== 'string' ||
    title.trim() === ''
  ) {
    errors.push('Title is required');
  }

  // Validate author.
  if (
    typeof author !== 'string' ||
    author.trim() === ''
  ) {
    errors.push('Author is required');
  }

  // Validate ISBN.
  if (
    typeof isbn !== 'string' ||
    isbn.trim() === ''
  ) {
    errors.push('ISBN is required');
  }

  // Validate genre.
  if (!allowedGenres.includes(genre)) {
    errors.push(
      `Genre must be one of: ${allowedGenres.join(', ')}`
    );
  }

  // Stop the request if validation failed.
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation Error',
      message: errors.join(', '),
      messages: errors
    });
  }

  // Everything is valid, so continue.
  next();
};

module.exports = validateBook;