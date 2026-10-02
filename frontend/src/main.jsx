import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Contains the Tailwind CSS styles for the app.
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
