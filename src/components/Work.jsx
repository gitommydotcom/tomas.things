import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal.jsx'
import { SqArrow, BrandAsterisk } from './Doodles.jsx'
import { PROJECTS } from '../data/projects.js'
import ProjectModal from './ProjectModal.jsx'

/*
 * Selected work as an editorial index: one row per project — number,
 * thumbnail, title, one-line meta, arrow. One light animation per row
 * (fade + rise), no per-line masking, no shared-layout morphs: clear
 * and cheap to scroll.
 */
function Row({ project, i, onOpen }) {
  const { index, category, title, blurb, cover, coverAlt } = project
  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 * (i % 2) }}
    >
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
            <strong>{category}</strong> — {blurb}
          </span>
        </span>
        <SqArrow className="work-row-arrow" inView={false} />
      </button>
    </motion.li>
  )
}

export default function Work() {
  const [open, setOpen] = useState(null)

  return (
    <section className="work container" id="work">
      <header className="section-head">
        <Reveal as="p" className="eyebrow">
          <BrandAsterisk className="eyebrow-asterisk eyebrow-asterisk--lead" />
          Selected work
        </Reveal>
        <Reveal as="h2" className="section-title" delay={0.08}>
          Things, not just files.
        </Reveal>
        <Reveal as="p" className="section-lead" delay={0.16}>
          Open a project for the full story.
        </Reveal>
      </header>

      <ul className="work-list">
        {PROJECTS.map((p, i) => (
          <Row key={p.id} project={p} i={i} onOpen={setOpen} />
        ))}
      </ul>

      <motion.a
        className="cta-banner"
        href="#contact"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-6% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
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
      </motion.a>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
