import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import CryptoCon from './CryptoCon.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoCon>
    <App/>
    </CryptoCon>
  </StrictMode>,
)
