import { Link } from 'react-router-dom'
import NavButton from '../components/NavButton'

const cards = [
  { label: 'Demographics', to: '/summary', active: true },
  { label: 'Cosmetic Concerns' },
  { label: 'Skin Type Details' },
  { label: 'Weather' },
]

export default function Select() {
  return (
    <main className="analysis-page">
      <p className="eyebrow">A.I. ANALYSIS</p>
      <h1>A.I. has estimated the following.</h1>
      <p>Fix estimated information if needed.</p>
      <div className="analysis-menu-wrap">
        <span className="menu-ring ring-a" /><span className="menu-ring ring-b" /><span className="menu-ring ring-c" />
        <div className="analysis-diamond-grid">
          {cards.map((card, index) => card.active ? (
            <Link className={`analysis-card card-${index}`} key={card.label} to={card.to}><span>{card.label}</span></Link>
          ) : <button className={`analysis-card card-${index} disabled`} key={card.label}><span>{card.label}</span></button>)}
        </div>
      </div>
      <div className="bottom-nav split"><NavButton to="/result" direction="back" label="BACK" /><NavButton to="/summary" label="GET SUMMARY" /></div>
    </main>
  )
}
