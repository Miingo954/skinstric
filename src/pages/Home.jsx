import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="home-page">
      <div className="edge-diamond left-edge" aria-hidden="true" />
      <Link className="discover-link" to="/testing">
        <span className="mini-diamond"><span>◀</span></span>
        <span>DISCOVER A.I.</span>
      </Link>
      <section className="hero-copy">
        <h1>Sophisticated<br />skincare</h1>
        <p>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</p>
      </section>
      <Link className="experience-link" to="/testing">
        <span>ENTER EXPERIENCE</span>
        <span className="mini-diamond"><span>▶</span></span>
      </Link>
      <div className="edge-diamond right-edge" aria-hidden="true" />
    </main>
  )
}
