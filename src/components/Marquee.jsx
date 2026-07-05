import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandAsterisk } from './Doodles.jsx'

gsap.registerPlugin(ScrollTrigger)

/*
 * Full-bleed marquee band that reacts to scrolling: it always drifts,
 * but scroll velocity throws it forward (or backwards, when you scroll
 * up) and it eases back to its cruise speed. One infinite transform
 * tween per band - nothing here touches layout.
 */
export default function Marquee({ items, flip = false }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 30,
        repeat: -1,
      })
      const dir = flip ? -1 : 1
      if (flip) tween.timeScale(-1)
      ScrollTrigger.create({
        onUpdate(self) {
          let v = gsap.utils.clamp(-5, 5, self.getVelocity() / 220)
          if (Math.abs(v) < 1) v = v < 0 ? -1 : 1
          gsap.to(tween, { timeScale: v * dir, duration: 0.6, overwrite: true })
        },
      })
    })
    return () => mm.revert()
  }, [flip])

  const chunk = (key) => (
    <span className="marquee-chunk" key={key}>
      {items.map((item, i) => (
        <span
          className={`marquee-item ${i % 2 ? 'marquee-item--outline' : ''}`}
          key={i}
        >
          {item}
          <BrandAsterisk className="marquee-ast" />
        </span>
      ))}
    </span>
  )

  return (
    <div className={`marquee ${flip ? 'marquee--tilt' : ''}`} aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {chunk(0)}
        {chunk(1)}
      </div>
    </div>
  )
}
