import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, SplitTitle } from './Reveal.jsx'
import { SqArrow, BrandAsterisk, WaveCreature } from './Doodles.jsx'
import { localizeProjects, GROUPS } from '../data/projects.js'
import { useLang, useUI } from '../i18n/LangContext.jsx'
import ProjectModal from './ProjectModal.jsx'

gsap.registerPlugin(ScrollTrigger)

/*
 * Selected work, grouped into macro categories: each project is an
 * image-forward card in a two-column grid. Cards rise in as they enter
 * and lift on hover; the CTA banner scales up scrubbed to the scroll.
 * Movement only - nothing fades.
 */
function Card({ project, onOpen }) {
  const { index, category, title, blurb, cover, coverAlt } = project
  return (
    <li>
      <button
        type="button"
        className="work-card"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
      >
        <span className="work-card-media">
          <img src={cover} alt={coverAlt} loading="lazy" decoding="async" />
          <span className="work-card-num" aria-hidden="true">
            {index}
          </span>
        </span>
        <span className="work-card-body">
          <span className="work-card-top">
            <span className="work-tag">{category}</span>
            <SqArrow className="work-card-arrow" inView={false} />
          </span>
          <span className="work-card-title">{title}</span>
          <span className="work-card-blurb">{blurb}</span>
        </span>
      </button>
    </li>
  )
}

export default function Work() {
  const { lang } = useLang()
  const ui = useUI()
  const projects = useMemo(() => localizeProjects(lang), [lang])
  const [open, setOpen] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // cards glide up into place as they enter - movement only, no fade
      gsap.utils.toArray('.work-card').forEach((card) => {
        gsap.from(card, {
          y: 48,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 94%', once: true },
        })
      })
      // the category headers rise in just ahead of their cards
      gsap.utils.toArray('.work-group').forEach((head) => {
        gsap.from(head, {
          y: 22,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: head, start: 'top 95%', once: true },
        })
      })
      // CTA banner rises and scales up, scrubbed to the scrollbar
      gsap.fromTo(
        '.cta-banner',
        { y: 90, scale: 0.92 },
        {
          y: 0,
          scale: 1,
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
          {ui.work.eyebrow}
        </Reveal>
        {/* Elvis greets first, waving beside the first title */}
        <div className="work-title-row">
          <SplitTitle key={lang} className="section-title" text={ui.work.title} />
          <WaveCreature className="work-creature" />
        </div>
        <Reveal as="p" className="section-lead" delay={0.16}>
          {ui.work.lead}
        </Reveal>
      </header>

      <div className="work-groups">
        {GROUPS.map((g) => (
          <section className="work-group-sec" key={g.id}>
            <h3 className="work-group">
              <span className="work-group-label">
                <BrandAsterisk className="work-group-ast" />
                {ui.work.groups[g.id]}
              </span>
            </h3>
            <ul className="work-grid">
              {projects.filter((p) => p.group === g.id).map((p) => (
                <Card key={p.id} project={p} onOpen={setOpen} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <a className="cta-banner" href="#contact">
        <BrandAsterisk className="cta-asterisk" />
        <span className="cta-banner-text">
          <span className="eyebrow eyebrow--light">
            09
            <BrandAsterisk className="eyebrow-asterisk" />
            {ui.work.ctaNext}
          </span>
          <span className="cta-banner-title">{ui.work.ctaTitle}</span>
          <span className="cta-banner-link">
            {ui.work.ctaLink}
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
