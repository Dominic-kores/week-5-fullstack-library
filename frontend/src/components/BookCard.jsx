// src/components/BookCard.jsx

import {
  BookOpen,
  Trash2
} from 'lucide-react';

const BookCard = ({
  book,
  onDelete
}) => {
  return (
    <article
      className="
        flex
        h-full
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* Book icon */}
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-700
        "
      >
        <BookOpen size={23} />
      </div>

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div>
            {/* Genre */}
            <p
              className="
                mb-1
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              {book.genre}
            </p>

            {/* Title */}
            <h3
              className="
                text-lg
                font-bold
                leading-snug
                text-slate-900
              "
            >
              {book.title}
            </h3>
          </div>

          {/* Availability status */}
          {book.available ? (
            <span
              className="
                w-fit
                shrink-0
                rounded-full
                bg-emerald-100
                px-3
                py-1
                text-xs
                font-bold
                text-emerald-700
              "
            >
              Available
            </span>
          ) : (
            <span
              className="
                w-fit
                shrink-0
                rounded-full
                bg-red-100
                px-3
                py-1
                text-xs
                font-bold
                text-red-700
              "
            >
              Borrowed by{' '}
              {book.borrowedBy}
            </span>
          )}
        </div>

        {/* Author */}
        <p
          className="
            mt-2
            text-sm
            text-slate-600
          "
        >
          by {book.author}
        </p>

        {/* ISBN */}
        <p
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >
          ISBN: {book.isbn}
        </p>

        {/* Bonus delete button */}
        <button
          type="button"
          onClick={() =>
            onDelete(book)
          }
          className="
            mt-5
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-lg
            bg-red-50
            px-3
            py-2
            text-sm
            font-semibold
            text-red-700
            transition
            hover:bg-red-100
          "
        >
          <Trash2 size={16} />

          Delete
        </button>
      </div>
    </article>
  );
};

export default BookCard;