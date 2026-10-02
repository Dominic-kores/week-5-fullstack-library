// src/components/BookList.jsx

import BookCard
  from './BookCard';

const BookList = ({
  books,
  onDelete
}) => {
  // Required by Task 3.
  if (books.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-slate-50
          px-6
          py-14
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-bold
            text-slate-800
          "
        >
          No books found
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Try another title
          or author.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-5
        md:grid-cols-2
      "
    >
      {books.map(
        (book) => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
};

export default BookList;