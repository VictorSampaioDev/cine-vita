import { useEffect, useState } from 'react'
import Carousel from './Carousel'
import { obterFilmesPorGenero } from '../api/tmdb'

export default function SecaoGenero({ genre }){
  const [filmes, setFilmes] = useState([])

  useEffect(()=>{
    let montado = true;
    obterFilmesPorGenero(genre.id).then(r => { 
      if(montado) {
        setFilmes(r.results.slice(0, 20)) 
      }
    }).catch(()=>{});
    
    return ()=> montado = false;
  },[genre])

  if (!filmes || filmes.length === 0) return null;

  return (
    <Carousel 
      titulo={genre.name} 
      dadosExternos={filmes} 
      tipo="movie" 
    />
  )
}