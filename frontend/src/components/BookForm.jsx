// src/components/BookForm.jsx

import {
  useState
} from 'react';

import {
  CircleCheck,
  Plus
} from 'lucide-react';

import {
  createBook
} from '../api/books';


// Initial form values.
const initialForm = {
  title: '',
  author: '',
  isbn: '',
  genre: 'fiction'
};


const BookForm = ({
  onBookCreated
}) => {
  // Store form input values.
  const [
    formData,
    setFormData
  ] = useState(initialForm);

  // Track request state.
  const [
    submitting,
    setSubmitting
  ] = useState(false);

  // Feedback messages.
  const [
    success,
    setSuccess
  ] = useState('');

  const [
    error,
    setError
  ] = useState('');


  // ==========================================================
  // HANDLE INPUT CHANGE
  // ==========================================================

  const handleChange =
    (event) => {
      const {
        name,
        value
      } = event.target;

      setFormData(
        (previousData) => ({
          ...previousData,

          [name]: value
        })
      );
    };


  // ==========================================================
  // HANDLE FORM SUBMIT
  // ==========================================================

  const handleSubmit =
    async (event) => {
      // Prevent page refresh.
      event.preventDefault();

      setError('');
      setSuccess('');
      setSubmitting(true);

      try {
        // POST to Express.
        const newBook =
          await createBook(
            formData
          );

        /*
          Assignment requirement:

          Add returned book directly
          to current React state.

          DO NOT fetch all books again.
        */
        onBookCreated(
          newBook
        );

        // Show success feedback.
        setSuccess(
          `"${newBook.title}" was added successfully.`
        );

        // Clear form.
        setFormData(
          initialForm
        );
      } catch (err) {
        // Display backend validation error.
        setError(
          err.message
        );
      } finally {
        setSubmitting(false);
      }
    };


  return (
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
      {/* Heading */}
      <div
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
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
            Task 2
          </p>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Create a New Book
          </h2>
        </div>

        <div
          className="
            rounded-xl
            bg-blue-50
            p-3
            text-blue-700
          "
        >
          <Plus size={22} />
        </div>
      </div>


      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              placeholder="Enter book title"
              className="
                min-h-12
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />
          </div>


          {/* Author */}
          <div className="space-y-2">
            <label
              htmlFor="author"
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Author
            </label>

            <input
              id="author"
              name="author"
              type="text"
              value={
                formData.author
              }
              onChange={
                handleChange
              }
              placeholder="Enter author"
              className="
                min-h-12
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />
          </div>


          {/* ISBN */}
          <div className="space-y-2">
            <label
              htmlFor="isbn"
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              ISBN
            </label>

            <input
              id="isbn"
              name="isbn"
              type="text"
              value={
                formData.isbn
              }
              onChange={
                handleChange
              }
              placeholder="978-1234567890"
              className="
                min-h-12
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />
          </div>


          {/* Genre */}
          <div className="space-y-2">
            <label
              htmlFor="genre"
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Genre
            </label>

            <select
              id="genre"
              name="genre"
              value={
                formData.genre
              }
              onChange={
                handleChange
              }
              className="
                min-h-12
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            >
              <option value="fiction">
                Fiction
              </option>

              <option value="technology">
                Technology
              </option>

              <option value="business">
                Business
              </option>

              <option value="autobiography">
                Autobiography
              </option>
            </select>
          </div>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-700
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-800
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Plus size={18} />

          {submitting
            ? 'Adding Book...'
            : 'Add Book'}
        </button>


        {/* Success Message */}
        {success && (
          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3
              text-sm
              font-medium
              text-emerald-700
            "
          >
            <CircleCheck
              size={18}
            />

            {success}
          </div>
        )}


        {/* Error Message */}
        {error && (
          <div
            className="
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
            {error}
          </div>
        )}
      </form>
    </section>
  );
};

export default BookForm;