// src/components/SearchBar.jsx

import {
  Search,
  X
} from 'lucide-react';

const SearchBar = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="book-search"
        className="
          text-sm
          font-semibold
          text-slate-700
        "
      >
        Search Books
      </label>

      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          shadow-sm
          transition
          focus-within:border-blue-500
          focus-within:ring-4
          focus-within:ring-blue-100
        "
      >
        <Search
          size={19}
          className="
            shrink-0
            text-slate-400
          "
        />

        <input
          id="book-search"
          type="search"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search by title or author..."
          className="
            min-h-12
            w-full
            bg-transparent
            text-slate-900
            outline-none
            placeholder:text-slate-400
          "
        />

        {/* Show clear button only when text exists */}
        {searchTerm && (
          <button
            type="button"
            onClick={() =>
              onSearchChange('')
            }
            className="
              rounded-lg
              p-1.5
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <p
        className="
          text-xs
          text-slate-500
        "
      >
        Search waits 300ms after
        you stop typing.
      </p>
    </div>
  );
};

export default SearchBar;