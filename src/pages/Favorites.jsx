import { useFavoritos } from '../contexts/FavoritosContexto'
import CartaoFilme from '../components/CartaoFilme'
import './favoritos.css'

export default function Favoritos(){
  const { favoritos } = useFavoritos();

  return (
    <div>
      <div className="section-title"><h2>Meus Favoritos</h2></div>
      {favoritos.length === 0 ? <p className="mensagem-vazia">Nenhum favorito ainda.</p> : (
        <div className="lista-favoritos">
          {favoritos.map(m=> <CartaoFilme key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  )
}
