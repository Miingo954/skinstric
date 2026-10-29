export default function LoadingState({ label = 'Processing submission' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-label={label}>
      <span className="loading-diamond loading-diamond-large" aria-hidden="true" />
      <span className="loading-diamond loading-diamond-medium" aria-hidden="true" />
      <span className="loading-diamond loading-diamond-small" aria-hidden="true" />
      <div className="loading-message">
        <span>{label}</span>
        <span className="loading-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>
    </div>
  )
}
