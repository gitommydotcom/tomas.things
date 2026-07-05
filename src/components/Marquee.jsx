import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandAsterisk } from './Doodles.jsx'

gsap.registerPlugin(ScrollTrigger)

/*
 * One marquee moment: two ink-black bands crossing each other at
 * opposite angles, rolling opposite ways. Words in cream, pink and
 * azure, brand asterisks in between. Each band is a single infinite
 * transform tween; scroll velocity throws it forward or backward and
 * it eases back to cruise speed.
 */
function useVelocityLoop(trackRef, dir) {
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 30,
        repeat: -1,
      })
      tween.timeScale(dir)
      ScrollTrigger.create({
        onUpdate(self) {
          let v = gsap.utils.clamp(-5, 5, self.getVelocity() / 220)
          if (Math.abs(v) < 1) v = v < 0 ? -1 : 1
          gsap.to(tween, { timeScale: v * dir, duration: 0.6, overwrite: true })
        },
      })
    })
    return () => mm.revert()
  }, [trackRef, dir])
}

/* cream / pink / cream-outline / azure, then repeat */
const INKS = ['cream', 'pink', 'outline', 'azure']

function Band({ items, dir, variant }) {
  const trackRef = useRef(null)
  useVelocityLoop(trackRef, dir)

  // repeat the words so one chunk comfortably exceeds the viewport
  const words = Array.from({ length: 3 }, () => items).flat()
  const chunk = (key) => (
    <span className="marquee-chunk" key={key}>
      {words.map((word, i) => (
        <span className={`marquee-item marquee-item--${INKS[i % INKS.length]}`} key={i}>
          {word}
          <BrandAsterisk
            className={`marquee-ast ${i % 2 ? 'marquee-ast--azure' : ''}`}
          />
        </span>
      ))}
    </span>
  )

  return (
    <div className={`marquee-band marquee-band--${variant}`}>
      <div className="marquee-track" ref={trackRef}>
        {chunk(0)}
        {chunk(1)}
      </div>
    </div>
  )
}

export default function Marquee({ a, b }) {
  return (
    <section className="marquee" aria-hidden="true">
      <Band items={a} dir={1} variant="a" />
      <Band items={b} dir={-1} variant="b" />
    </section>
  )
}
