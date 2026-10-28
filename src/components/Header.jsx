import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand-row">
        <Link to="/" className="brand">SKINSTRIC</Link>
        <span className="section-tag">[ INTRO ]</span>
      </div>
      <button className="code-button" type="button">ENTER CODE</button>
    </header>
  )
}
