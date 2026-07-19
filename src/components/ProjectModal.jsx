import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from './Reveal.jsx'
import { useUI } from '../i18n/LangContext.jsx'
import { BrandAsterisk } from './Doodles.jsx'
import Pic from './Pic.jsx'

/*
 * Project detail overlay. Editorial layout: header row with the title
 * block on the left and the story + links on the right, then the
 * gallery full-width below.
 *
 * Accessibility: role=dialog + aria-modal, focus moves in on open, is
 * trapped while open, and returns to the opening card on close.
 * ESC and backdrop click both close.
 */
export default function ProjectModal({ project, onClose, onCta }) {
  const ui = useUI()
  const panelRef = useRef(null)
  const [zoom, setZoom] = useState(null)

  // when the lightbox is open, ESC closes it first (capture phase, so it
  // runs before the modal's own ESC handler and never closes the modal)
  useEffect(() => {
    if (!zoom) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setZoom(null)
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [zoom])

  useEffect(() => {
    const opener = document.activeElement
    const panel = panelRef.current
    panel?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusables = panel.querySelectorAll(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      // preventScroll: the page is already where the card is on a normal
      // close, and on the CTA path a scroll to #contact is in flight -
      // a default focus() would yank the viewport back to the card
      opener?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  // the story opens on a lead image, then the text, then the rest of
  // the images (per the detail layout brief)
  const [lead, ...rest] = project.gallery

  return (
    <div className="modal-root">
      {/* only the backdrop fades (functional overlay); the panel just
          slides - cheap enough to feel instant on a phone */}
      <motion.div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />
      <motion.div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
        ref={panelRef}
        tabIndex={-1}
        initial={{ y: '6%', scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: '4%', scale: 0.99 }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        <button className="modal-close" onClick={onClose} aria-label={ui.work.close}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 5 L19 19 M19 5 L5 19"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>

        {/* 1. the lead image */}
        {lead && (
          <button
            type="button"
            className="modal-lead"
            onClick={() => setZoom(lead)}
            aria-label={`${ui.work.enlarge}: ${lead.alt}`}
          >
            <Pic src={lead.src} alt={lead.alt} loading="eager" sizes="(max-width: 1100px) 100vw, 1012px" />
            <span className="modal-shot-zoom" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M4 9V4H9 M15 4H20V9 M20 15V20H15 M9 20H4V15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        )}

        {/* 2. the text */}
        <div className="modal-head">
          <div className="modal-head-left">
            <p className="eyebrow modal-eyebrow">
              <BrandAsterisk className="eyebrow-asterisk" />
              {project.category}
              {project.personal && (
                <span className="work-tag work-tag--personal">{ui.work.personal}</span>
              )}
            </p>
            <h3 className="modal-title" id={`modal-title-${project.id}`}>
              {project.title}
            </h3>
            <p className="modal-role">{project.role}</p>
            {/* who it was for and when - the two facts a prospect scans for */}
            {(project.client || project.year) && (
              <p className="modal-client">
                {[project.client, project.year].filter(Boolean).join(' · ')}
              </p>
            )}
            {project.tools && (
              <p className="modal-tools">{project.tools.join(' · ')}</p>
            )}
          </div>

          <div className="modal-head-right">
            {project.description.map((para) => (
              <p key={para.slice(0, 24)} className="modal-para">
                {para}
              </p>
            ))}
            {/* the case study ends on what came out of it, not on prose */}
            {project.outcome && (
              <div className="modal-outcome">
                <p className="eyebrow modal-outcome-label">
                  <BrandAsterisk className="eyebrow-asterisk" />
                  {ui.work.result}
                </p>
                <p className="modal-outcome-text">{project.outcome}</p>
              </div>
            )}
            {project.testimonial && (
              <blockquote className="modal-testimonial">
                <p>{project.testimonial.quote}</p>
                <cite>{project.testimonial.author}</cite>
              </blockquote>
            )}
            {project.links && (
              <ul className="modal-links">
                {project.links.map(({ label, cta, href }) => (
                  <li key={href} className="modal-link-row">
                    <span className="modal-link-label">{label}</span>
                    <a href={href} target="_blank" rel="noreferrer" className="modal-link">
                      {cta}
                      <span aria-hidden="true">&thinsp;↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 3. the rest of the images */}
        {rest.length > 0 && (
          <div className={`modal-gallery ${rest.length === 1 ? 'modal-gallery--single' : ''}`}>
            {rest.map((img, i) => (
              <button
                type="button"
                key={img.src}
                className="modal-shot"
                onClick={() => setZoom(img)}
                aria-label={`${ui.work.enlarge}: ${img.alt}`}
              >
                <Pic
                  src={img.src}
                  alt={img.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="(max-width: 560px) 100vw, 506px"
                />
                <span className="modal-shot-zoom" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M4 9V4H9 M15 4H20V9 M20 15V20H15 M9 20H4V15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        )}

        {/* every story ends with a door, not a wall: the reader has just
            seen the proof - this is the moment to ask */}
        <div className="modal-cta">
          <BrandAsterisk className="modal-cta-ast" />
          <p className="modal-cta-title">{ui.work.modalCtaTitle}</p>
          <button type="button" className="btn btn--primary modal-cta-btn" onClick={onCta}>
            {ui.work.modalCtaBtn}
          </button>
        </div>
      </motion.div>

      {/* lightbox: any gallery image opens full-size, click anywhere or ESC to close */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="modal-lightbox"
            onClick={() => setZoom(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <button className="modal-lightbox-close" aria-label={ui.work.closeImage}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 5 L19 19 M19 5 L5 19"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
            <motion.img
              src={zoom.src}
              alt={zoom.alt}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
