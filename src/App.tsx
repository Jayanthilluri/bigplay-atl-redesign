import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Parties from './pages/Parties'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parties" element={<Parties />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
