import { useEffect, useState } from 'react'
import { obterPopulares } from '../api/tmdb'
import CartaoFilme from '../components/CartaoFilme'
import Pagination from '../components/Pagination'
import './filmes.css'

export default function Filmes(){
  const [filmes, setFilmes] = useState([])
  const [pagina, setPagina] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(()=>{
    let montado = true
    obterPopulares('movie', pagina).then(d=>{
      if(!montado) return
      setFilmes(d.results || [])
      setTotalPages(Math.min(d.total_pages || 1, 300))
    }).catch(()=>{})
    return ()=> montado = false
  },[pagina])

  return (
    <div>
      <div className="section-title"><h2>Filmes populares</h2></div>
      <div className="lista-filmes">
        {filmes.map(m=> <CartaoFilme key={m.id} movie={m} tipo="movie" />)}
      </div>

      <Pagination page={pagina} totalPages={totalPages} onChange={setPagina} />
    </div>
  )
}
