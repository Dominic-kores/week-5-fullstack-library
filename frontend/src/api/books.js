// src/api/books.js

/*
  Because we configured the Vite proxy,
  React can use:

  /api/books instead of: http://localhost:3000/api/books

  Vite forwards the request to Express.
*/
const API_URL =
  '/api/books';


// ============================================================
// GET ERROR MESSAGE
// ============================================================

// Reusable helper for API errors.
const getErrorMessage =
  async (response) => {
    try {
      const data =
        await response.json();

      // If backend returns multiple
      // validation messages.
      if (
        Array.isArray(
          data.messages
        ) &&
        data.messages.length > 0
      ) {
        return data.messages.join(
          ', '
        );
      }

      return (
        data.message ||
        data.error ||
        'Request failed'
      );
    } catch {
      return (
        'The server returned an unreadable response'
      );
    }
  };


// ============================================================
// GET BOOKS
// ============================================================

export const fetchBooks =
  async (
    search = '',
    signal
  ) => {
    let url = API_URL;

    // Add search query only when
    // search text exists.
    if (search.trim()) {
      url +=
        `?search=${encodeURIComponent(
          search.trim()
        )}`;
    }

    const response =
      await fetch(url, {
        signal
      });

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(
          response
        )
      );
    }

    const result =
      await response.json();

    return result.data || [];
  };


// ============================================================
// CREATE BOOK
// ============================================================

export const createBook =
  async (bookData) => {
    const response =
      await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(bookData)
      });

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(
          response
        )
      );
    }

    const result =
      await response.json();

    return result.data;
  };


// ============================================================
// DELETE BOOK
// ============================================================

export const deleteBook =
  async (id) => {
    const response =
      await fetch(
        `${API_URL}/${id}`,
        {
          method: 'DELETE'
        }
      );

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(
          response
        )
      );
    }

    // DELETE returns 204,
    // therefore no JSON is expected.
    return true;
  };