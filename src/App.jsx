import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Intake from './pages/Intake'
import Capture from './pages/Capture'
import Camera from './pages/Camera'
import Select from './pages/Select'
import Summary from './pages/Summary'

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Intake />} />
        <Route path="/result" element={<Capture />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/select" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
