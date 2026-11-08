import { useCallback, useEffect, useRef, useState } from 'react'
import { photo, ArrowIcon } from '../chrome'

type Slide = { src: string; alt: string }

/* Horizontal photo slider: scroll-snap track (swipe on touch), prev/next buttons,
   mouse drag on desktop, arrow keys when focused, and a progress bar. */
export default function PhotoSlider({ slides, label }: { slides: Slide[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [progress, setProgress] = useState(0)
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= max - 4)
    setProgress(max > 0 ? el.scrollLeft / max : 1)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const step = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !track.current) return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
    track.current.style.scrollSnapType = 'none'
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d || !track.current) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 3) d.moved = true
    track.current.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    if (!drag.current || !track.current) return
    track.current.style.scrollSnapType = ''
    drag.current = null
  }

  return (
    <div className="relative">
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${label} — use the arrow buttons or keys to browse`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => { if (drag.current?.moved) e.preventDefault() }}
        className="slider-track flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-px-5 sm:scroll-px-8 px-5 sm:px-8 pb-2 cursor-grab active:cursor-grabbing select-none"
      >
        {slides.map((g) => (
          <img
            key={g.src}
            {...photo(g.src, '600px')}
            alt={g.alt}
            loading="lazy"
            draggable={false}
            className="h-64 sm:h-80 md:h-96 w-auto shrink-0 snap-start border border-white/10 object-cover"
          />
        ))}
      </div>

      <div className="mt-5 px-5 sm:px-8 max-w-6xl mx-auto flex items-center gap-4">
        <div className="flex-1 h-[3px] bg-white/15 overflow-hidden" aria-hidden="true">
          <div className="h-full bg-[#42b23c] transition-[width] duration-200" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous photos"
          className="w-11 h-11 flex items-center justify-center border border-white/30 text-white hover:border-[#42b23c] hover:text-[#42b23c] disabled:opacity-30 disabled:hover:border-white/30 disabled:hover:text-white transition-colors"
        >
          <ArrowIcon className="w-4 h-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next photos"
          className="w-11 h-11 flex items-center justify-center bg-[#42b23c] text-black hover:bg-white disabled:opacity-30 disabled:hover:bg-[#42b23c] transition-colors"
        >
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
