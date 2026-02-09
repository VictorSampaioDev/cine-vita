import './moviecard.css'
import { urlPoster } from '../api/tmdb'
import { useFavoritos } from '../contexts/FavoritosContexto'
import { Link } from 'react-router-dom'

export default function CartaoFilme({ movie, tipo }){
  const { alternarFavorito, favoritos } = useFavoritos();
  const ehFavorito = favoritos.some(m=>m.id===movie.id);

  // detectar tipo quando não informado: usar media_type ou campo de data
  const tipoDetectado = tipo || movie.media_type || (movie.first_air_date ? 'tv' : 'movie');

  return (
    <div className="movie-card">
      <Link to={`/detalhes/${tipoDetectado}/${movie.id}`} className="link-sem-decoracao">
        <img src={urlPoster(movie.poster_path)} alt={movie.title || movie.name} />
        <div className="meta">
          <div className="title">{movie.title || movie.name}</div>
          <div className="info">{(movie.release_date || movie.first_air_date)?.slice(0,4) || ''} • {Math.round((movie.vote_average||0)*10)/10}</div>
        </div>
      </Link>
      <button className={`fav-toggle ${ehFavorito? 'active':''}`} onClick={()=>alternarFavorito(movie)}>{ehFavorito? '★':'☆'}</button>
    </div>
  )
}
