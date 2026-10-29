import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Diamond from '../components/Diamond'
import NavButton from '../components/NavButton'
import LoadingState from '../components/LoadingState'
import { submitIdentity } from '../lib/api'

const lettersOnly = /^[a-zA-Z\s'-]+$/

export default function Intake() {
  const navigate = useNavigate()
  const [step, setStep] = useState('name')
  const [name, setName] = useState(localStorage.getItem('skinstric-name') || '')
  const [location, setLocation] = useState(localStorage.getItem('skinstric-location') || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    const value = step === 'name' ? name : location
    if (!value.trim() || !lettersOnly.test(value.trim())) {
      setError(`Please enter a valid ${step === 'name' ? 'name' : 'city'} using letters only.`)
      return
    }
    setError('')
    if (step === 'name') { localStorage.setItem('skinstric-name', name.trim()); setStep('location'); return }
    localStorage.setItem('skinstric-location', location.trim())
    setLoading(true)
    try { await submitIdentity(name.trim(), location.trim()); navigate('/result') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <main className="flow-page">
      <p className="eyebrow">TO START ANALYSIS</p>
      <Diamond className="intake-diamond">
        <form onSubmit={submit} className="intake-form">
          <span>CLICK TO TYPE</span>
          <input
            autoFocus
            aria-label={step === 'name' ? 'Your name' : 'Your city'}
            value={step === 'name' ? name : location}
            onChange={(event) => step === 'name' ? setName(event.target.value) : setLocation(event.target.value)}
            placeholder={step === 'name' ? 'Introduce Yourself' : 'your city name'}
          />
          {error && <p className="error-text">{error}</p>}
          <button className="sr-only" type="submit">Continue</button>
        </form>
      </Diamond>
      {loading && <LoadingState />}
      <div className="bottom-nav"><NavButton to="/" direction="back" label="BACK" /></div>
    </main>
  )
}
