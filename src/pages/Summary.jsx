import { useMemo, useState } from 'react'
import NavButton from '../components/NavButton'
import { readAnalysis } from '../lib/api'

const fallback = {
  race: { 'South Asian': .64, 'East Asian': .13, 'White': .09, 'Black': .06, 'Latino Hispanic': .05, 'Middle Eastern': .03 },
  age: { '20-29': .58, '30-39': .22, '10-19': .09, '40-49': .06, '50-59': .03, '60-69': .01, '70+': .01 },
  gender: { male: .71, female: .29 },
}

function normalize(source = fallback) {
  const pick = (obj) => Object.entries(obj || {}).map(([name, value]) => ({ name: name.replaceAll('_', ' '), confidence: Math.round(Number(value) * 100) })).sort((a, b) => b.confidence - a.confidence)
  return { race: pick(source.race), age: pick(source.age), gender: pick(source.gender) }
}

export default function Summary() {
  const options = useMemo(() => normalize(readAnalysis() || fallback), [])
  const initial = useMemo(() => ({ race: options.race[0], age: options.age[0], gender: options.gender[0] }), [options])
  const [category, setCategory] = useState('race')
  const [selected, setSelected] = useState(initial)
  const [confirmed, setConfirmed] = useState(false)
  const current = selected[category]
  return (
    <main className="summary-page">
      <p className="eyebrow">A.I. ANALYSIS</p>
      <h1>DEMOGRAPHICS</h1>
      <p>Predicted race &amp; age</p>
      <section className="demographics-layout">
        <div className="category-tabs">
          {['race', 'age', 'gender'].map((key) => <button className={category === key ? 'active' : ''} onClick={() => setCategory(key)} key={key}><strong>{selected[key].name}</strong><span>{key === 'gender' ? 'SEX' : key.toUpperCase()}</span></button>)}
        </div>
        <div className="confidence-panel">
          <strong>{current.name}{category === 'age' ? ' y.o.' : ''}</strong>
          <div key={`${category}-${current.name}`} className="progress-ring" style={{ '--score': `${current.confidence * 3.6}deg` }}><span>{current.confidence}<small>%</small></span></div>
          <p>If A.I. estimate is wrong, select the correct one.</p>
        </div>
        <div className="option-list">
          <header><span>{category === 'gender' ? 'SEX' : category.toUpperCase()}</span><span>A.I. CONFIDENCE</span></header>
          {options[category].map((option) => <button className={option.name === current.name ? 'active' : ''} onClick={() => setSelected((old) => ({ ...old, [category]: option }))} key={option.name}><span><i />{option.name}</span><span>{option.confidence}%</span></button>)}
        </div>
      </section>
      <div className="summary-actions"><button onClick={() => { setSelected(initial); setConfirmed(false) }}>RESET</button><button className="confirm" onClick={() => setConfirmed(true)}>{confirmed ? 'CONFIRMED' : 'CONFIRM'}</button></div>
      <div className="bottom-nav split"><NavButton to="/select" direction="back" label="BACK" /><NavButton to="/" label="HOME" /></div>
    </main>
  )
}
