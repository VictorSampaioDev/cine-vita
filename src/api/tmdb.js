const BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE';

async function buscarJson(caminho, params = {}) {
  const url = new URL(BASE + caminho);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar TMDB');
  return res.json();
}

export async function obterGeneros() {
  const dados = await buscarJson('/genre/movie/list', { language: 'pt-BR' });
  return dados.genres || [];
}

export async function obterFilmesPorGenero(idGenero, pagina = 1) {
  const dados = await buscarJson('/discover/movie', { with_genres: idGenero, page: pagina, language: 'pt-BR' });
  return dados;
}

export async function obterEmAlta(tipo = 'movie', periodo = 'week') {
  const dados = await buscarJson(`/trending/${tipo}/${periodo}`, { language: 'pt-BR' });
  return dados.results || [];
}

export async function obterPopulares(tipo = 'movie', pagina = 1) {
  const caminho = tipo === 'tv' ? '/tv/popular' : '/movie/popular';
  const dados = await buscarJson(caminho, { page: pagina, language: 'pt-BR' });
  return dados;
}

export async function buscarFilmes(query, pagina = 1) {
  const dados = await buscarJson('/search/movie', { query, page: pagina, language: 'pt-BR' });
  return dados;
}

export function urlPoster(caminho, tamanho = 'w500') {
  return caminho ? `https://image.tmdb.org/t/p/${tamanho}${caminho}` : '';
}

export async function obterDetalhes(tipo = 'movie', id) {
  const dados = await buscarJson(`/${tipo}/${id}`, { language: 'pt-BR' });
  return dados;
}

export async function obterCreditos(tipo = 'movie', id) {
  const dados = await buscarJson(`/${tipo}/${id}/credits`, { language: 'pt-BR' });
  return dados;
}

export async function obterVideos(tipo = 'movie', id) {
  const dados = await buscarJson(`/${tipo}/${id}/videos`, { language: 'pt-BR' });
  return dados;
}

export default { obterGeneros, obterFilmesPorGenero, obterEmAlta, obterPopulares, buscarFilmes, urlPoster, obterDetalhes, obterCreditos, obterVideos };
