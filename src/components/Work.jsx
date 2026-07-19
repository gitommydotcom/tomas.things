import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, SplitTitle } from './Reveal.jsx'
import { SqArrow, BrandAsterisk, WaveCreature } from './Doodles.jsx'
import { localizeProjects, GROUPS } from '../data/projects.js'
import { useLang, useUI } from '../i18n/LangContext.jsx'
import Pic from './Pic.jsx'

// loaded on demand: the first paint of the page never pays for the modal
const ProjectModal = lazy(() => import('./ProjectModal.jsx'))

/* deep-link helpers: every case study lives at #p/<id>, so it can be
   sent to a client and the browser back button closes it */
const hashId = () => {
  const m = window.location.hash.match(/^#p\/(.+)$/)
  return m ? m[1] : null
}

gsap.registerPlugin(ScrollTrigger)

/*
 * Selected work, grouped into macro categories: each project is an
 * image-forward card - a big cover, then the type, title and the skills
 * used. No numbering. Cards rise in as they enter and lift on hover;
 * opening one reveals the full story (a lead image, the text, then the
 * rest of the images). Movement only - nothing fades.
 */
function Card({ project, onOpen, personalLabel }) {
  const { category, title, blurb, tools, cover, coverAlt, personal } = project
  return (
    <li>
      <button
        type="button"
        className="work-card"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
      >
        <span className="work-card-media">
          <Pic src={cover} alt={coverAlt} sizes="(max-width: 720px) 100vw, 590px" />
        </span>
        <span className="work-card-body">
          <span className="work-card-top">
            <span className="work-card-tags">
              <span className="work-tag">{category}</span>
              {/* transparency beats ambiguity: self-initiated work says so */}
              {personal && <span className="work-tag work-tag--personal">{personalLabel}</span>}
            </span>
            <SqArrow className="work-card-arrow" inView={false} />
          </span>
          <span className="work-card-title">{title}</span>
          <span className="work-card-blurb">{blurb}</span>
          <span className="work-card-skills" aria-label="tools">
            {tools.map((t) => (
              <span className="work-skill" key={t}>
                {t}
              </span>
            ))}
          </span>
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

  // ---- deep links: open pushes #p/<id>, back/close pops it ----
  const openProject = (p) => {
    setOpen(p)
    window.history.pushState({ p: p.id }, '', `#p/${p.id}`)
  }
  const closeProject = () => {
    if (window.history.state?.p) {
      // we pushed this entry - back both closes and cleans the URL
      window.history.back()
    } else {
      // arrived with #p/<id> directly: there is no in-site entry behind
      // us, so back() would leave the site - clean the hash in place
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setOpen(null)
    }
  }
  // the modal's own CTA: close the story, land on the contact section.
  // No history.back() here - its scroll restoration would yank the page
  // back mid-scroll; replaceState cleans the URL without a navigation.
  const ctaToContact = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setOpen(null)
    // the modal unlocks body scroll only when its exit animation ends -
    // too late for a scroll that starts now
    document.body.style.overflow = ''
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }
  useEffect(() => {
    // arriving with a project hash opens it straight away (no pushState:
    // history.state stays null, so closing cleans the hash instead of
    // backing out of the site)
    const initial = hashId()
    if (initial) {
      const p = projects.find((x) => x.id === initial)
      if (p) setOpen(p)
    }
    const onPop = () => {
      const id = hashId()
      setOpen(id ? (projects.find((x) => x.id === id) ?? null) : null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // localized `projects` changes with lang; the listener must see the
    // fresh list or a reopened deep link would show stale copy
  }, [projects])

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // cards glide up into place as they enter - movement only, no fade
      gsap.utils.toArray('.work-card').forEach((card) => {
        gsap.from(card, {
          y: 44,
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
        {/* the strongest sales line on the site opens the proof section,
            not a decorative corner of About */}
        <blockquote className="work-quote">
          <Reveal as="span" className="work-quote-line" delay={0.12}>
            {ui.work.quote1}
          </Reveal>
          <Reveal as="span" className="work-quote-line" delay={0.24}>
            {ui.work.quote2}
          </Reveal>
        </blockquote>
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
              {projects
                .filter((p) => p.group === g.id)
                .map((p) => (
                  <Card key={p.id} project={p} onOpen={openProject} personalLabel={ui.work.personal} />
                ))}
            </ul>
          </section>
        ))}
      </div>

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

      <Suspense fallback={null}>
        <AnimatePresence>
          {open && <ProjectModal project={open} onClose={closeProject} onCta={ctaToContact} />}
        </AnimatePresence>
      </Suspense>
    </section>
  )
}
