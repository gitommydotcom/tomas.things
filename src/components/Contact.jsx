import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal.jsx'
import { BrandAsterisk, SqCreature } from './Doodles.jsx'

export default function Contact() {
  const eyesRef = useRef(null)

  // Viky sits in the corner and watches the pink dot while you decide
  // to write. The eyes only chase the pointer while the section is on
  // screen, so scrolling elsewhere never pays for the layout reads.
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
    <section className="contact container" id="contact">
      <Reveal as="p" className="eyebrow contact-eyebrow">
        <BrandAsterisk className="eyebrow-asterisk eyebrow-asterisk--lead" />
        Contact
      </Reveal>
      <h2 className="contact-title">
        <Reveal as="span" className="contact-line" delay={0.08}>
          Let's make
        </Reveal>
        <Reveal as="span" className="contact-line" delay={0.2}>
          a <em className="contact-thing">thing</em>
          <motion.span
            className="contact-asterisk"
            initial={{ scale: 0, rotate: -120 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          >
            <BrandAsterisk className="contact-asterisk-mark" />
          </motion.span>
        </Reveal>
      </h2>

      <motion.div
        className="contact-actions"
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
      >
        <a className="contact-button" href="mailto:tomas.mtj@gmail.com">
          tomas.mtj@gmail.com
        </a>
        <a className="contact-alt" href="tel:+393493569260">
          +39 349 356 9260
        </a>
        <span className="contact-langs">EN&ensp;·&ensp;IT&ensp;·&ensp;CZ</span>
      </motion.div>

      <SqCreature className="contact-creature" eyeRef={eyesRef} />
    </section>
  )
}
