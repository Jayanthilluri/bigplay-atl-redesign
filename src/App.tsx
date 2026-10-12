import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Parties from './pages/Parties'
import Attractions from './pages/Attractions'
import Specials from './pages/Specials'
import Eat from './pages/Eat'
import Visit from './pages/Visit'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parties" element={<Parties />} />
      <Route path="/attractions" element={<Attractions />} />
      <Route path="/specials" element={<Specials />} />
      <Route path="/eat" element={<Eat />} />
      <Route path="/visit" element={<Visit />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
