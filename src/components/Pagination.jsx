import './pagination.css'

export default function Pagination({ page = 1, totalPages = 1, onChange = () => {} }){
  const maxAllowed = Math.min(totalPages || 1, 300)
  const pages = []

  if (maxAllowed <= 7) {
    for (let i = 1; i <= maxAllowed; i++) pages.push(i)
  } else {
    if (page <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(maxAllowed)
    } else if (page >= maxAllowed - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = maxAllowed - 4; i <= maxAllowed; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      pages.push(page - 1)
      pages.push(page)
      pages.push(page + 1)
      pages.push('...')
      pages.push(maxAllowed)
    }
  }

  function go(p){
    if (p === '...') return
    const target = Math.max(1, Math.min(maxAllowed, p))
    if (target !== page) onChange(target)
  }

  return (
    <div className="pagination-wrap">
      <div className="pagination">
        <button className="chev" onClick={()=>onChange(1)} disabled={page===1} aria-label="primeira">««</button>
        <button className="chev" onClick={()=>onChange(page-1)} disabled={page===1} aria-label="anterior">‹</button>

        {pages.map((p, idx) => (
          p === '...'
            ? <span key={"el"+idx} className="ellipsis">…</span>
            : (
              <button
                key={p}
                className={"page-btn" + (p===page ? ' active' : '')}
                onClick={()=>go(p)}
                aria-current={p===page ? 'page' : undefined}
              >{p}</button>
            )
        ))}

        <button className="chev" onClick={()=>onChange(page+1)} disabled={page===maxAllowed} aria-label="próxima">›</button>
        <button className="chev" onClick={()=>onChange(maxAllowed)} disabled={page===maxAllowed} aria-label="última">»»</button>
      </div>
    </div>
  )
}
