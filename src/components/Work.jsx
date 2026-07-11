import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, SplitTitle } from './Reveal.jsx'
import { SqArrow, BrandAsterisk, WaveCreature } from './Doodles.jsx'
import { localizeProjects } from '../data/projects.js'
import { useLang, useUI } from '../i18n/LangContext.jsx'
import ProjectModal from './ProjectModal.jsx'

gsap.registerPlugin(ScrollTrigger)

/*
 * Selected work as a typographic index: each project is a compact row -
 * name, type, tools, category - with no thumbnail and no numbering. Rows
 * rise in as they enter and underline on hover; opening one reveals the
 * full story (a lead image, the text, then the rest of the images). The
 * CTA banner scales up scrubbed to the scroll. Movement only - nothing
 * fades.
 */
function Row({ project, categoryLabel, onOpen }) {
  const { category, title, tools, cover, coverAlt } = project
  return (
    <li>
      <button
        type="button"
        className="work-row"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
      >
        <span className="work-row-thumb">
          <img src={cover} alt={coverAlt} loading="lazy" decoding="async" />
        </span>
        <span className="work-row-name">{title}</span>
        {/* display:contents on desktop - these flow into the row's columns;
            on phones the wrapper collapses them onto one meta line */}
        <span className="work-row-meta">
          <span className="work-row-type">{category}</span>
          <span className="work-row-tools">{tools.join(' · ')}</span>
          <span className="work-row-cat">{categoryLabel}</span>
        </span>
        <SqArrow className="work-row-arrow" inView={false} />
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
      // rows glide up into place as they enter - movement only, no fade
      gsap.utils.toArray('.work-row').forEach((row) => {
        gsap.from(row, {
          y: 30,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 96%', once: true },
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

      <ul className="work-list">
        {projects.map((p) => (
          <Row
            key={p.id}
            project={p}
            categoryLabel={ui.work.groups[p.group]}
            onOpen={setOpen}
          />
        ))}
      </ul>

      <a className="cta-banner" href="#contact">
        <BrandAsterisk className="cta-asterisk" />
        <span className="cta-banner-text">
          <span className="eyebrow eyebrow--light">
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
