import { useEffect, useRef, useState, useCallback } from 'react'
import CardMidia from './CardMidia'
import { obterEmAlta } from '../api/tmdb'
import './Carrossel.css'

export default function Carousel({ titulo = 'Em Alta', tipo = 'movie', dadosExternos = null }){
  const [midia, setMidia] = useState([])
  const containerRef = useRef(null)
  const listaRef = useRef(null)
  const [mostrarSetas, setMostrarSetas] = useState(false)
  const [temScroll, setTemScroll] = useState(false)
  const [posicaoScroll, setPosicaoScroll] = useState(0)

  useEffect(() => {
    if (dadosExternos) {
      setMidia(dadosExternos)
    } 
    else {
      obterEmAlta(tipo).then(d => {
        setMidia(Array.isArray(d) ? d.slice(0, 30) : d.results?.slice(0, 30) || [])
      }).catch(()=>{})
    }
  }, [tipo, dadosExternos])

  useEffect(() => {
    const verificarScroll = () => {
      if (listaRef.current) {
        const temConteudoParaScroll = 
          listaRef.current.scrollWidth > listaRef.current.clientWidth
        setTemScroll(temConteudoParaScroll)
      }
    }
    setTimeout(verificarScroll, 100)
    window.addEventListener('resize', verificarScroll)
    return () => window.removeEventListener('resize', verificarScroll)
  }, [midia])

  const handleScroll = useCallback(() => {
    if (listaRef.current) {
      setPosicaoScroll(listaRef.current.scrollLeft)
    }
  }, [])

  useEffect(() => {
    const lista = listaRef.current
    if (!lista) return
    lista.addEventListener('scroll', handleScroll)
    return () => lista.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const calcularScrollPorBloco = useCallback(() => {
    if (!listaRef.current) return 0
    const itemsParaAvançar = 4
    const cardWidth = 220
    const gap = 8
    return (cardWidth + gap) * itemsParaAvançar
  }, [])

  const navegar = useCallback((direcao) => {
    if (!listaRef.current) return
    const scrollAmount = calcularScrollPorBloco()
    
    if (direcao === 'esquerda') {
      listaRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      listaRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
    
    setTimeout(() => {
      if (listaRef.current) {
        setPosicaoScroll(listaRef.current.scrollLeft)
      }
    }, 100)
  }, [calcularScrollPorBloco])
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(document.activeElement)) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); navegar('esquerda') } 
      else if (e.key === 'ArrowRight') { e.preventDefault(); navegar('direita') }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navegar])

  if (!midia || midia.length === 0) return null

  const podeScrollarDireita = listaRef.current && 
    listaRef.current.scrollLeft + listaRef.current.clientWidth >= 
    listaRef.current.scrollWidth - 10

  return (
    <section className="carrossel-wrapper">
      <div className="carrossel-titulo">
        <h2>{titulo}</h2>
      </div>

      <div 
        className="carrossel-container"
        ref={containerRef}
        onMouseEnter={() => setMostrarSetas(true)}
        onMouseLeave={() => setMostrarSetas(false)}
      >
        {temScroll && (
          <button
            className={`carrossel-seta carrossel-seta--esquerda ${mostrarSetas ? 'ativo' : ''} ${posicaoScroll <= 0 ? 'desabilitada' : ''}`}
            onClick={() => navegar('esquerda')}
            aria-label="Anterior"
            disabled={posicaoScroll <= 0}
          >
            ‹
          </button>
        )}

        <div className="carrossel-lista" ref={listaRef} tabIndex={0}>
          {midia.map((item) => {
            const tipoItem = item.media_type || tipo
            return (
              <CardMidia key={item.id} midia={item} tipo={tipoItem} />
            )
          })}
        </div>

        {temScroll && (
          <button
            className={`carrossel-seta carrossel-seta--direita ${mostrarSetas ? 'ativo' : ''} ${podeScrollarDireita ? 'desabilitada' : ''}`}
            onClick={() => navegar('direita')}
            aria-label="Próximo"
            disabled={podeScrollarDireita}
          >
            ›
          </button>
        )}
      </div>
    </section>
  )
}