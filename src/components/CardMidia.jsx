import { Link } from 'react-router-dom'
import { urlPoster } from '../api/tmdb'
import './CardMidia.css'

export default function CardMidia({ midia, tipo = 'movie' }) {
  const titulo = midia.title || midia.name || 'Sem título'
  const poster = urlPoster(midia.poster_path, 'w342')

  if (!poster) return null

  return (
    <Link 
      to={`/detalhes/${tipo}/${midia.id}`} 
      className="card-midia"
      title={titulo}
    >
      <div className="card-midia__imagem">
        <img 
          src={poster} 
          alt={titulo}
          loading="lazy"
        />
      </div>
    </Link>
  )
}
