import { createContext, useContext, useEffect, useState } from 'react';

const FavoritosContexto = createContext();

export function ProvedorFavoritos({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const raw = localStorage.getItem('favoritos');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  function alternarFavorito(filme) {
    setFavoritos((anterior) => {
      const existe = anterior.find((m) => m.id === filme.id);
      if (existe) return anterior.filter((m) => m.id !== filme.id);
      return [filme, ...anterior];
    });
  }

  return (
    <FavoritosContexto.Provider value={{ favoritos, alternarFavorito }}>
      {children}
    </FavoritosContexto.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContexto);
}
