import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CryptoContext from './CryptoContext.jsx'
import "react-alice-carousel/lib/alice-carousel.css";



createRoot(document.getElementById('root')).render(
    <CryptoContext>
      <div class="relative h-full w-full bg-slate-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
      <App />
        </div></div>
      <App />
    </CryptoContext>
)