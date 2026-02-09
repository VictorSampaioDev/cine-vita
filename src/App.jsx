import { Routes, Route } from 'react-router-dom'
import Cabecalho from './components/Cabecalho'
import Home from './pages/Home'
import Filmes from './pages/Filmes'
import Series from './pages/Series'
import Favoritos from './pages/Favoritos'
import Detalhes from './pages/Detalhes'

function App() {
  return (
    <div id="app-root">
      <Cabecalho />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Filmes />} />
          <Route path="/series" element={<Series />} />
          <Route path="/favorites" element={<Favoritos />} />
          <Route path="/detalhes/:tipo/:id" element={<Detalhes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
