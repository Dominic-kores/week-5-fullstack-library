// src/App.jsx

import {
  useEffect,
  useState
} from 'react';

import {
  Library,
  TriangleAlert,
  Wifi
} from 'lucide-react';

import {
  deleteBook,
  fetchBooks
} from './api/books';

import BookForm
  from './components/BookForm';

import BookList
  from './components/BookList';

import LoadingSpinner
  from './components/LoadingSpinner';

import SearchBar
  from './components/SearchBar';


const App = () => {
  // ==========================================================
  // STATE
  // ==========================================================

  // Books currently displayed.
  const [
    books,
    setBooks
  ] = useState([]);

  // Search input.
  const [
    searchTerm,
    setSearchTerm
  ] = useState('');

  // Loading state.
  const [
    loading,
    setLoading
  ] = useState(true);

  // API error.
  const [
    error,
    setError
  ] = useState('');


  // ==========================================================
  // TASK 1 + TASK 3
  //
  // FETCH BOOKS + DEBOUNCED SEARCH
  // ==========================================================

  useEffect(() => {
    /*
      AbortController allows us
      to cancel an old fetch request.
    */
    const controller =
      new AbortController();


    /*
      Initial empty search:

      fetch immediately.

      User typing search:

      wait 300ms.
    */
    const delay =
      searchTerm.trim()
        ? 300
        : 0;


    const timer =
      setTimeout(
        async () => {
          setLoading(true);

          setError('');

          try {
            const data =
              await fetchBooks(
                searchTerm,
                controller.signal
              );

            setBooks(data);
          } catch (err) {
            /*
              AbortError simply means
              the user typed again
              before the old request
              completed.
            */
            if (
              err.name !==
              'AbortError'
            ) {
              setError(
                err.message ||
                'Unable to connect to the API'
              );
            }
          } finally {
            /*
              Do not change loading state
              if request was cancelled.
            */
            if (
              !controller
                .signal
                .aborted
            ) {
              setLoading(false);
            }
          }
        },
        delay
      );


    /*
      Cleanup runs when:

      - searchTerm changes
      - component unmounts

      This creates our debounce.
    */
    return () => {
      clearTimeout(timer);

      controller.abort();
    };
  }, [searchTerm]);


  // ==========================================================
  // TASK 2
  //
  // ADD NEW BOOK DIRECTLY TO STATE
  // ==========================================================

  const handleBookCreated =
    (newBook) => {
      /*
        Important:

        We DO NOT fetch all books again.

        We append the returned book
        directly to current React state.
      */
      setBooks(
        (currentBooks) => [
          ...currentBooks,
          newBook
        ]
      );
    };


  // ==========================================================
  // BONUS
  //
  // OPTIMISTIC DELETE
  // ==========================================================

  const handleDelete =
    async (book) => {
      // Ask before deleting.
      const confirmed =
        window.confirm(
          `Are you sure you want to delete ${book.title}?`
        );

      if (!confirmed) {
        return;
      }


      /*
        Save current list.

        We need this in case
        the DELETE request fails.
      */
      const previousBooks =
        [...books];


      /*
        OPTIMISTIC UPDATE:

        Remove immediately from
        the user interface.
      */
      setBooks(
        (currentBooks) =>
          currentBooks.filter(
            (currentBook) =>
              currentBook.id !==
              book.id
          )
      );

      setError('');


      try {
        // Send DELETE request.
        await deleteBook(
          book.id
        );
      } catch (err) {
        /*
          API failed.

          Restore the previous list.
        */
        setBooks(
          previousBooks
        );

        setError(
          err.message
        );
      }
    };


  // ==========================================================
  // USER INTERFACE
  // ==========================================================

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          py-10
          sm:px-6
          lg:px-8
        "
      >

        {/* ============================================= */}
        {/* PAGE HEADER */}
        {/* ============================================= */}

        <header
          className="
            mb-8
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-900
              text-white
              shadow-lg
            "
          >
            <Library size={28} />
          </div>

          <div>
            <p
              className="
                mb-1
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-blue-600
              "
            >
              Week 5 Full-Stack Assignment
            </p>

            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-slate-950
                sm:text-4xl
              "
            >
              Library Book Manager
            </h1>

            <p
              className="
                mt-3
                max-w-3xl
                leading-7
                text-slate-600
              "
            >
              React frontend connected to
              an Express REST API using
              fetch requests, CORS, Vite
              proxy, debounced search and
              optimistic UI.
            </p>
          </div>
        </header>


        <main className="space-y-6">

          {/* =========================================== */}
          {/* TASK 2 - CREATE BOOK */}
          {/* =========================================== */}

          <BookForm
            onBookCreated={
              handleBookCreated
            }
          />


          {/* =========================================== */}
          {/* TASKS 1 & 3 */}
          {/* =========================================== */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
            "
          >
            {/* Section Header */}
            <div
              className="
                mb-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    mb-1
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-blue-600
                  "
                >
                  Tasks 1 & 3
                </p>

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-slate-900
                  "
                >
                  Library Collection
                </h2>
              </div>


              {/* API status label */}
              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-50
                  px-3
                  py-2
                  text-xs
                  font-bold
                  text-blue-700
                "
              >
                <Wifi size={15} />

                Express API
              </div>
            </div>


            {/* Search */}
            <SearchBar
              searchTerm={
                searchTerm
              }
              onSearchChange={
                setSearchTerm
              }
            />


            {/* Global API Error */}
            {error && (
              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-700
                "
              >
                <TriangleAlert
                  size={19}
                  className="shrink-0"
                />

                <span>
                  {error}
                </span>
              </div>
            )}


            {/* Results Heading */}
            <div
              className="
                mb-4
                mt-7
                flex
                items-center
                justify-between
              "
            >
              <h3
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Books
              </h3>

              {!loading && (
                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-slate-600
                  "
                >
                  {books.length}{' '}

                  {books.length === 1
                    ? 'book'
                    : 'books'}
                </span>
              )}
            </div>


            {/* Loading or Books */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <BookList
                books={books}
                onDelete={
                  handleDelete
                }
              />
            )}

          </section>

        </main>


        {/* Footer */}
        <footer
          className="
            py-8
            text-center
            text-sm
            text-slate-400
          "
        >
          Dominic Kisioya ·
          Full-Stack Software &
          AI Engineering · 2026
        </footer>

      </div>
    </div>
  );
};

export default App;