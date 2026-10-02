
# Library Book Manager

A full-stack library management application built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, and **Express.js**.

This project demonstrates how a React frontend communicates with an Express backend using REST APIs, CORS, fetch requests, a Vite proxy, backend validation, debounced search, and optimistic UI updates.

---

## Project Objectives

The main objectives of this project are to:

- Build a complete full-stack application using React and Express.
- Connect a React frontend to an Express backend.
- Configure CORS for frontend and backend communication.
- Configure a Vite development proxy.
- Use the Fetch API to send HTTP requests.
- Retrieve and display book data from the backend.
- Create new books using a `POST` request.
- Validate user input on the backend.
- Display backend validation errors in the frontend.
- Add newly created books directly to React state without re-fetching.
- Search books by title or author.
- Implement a 300ms debounced search.
- Cancel outdated requests using `AbortController`.
- Display loading and error states.
- Display an empty state when no search results are found.
- Delete books using a `DELETE` request.
- Implement optimistic UI for book deletion.
- Restore deleted books when the backend request fails.
- Build reusable React components.
- Style the frontend using Tailwind CSS.
- Maintain a clean separation between frontend and backend code.

---

## Technologies Used

### Frontend

| Technology | Purpose |
| --- | --- |
| React | Building reusable UI components |
| Vite | Frontend development and build tool |
| Tailwind CSS | Styling the user interface |
| JavaScript | Frontend application logic |
| Fetch API | Sending HTTP requests |
| Lucide React | Icons used in the interface |

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express.js | REST API development |
| CORS | Allows frontend/backend communication |
| Morgan | HTTP request logging |
| Helmet | Adds security-related HTTP headers |
| Nodemon | Restarts the backend during development |

---

## Project Structure

```text
week-5-fullstack-library/
│
├── backend/
│   ├── data/
│   │   └── books.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── validateBook.js
│   │
│   ├── routes/
│   │   └── books.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── books.js
│   │   │
│   │   ├── components/
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookForm.jsx
│   │   │   ├── BookList.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── screenshots/
│ 
│
└── README.md


