import { useEffect, useRef } from 'react'
import { SqCreature } from './Doodles.jsx'

export default function Footer() {
  const eyesRef = useRef(null)

  // the footer creature's eyes follow the pink dot around the page -
  // only while the footer is actually on screen, so scrolling elsewhere
  // never pays for the layout reads
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const eyes = eyesRef.current
    if (!eyes) return
    let visible = false
    let raf = null
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(eyes.closest('svg'))
    const onMove = (e) => {
      if (!visible || raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const box = eyes.getBoundingClientRect()
        const cx = box.left + box.width / 2
        const cy = box.top + box.height / 2
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx)
        const dx = Math.cos(angle) * 2.4
        const dy = Math.sin(angle) * 2.4
        eyes.style.transform = `translate(${dx}px, ${dy}px)`
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <SqCreature className="footer-creature" eyeRef={eyesRef} />
        <p className="footer-note">
          © {new Date().getFullYear()} Tomáš Matějček - I translate ideas into things.
        </p>
      </div>
    </footer>
  )
}
