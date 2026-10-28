export const PHASE_ONE_URL = 'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne'
export const PHASE_TWO_URL = 'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo'

export async function submitIdentity(name, location) {
  const response = await fetch(PHASE_ONE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, location }),
  })
  if (!response.ok) throw new Error('Unable to save your details.')
  return response.json()
}

export async function analyzeImage(image) {
  const response = await fetch(PHASE_TWO_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: image.includes(',') ? image.split(',')[1] : image }),
  })
  if (!response.ok) throw new Error('Unable to analyze this image.')
  const payload = await response.json()
  localStorage.setItem('skinstric-analysis', JSON.stringify(payload.data ?? payload))
  return payload
}

export function readAnalysis() {
  try { return JSON.parse(localStorage.getItem('skinstric-analysis')) } catch { return null }
}
