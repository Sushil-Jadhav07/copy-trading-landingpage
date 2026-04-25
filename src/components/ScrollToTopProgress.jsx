import { useEffect, useMemo, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const SIZE = 52
const STROKE = 4
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ScrollToTopProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      if (scrollable <= 0) {
        setProgress(0)
        return
      }
      const next = Math.min((window.scrollY / scrollable) * 100, 100)
      setProgress(next)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const dashOffset = useMemo(
    () => CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE,
    [progress]
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full border border-border bg-dark/80 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 ${
        progress > 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-1.5 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)] -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#00C896"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <span className="relative flex h-full w-full items-center justify-center text-white">
        <ArrowUp size={20} />
      </span>
    </button>
  )
}
