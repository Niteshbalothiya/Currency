import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import CryptoContext from './CryptoContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode><App />
  </StrictMode>,
)
