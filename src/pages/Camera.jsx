import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavButton from '../components/NavButton'
import LoadingState from '../components/LoadingState'
import { analyzeImage, withMinimumDelay } from '../lib/api'

export default function Camera() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [captured, setCaptured] = useState('')

  useEffect(() => {
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => { streamRef.current = stream; videoRef.current.srcObject = stream })
      .catch(() => setError('Camera access was blocked. Please allow it or use gallery upload.'))
    return () => streamRef.current?.getTracks().forEach((track) => track.stop())
  }, [])

  function capture() {
    if (!videoRef.current?.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    const image = canvas.toDataURL('image/jpeg', 0.78)
    localStorage.setItem('skinstric-image', image)
    setCaptured(image)
    streamRef.current?.getTracks().forEach((track) => track.stop())
  }

  async function proceed() {
    const image = captured || localStorage.getItem('skinstric-image')
    if (!image || loading) return
    setLoading(true)
    setError('')
    try {
      await withMinimumDelay(analyzeImage(image))
      navigate('/select')
    } catch (err) {
      setError(err.message || 'Unable to analyze this image. Please retake it and try again.')
    } finally {
      setLoading(false)
    }
  }

  async function retry() {
    setCaptured(''); setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      await videoRef.current.play()
    } catch { setError('Camera access was blocked. Please allow it or use gallery upload.') }
  }

  return (
    <main className="camera-page">
      <video ref={videoRef} autoPlay playsInline muted aria-label="Camera preview" className={captured ? 'hidden' : ''} />
      {captured && <img className="captured-photo" src={captured} alt="Captured selfie" />}
      {!captured && <button className="shutter" type="button" onClick={capture} disabled={loading} aria-label="Take picture"><span /></button>}
      {!captured && <span className="take-picture-label">TAKE PICTURE</span>}
      <p className="shot-status">{captured ? 'GREAT SHOT!' : ''}</p>
      <div className="photo-tips"><span>TO GET BETTER RESULTS MAKE SURE TO HAVE</span><div>◇ NEUTRAL EXPRESSION　 ◇ FRONTAL POSE　 ◇ ADEQUATE LIGHTING</div></div>
      {captured && <div className="camera-actions"><button type="button" onClick={retry} disabled={loading}>RETAKE</button><button type="button" onClick={proceed} disabled={loading}>{loading ? 'ANALYZING...' : 'PROCEED'}</button></div>}
      {error && <p className="camera-error">{error}</p>}
      {loading && <LoadingState label="Preparing your analysis" />}
      <div className="bottom-nav light"><NavButton to="/result" direction="back" label="BACK" /></div>
    </main>
  )
}
