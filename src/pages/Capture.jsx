import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Diamond from '../components/Diamond'
import NavButton from '../components/NavButton'
import LoadingState from '../components/LoadingState'
import { analyzeImage } from '../lib/api'
import { fileToDataUrl } from '../lib/image'

export default function Capture() {
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cameraPrompt, setCameraPrompt] = useState(false)

  async function upload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setLoading(true); setError('')
    try {
      const dataUrl = await fileToDataUrl(file)
      setPreview(dataUrl)
      localStorage.setItem('skinstric-image', dataUrl)
      await analyzeImage(dataUrl)
      navigate('/select')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <main className="capture-page">
      <p className="eyebrow">TO START ANALYSIS</p>
      <section className="capture-grid">
        <Diamond className="capture-option">
          <button className="capture-trigger" onClick={() => setCameraPrompt(true)}>
            <span className="icon camera-icon" aria-hidden="true" />
            <strong>ALLOW A.I.<br />TO SCAN YOUR FACE</strong>
          </button>
        </Diamond>
        <Diamond className="capture-option">
          <button className="capture-trigger" onClick={() => inputRef.current?.click()} disabled={loading}>
            <span className="icon gallery-icon" aria-hidden="true" />
            <strong>{loading ? 'PREPARING YOUR ANALYSIS...' : <>ALLOW A.I.<br />ACCESS GALLERY</>}</strong>
          </button>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={upload} />
        </Diamond>
      </section>
      <aside className="preview-box"><span>Preview</span><div>{preview && <img src={preview} alt="Selected preview" />}</div></aside>
      {error && <p className="page-error">{error}</p>}
      {cameraPrompt && <div className="modal-backdrop">
        <div className="camera-modal" role="dialog" aria-modal="true" aria-label="Camera permission">
          <strong>ALLOW A.I. TO ACCESS YOUR CAMERA</strong>
          <div><button onClick={() => setCameraPrompt(false)}>DENY</button><button onClick={() => navigate('/camera')}>ALLOW</button></div>
        </div>
      </div>}
      {loading && <LoadingState label="Preparing your analysis" />}
      <div className="bottom-nav"><NavButton to="/testing" direction="back" label="BACK" /></div>
    </main>
  )
}
