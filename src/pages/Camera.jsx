import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavButton from '../components/NavButton'
import { analyzeImage } from '../lib/api'

export default function Camera() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => { streamRef.current = stream; videoRef.current.srcObject = stream })
      .catch(() => setError('Camera access was blocked. Please allow it or use gallery upload.'))
    return () => streamRef.current?.getTracks().forEach((track) => track.stop())
  }, [])

  async function capture() {
    if (!videoRef.current?.videoWidth) return
    setLoading(true)
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    const image = canvas.toDataURL('image/jpeg', 0.78)
    localStorage.setItem('skinstric-image', image)
    try { await analyzeImage(image); navigate('/select') }
    catch (err) { setError(err.message); setLoading(false) }
  }

  return (
    <main className="camera-page">
      <video ref={videoRef} autoPlay playsInline muted aria-label="Camera preview" />
      <div className="camera-overlay"><span className="face-guide" /></div>
      <button className="shutter" type="button" onClick={capture} disabled={loading} aria-label="Take picture"><span /></button>
      <p className="camera-help">{loading ? 'ANALYZING...' : 'CENTER YOUR FACE AND TAKE A PICTURE'}</p>
      {error && <p className="camera-error">{error}</p>}
      <div className="bottom-nav light"><NavButton to="/result" direction="back" label="BACK" /></div>
    </main>
  )
}
