// data/books.js

// Starter books for the library API.
//
// available:
// true  = book can be borrowed
// false = book is currently borrowed
//
// borrowedBy stores the current borrower's name.

const books = [
  {
    id: 1,
    title: 'Weep Not, Child',
    author: 'Ngugi wa Thiong\'o',
    isbn: '978-0143106692',
    genre: 'fiction',
    available: true,
    borrowedBy: null
  },
  {
    id: 2,
    title: 'The River Between',
    author: 'Ngugi wa Thiong\'o',
    isbn: '978-0143106715',
    genre: 'fiction',
    available: false,
    borrowedBy: 'Amina'
  },
  {
    id: 3,
    title: 'Dust',
    author: 'Yvonne Adhiambo Owuor',
    isbn: '978-0345802545',
    genre: 'fiction',
    available: true,
    borrowedBy: null
  },
  {
    id: 4,
    title: 'Born a Crime',
    author: 'Trevor Noah',
    isbn: '978-0399588181',
    genre: 'autobiography',
    available: false,
    borrowedBy: 'Brian'
  },
  {
    id: 5,
    title: 'Shoe Dog',
    author: 'Phil Knight',
    isbn: '978-1501135927',
    genre: 'business',
    available: true,
    borrowedBy: null
  },
  {
    id: 6,
    title: 'The Lean Startup',
    author: 'Eric Ries',
    isbn: '978-0307887894',
    genre: 'business',
    available: true,
    borrowedBy: null
  },
  {
    id: 7,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    genre: 'technology',
    available: true,
    borrowedBy: null
  },
  {
    id: 8,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas and Andrew Hunt',
    isbn: '978-0135957059',
    genre: 'technology',
    available: true,
    borrowedBy: null
  },
  {
    id: 9,
    title: 'Americanah',
    author: 'Chimamanda Ngozi Adichie',
    isbn: '978-0307455925',
    genre: 'fiction',
    available: true,
    borrowedBy: null
  },
  {
    id: 10,
    title: 'Long Walk to Freedom',
    author: 'Nelson Mandela',
    isbn: '978-0316548182',
    genre: 'autobiography',
    available: true,
    borrowedBy: null
  }
];

// Make the array available to the routes.
module.exports = books;