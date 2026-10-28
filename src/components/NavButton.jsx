import { Link } from 'react-router-dom'

export default function NavButton({ to, direction = 'next', label }) {
  const arrow = direction === 'back' ? '◀' : '▶'
  return (
    <Link to={to} className={`nav-button ${direction}`}>
      {direction === 'next' && <span>{label}</span>}
      <span className="nav-diamond"><span>{arrow}</span></span>
      {direction === 'back' && <span>{label}</span>}
    </Link>
  )
}
