export default function Diamond({ children, className = '', layers = true }) {
  return (
    <div className={`diamond-stage ${className}`}>
      {layers && <><span className="diamond-ring ring-one" /><span className="diamond-ring ring-two" /><span className="diamond-ring ring-three" /></>}
      <div className="diamond-content">{children}</div>
    </div>
  )
}
