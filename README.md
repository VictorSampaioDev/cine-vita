# CineVita

Catálogo de filmes e séries construído com React e Vite, consumindo a API do TMDB. Permite navegar por filmes, ver detalhes e gerenciar favoritos.

<div align="center">
<img width="1920" height="1079" alt="Image" src="https://github.com/user-attachments/assets/ddf1e41e-5f7e-4b08-a9f4-6566ed9ced9a" />
</div>

**Status:** Concluido

## Sobre o projeto

O CineVita é uma aplicação single-page (SPA) desenvolvida em React usando Vite como bundler. A aplicação consome a API do TMDB para exibir listas de filmes e séries, páginas de detalhe, e inclui uma funcionalidade de favoritos persistente durante a sessão.

Objetivos principais:
- Fornecer um catálogo interativo de filmes e séries
- Exibir detalhes de cada título (sinopse, gêneros, avaliação, etc.)
- Permitir adicionar/remoção de favoritos
- Navegação fluida com componentes reutilizáveis

## Principais recursos
- Listagem de filmes e séries
- Página de detalhes com informações enriquecidas
- Sistema de favoritos com Context API
- Carrossel responsivo com navegação por setas
- Paginação de resultados
- Seções organizadas por gêneros na página inicial
- Layout responsivo com suporte a múltiplos tamanhos de tela
- Estilos personalizados com CSS organizado por componentes

## Tecnologias utilizadas
- React (componentes funcionais e hooks)
- Vite (ferramenta de bundling e dev server)
- JavaScript (ES6+)
- CSS (arquivos por componente)
- Consumo de API externa (TMDB)

Ferramentas de desenvolvimento:
- Node.js e npm/yarn

## Requisitos
- Node.js (>= 14) instalado
- Chave de API do TMDB (gratuita, necessária para acessar os endpoints)

## Como configurar

1. Clone o repositório:

```bash
git clone <repositório> projeto-vita
cd projeto-vita
```

2. Instale dependências:

```bash
npm install
# ou
# yarn
```

3. Configure a chave da API do TMDB

Crie um arquivo `.env` na raiz do projeto com a variável abaixo (Vite exige prefixo `VITE_` para expor a variável ao código do cliente):

```
VITE_TMDB_API_KEY=Sua_Chave_TMDB_Aqui
```

Observação: se o projeto atualmente armazena a chave de outra forma, siga o padrão do arquivo `src/api/tmdb.js`.

## Scripts úteis

- `npm run dev` — Inicia o servidor de desenvolvimento (Vite)
- `npm run build` — Gera a versão de produção
- `npm run preview` — Serve a build de produção localmente

Exemplo:

```bash
npm run dev
```

## Estrutura do projeto (resumo)

- `src/` — código-fonte
  - `main.jsx` — ponto de entrada
  - `App.jsx` — componente raiz
  - `api/tmdb.js` — cliente para a API do TMDB
  - `components/` — componentes reutilizáveis (Carousel, MovieCard, Pagination, Header, etc.)
  - `pages/` — páginas da aplicação (Home, Filmes, Series, Detalhes, Favoritos)
  - `contexts/` — providers, ex: FavoritesContext
  - `styles/` — estilos globais

## Boas práticas e notas de implementação
- Mantenha a chave da API fora do controle de versão (use `.gitignore` para arquivos sensíveis)
- Componentize partes reutilizáveis (cards, listas, cabeçalho)
- Use `context` para estado global leve (favoritos, usuário)
- Prefira tratamentos de erro e loading nas requisições à API

