import { NavLink, useNavigate } from 'react-router-dom'
import './header.css'
import { useFavoritos } from '../contexts/FavoritosContexto'

export default function Cabecalho(){
  const nav = useNavigate();
  const { favoritos } = useFavoritos();

  return (
    <header className="site-header">
      <div className="brand" onClick={()=>nav('/')}>CINEVITA</div>
      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Filmes</NavLink>
        <NavLink to="/series">Séries</NavLink>
      </nav>
      <div className="right-actions">
        <button className="fav-btn" onClick={()=>nav('/favorites')}>Favoritos <span className="badge">{favoritos.length}</span></button>
      </div>
    </header>
  )
}
