import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SqCreature } from './Doodles.jsx'

/* the body line sways between two squiggles - same stroke, clearly
   different bends, so the little one never sits still */
const BODY_A = 'M8 58 C 18 22, 46 24, 54 48 C 61 68, 88 66, 97 42 C 100 34, 104 28, 112 26'
const BODY_B = 'M10 62 C 24 34, 42 10, 55 38 C 66 74, 84 56, 95 38 C 98 29, 106 27, 113 21'

export default function Footer() {
  const eyesRef = useRef(null)

  // the footer creature's eyes follow the pink dot around the page -
  // only while the footer is actually on screen, so scrolling elsewhere
  // never pays for the layout reads. The body sway is gated the same
  // way: the tween only plays while the footer is visible.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const eyes = eyesRef.current
    if (!eyes) return
    const svg = eyes.closest('svg')
    const body = svg.querySelector('.creature-body')
    const sway = gsap.fromTo(
      body,
      { attr: { d: BODY_A } },
      {
        attr: { d: BODY_B },
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        paused: true,
      },
    )
    let visible = false
    let raf = null
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) sway.play()
      else sway.pause()
    })
    io.observe(svg)
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
      sway.kill()
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
