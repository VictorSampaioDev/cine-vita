import { useEffect, useState } from 'react'
import { obterGeneros } from '../api/tmdb'
import SecaoGenero from '../components/SecaoGenero'
import Carrossel from '../components/Carrossel'
import './home.css'

export default function Home(){
  const [generos, setGeneros] = useState([])

  useEffect(()=>{
    obterGeneros().then(setGeneros).catch(()=>{});
  },[])

  return (
    <div className="pagina-home">
      <Carrossel titulo="Em Alta" tipo="movie" />
      <div className="conteudo-central">
        {generos.map(g=> <SecaoGenero key={g.id} genre={g} />)}
      </div>
    </div>
  )
}
