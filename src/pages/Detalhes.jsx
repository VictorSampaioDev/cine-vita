import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { obterDetalhes, obterCreditos, obterVideos, urlPoster } from '../api/tmdb'
import './detalhes.css'

export default function Detalhes(){
  const { tipo, id } = useParams()
  const [dados, setDados] = useState(null)
  const [creditos, setCreditos] = useState(null)
  const [videos, setVideos] = useState(null)

  useEffect(()=>{
    if(!id) return;
    obterDetalhes(tipo, id).then(setDados).catch(()=>{});
    obterCreditos(tipo, id).then(setCreditos).catch(()=>{});
    obterVideos(tipo, id).then(setVideos).catch(()=>{});
  },[tipo,id])

  if(!dados) return <div style={{padding:20,color:'var(--muted)'}}>Carregando...</div>

  const titulo = dados.title || dados.name
  const ano = (dados.release_date || dados.first_air_date || '').slice(0,4)
  const generos = (dados.genres || []).map(g=>g.name).join(', ')
  const elenco = (creditos?.cast || []).slice(0,6)
  const trailer = (videos?.results || []).find(v => v.site === 'YouTube' && v.type === 'Trailer') || (videos?.results || []).find(v => v.site === 'YouTube')

  return (
    <div className="detalhes-root">
      <div className="bg" style={{backgroundImage:`url(${urlPoster(dados.backdrop_path,'w780')})`}} />
      <div className="detalhes-conteudo">
        <div className="poster">
          <img src={urlPoster(dados.poster_path,'w500')} alt={titulo} />
        </div>
        <div className="info">
          <h1>{titulo} <span className="ano">{ano}</span></h1>
          <div className="meta-line">{generos} • {dados.runtime ? dados.runtime + ' min' : (dados.episode_run_time?.[0] ? dados.episode_run_time[0] + ' min/ep' : '')}</div>
          <p className="sinopse">{dados.overview}</p>
          <div className="elenco">
            <h4>Elenco</h4>
            <div className="actores">
              {elenco.map(a=> (
                <div key={a.cast_id || a.credit_id} className="actor">
                  <img src={urlPoster(a.profile_path,'w154')} alt={a.name} />
                  <div className="actor-name">{a.name}</div>
                  <div className="actor-role">{a.character}</div>
                </div>
              ))}
            </div>
          </div>
          {trailer && (
            <div className="trailer-container">
              <div className="trailer">
                <iframe src={`https://www.youtube.com/embed/${trailer.key}`} title="Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
