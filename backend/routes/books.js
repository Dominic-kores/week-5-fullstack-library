// routes/books.js

const express = require('express');

const books = require('../data/books');

const validateBook =
  require('../middleware/validateBook');

// Create a reusable Express router.
const router = express.Router();


// ============================================================
// GET /api/books
//
// Returns all books.
//
// Search example:
// GET /api/books?search=ngugi
// ============================================================

router.get('/', (req, res) => {
  const { search } = req.query;

  // Copy the array so filtering does not
  // modify the original data.
  let results = [...books];

  // If there is a search query,
  // search both title and author.
  if (
    search &&
    search.trim() !== ''
  ) {
    const query =
      search.trim().toLowerCase();

    results = results.filter(
      (book) => {
        return (
          book.title
            .toLowerCase()
            .includes(query) ||

          book.author
            .toLowerCase()
            .includes(query)
        );
      }
    );
  }

  res.status(200).json({
    count: results.length,
    data: results
  });
});


// ============================================================
// GET /api/books/:id
//
// Returns one book.
// ============================================================

router.get('/:id', (req, res) => {
  const id =
    Number(req.params.id);

  // Make sure the ID is a number.
  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message:
        'Book ID must be a valid number'
    });
  }

  const book =
    books.find(
      (book) => book.id === id
    );

  if (!book) {
    return res.status(404).json({
      error: 'Not Found',
      message:
        `Book with ID ${id} was not found`
    });
  }

  res.status(200).json({
    data: book
  });
});


// ============================================================
// POST /api/books
//
// Creates a new book.
//
// Required:
// title
// author
// isbn
// genre
// ============================================================

router.post(
  '/',
  validateBook,
  (req, res) => {
    const {
      title,
      author,
      isbn,
      genre
    } = req.body;

    // Check if ISBN already exists.
    const duplicateISBN =
      books.find(
        (book) =>
          book.isbn === isbn.trim()
      );

    if (duplicateISBN) {
      return res.status(400).json({
        error: 'Validation Error',
        message:
          'A book with this ISBN already exists',
        messages: [
          'A book with this ISBN already exists'
        ]
      });
    }

    // Generate the next ID.
    const newId =
      books.length > 0
        ? Math.max(
            ...books.map(
              (book) => book.id
            )
          ) + 1
        : 1;

    // Create new book.
    const newBook = {
      id: newId,

      title: title.trim(),

      author: author.trim(),

      isbn: isbn.trim(),

      genre,

      // New books are available by default.
      available: true,

      borrowedBy: null
    };

    // Add the book to memory.
    books.push(newBook);

    // 201 = resource successfully created.
    res.status(201).json({
      message:
        'Book created successfully',

      data: newBook
    });
  }
);


// ============================================================
// DELETE /api/books/:id
//
// Bonus challenge.
//
// Borrowed books cannot be deleted.
// This allows us to demonstrate optimistic UI rollback.
// ============================================================

router.delete(
  '/:id',
  (req, res) => {
    const id =
      Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: 'Invalid ID',

        message:
          'Book ID must be a valid number'
      });
    }

    const bookIndex =
      books.findIndex(
        (book) => book.id === id
      );

    if (bookIndex === -1) {
      return res.status(404).json({
        error: 'Not Found',

        message:
          `Book with ID ${id} was not found`
      });
    }

    const book =
      books[bookIndex];

    // Do not delete borrowed books.
    if (!book.available) {
      return res.status(409).json({
        error: 'Conflict',

        message:
          `"${book.title}" cannot be deleted because it is currently borrowed by ${book.borrowedBy}`
      });
    }

    // Remove the selected book.
    books.splice(bookIndex, 1);

    // 204 = successful request with no body.
    res.status(204).send();
  }
);


// Export the router.
module.exports = router;