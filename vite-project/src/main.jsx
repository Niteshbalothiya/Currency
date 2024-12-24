import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CryptoContext from './CryptoContext.jsx'


createRoot(document.getElementById('root')).render(
    <CryptoContext>
      <App />
    </CryptoContext>
)