import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css' // ✅ Lägg till Toast CSS globalt
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  {/* ✅ Ingen BrowserRouter här! Den finns i App.jsx */}
  </StrictMode>,
)