import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from './Reveal.jsx'
import { useUI } from '../i18n/LangContext.jsx'
import { BrandAsterisk } from './Doodles.jsx'

/*
 * Project detail overlay. Editorial layout: header row with the title
 * block on the left and the story + links on the right, then the
 * gallery full-width below.
 *
 * Accessibility: role=dialog + aria-modal, focus moves in on open, is
 * trapped while open, and returns to the opening card on close.
 * ESC and backdrop click both close.
 */
export default function ProjectModal({ project, onClose }) {
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
      opener?.focus?.()
    }
  }, [onClose])

  const single = project.gallery.length === 1

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

        <div className="modal-head">
          <div className="modal-head-left">
            <p className="eyebrow modal-eyebrow">
              {project.index}
              <BrandAsterisk className="eyebrow-asterisk" />
              {project.category}
            </p>
            <h3 className="modal-title" id={`modal-title-${project.id}`}>
              {project.title}
            </h3>
            <p className="modal-role">{project.role}</p>
          </div>

          <div className="modal-head-right">
            {project.description.map((para) => (
              <p key={para.slice(0, 24)} className="modal-para">
                {para}
              </p>
            ))}
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

        <div className={`modal-gallery ${single ? 'modal-gallery--single' : ''}`}>
          {project.gallery.map((img, i) => (
            <button
              type="button"
              key={img.src}
              className="modal-shot"
              onClick={() => setZoom(img)}
              aria-label={`${ui.work.enlarge}: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
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
