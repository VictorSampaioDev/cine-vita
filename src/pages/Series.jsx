
import { useEffect, useState } from 'react'
import { obterPopulares } from '../api/tmdb'
import CartaoFilme from '../components/CartaoFilme'
import Pagination from '../components/Pagination'
import './series.css'

export default function Series(){
  const [itens, setItens] = useState([])
  const [pagina, setPagina] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(()=>{
    let montado = true
    obterPopulares('tv', pagina).then(d=>{
      if(!montado) return
      setItens(d.results || [])
      setTotalPages(Math.min(d.total_pages || 1, 300))
    }).catch(()=>{})
    return ()=> montado = false
  },[pagina])

  return (
    <div>
      <div className="section-title"><h2>Séries populares</h2></div>
      <div className="lista-series">
        {itens.map(m=> <CartaoFilme key={m.id} movie={m} tipo="tv" />)}
      </div>

      <Pagination page={pagina} totalPages={totalPages} onChange={setPagina} />
    </div>
  )
}
