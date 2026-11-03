import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'
import Parties from './pages/Parties'
import Events from './pages/Events'
import Attractions from './pages/Attractions'
import Specials from './pages/Specials'
import Eat from './pages/Eat'
import Visit from './pages/Visit'
import NotFound from './pages/NotFound'
import { metaFor, SITE_URL } from './seo'

/* Keeps <title>, description and canonical in sync on client-side navigation.
   The prerendered HTML already carries the right tags for the first load. */
function RouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_URL + meta.path)
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/events" element={<Events />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/eat" element={<Eat />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
