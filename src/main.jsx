import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App.jsx'
import { ProvedorFavoritos } from './contexts/FavoritosContexto'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProvedorFavoritos>
        <App />
      </ProvedorFavoritos>
    </BrowserRouter>
  </StrictMode>,
)
