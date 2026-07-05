import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, SplitTitle } from './Reveal.jsx'
import { SqArrow, BrandAsterisk } from './Doodles.jsx'
import { PROJECTS } from '../data/projects.js'
import ProjectModal from './ProjectModal.jsx'

gsap.registerPlugin(ScrollTrigger)

/*
 * Selected work as an editorial index, animated by the scrollbar:
 * rows rise in as they enter, thumbnails drift in gentle parallax,
 * the whole list leans with your scroll velocity, and the CTA banner
 * scales up scrubbed to the scroll. Transforms and opacity only.
 */
function Row({ project, onOpen }) {
  const { index, category, title, blurb, cover, coverAlt } = project
  return (
    <li>
      <button
        type="button"
        className="work-row"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
      >
        <span className="work-num" aria-hidden="true">
          {index}
        </span>
        <span className="work-thumb">
          <img src={cover} alt={coverAlt} loading="lazy" decoding="async" />
        </span>
        <span className="work-row-text">
          <span className="work-row-title">{title}</span>
          <span className="work-row-meta">
            <strong>{category}</strong> - {blurb}
          </span>
        </span>
        <SqArrow className="work-row-arrow" inView={false} />
      </button>
    </li>
  )
}

export default function Work() {
  const [open, setOpen] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // rows rise in once, staggered by their own position
      gsap.utils.toArray('.work-list li').forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 48,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 94%', once: true },
        })
      })
      // thumbnails drift against the scroll while their row is on screen
      gsap.utils.toArray('.work-thumb').forEach((thumb) => {
        gsap.fromTo(
          thumb,
          { y: 12 },
          {
            y: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: thumb,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
      // the index leans with scroll velocity, then settles
      const lean = { skew: 0 }
      const setSkew = gsap.quickSetter('.work-list', 'skewY', 'deg')
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate(self) {
          const v = gsap.utils.clamp(-1.4, 1.4, self.getVelocity() / -400)
          if (Math.abs(v) > Math.abs(lean.skew)) {
            lean.skew = v
            gsap.to(lean, {
              skew: 0,
              duration: 0.9,
              ease: 'power3.out',
              overwrite: true,
              onUpdate: () => setSkew(lean.skew),
            })
          }
        },
      })
      // CTA banner scales up, scrubbed to the scrollbar
      gsap.fromTo(
        '.cta-banner',
        { y: 70, scale: 0.94, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cta-banner',
            start: 'top 100%',
            end: 'top 55%',
            scrub: true,
          },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="work container" id="work" ref={sectionRef}>
      <header className="section-head">
        <Reveal as="p" className="eyebrow">
          <BrandAsterisk className="eyebrow-asterisk eyebrow-asterisk--lead" />
          Selected work
        </Reveal>
        <SplitTitle className="section-title" text="Things, not just files." />
        <Reveal as="p" className="section-lead" delay={0.16}>
          Open a project for the full story.
        </Reveal>
      </header>

      <ul className="work-list">
        {PROJECTS.map((p) => (
          <Row key={p.id} project={p} onOpen={setOpen} />
        ))}
      </ul>

      <a className="cta-banner" href="#contact">
        <BrandAsterisk className="cta-asterisk" />
        <span className="cta-banner-text">
          <span className="eyebrow eyebrow--light">
            05
            <BrandAsterisk className="eyebrow-asterisk" />
            next
          </span>
          <span className="cta-banner-title">Your idea here.</span>
          <span className="cta-banner-link">
            Let's make it a thing
            <SqArrow className="cta-banner-arrow" inView={false} />
          </span>
        </span>
      </a>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
