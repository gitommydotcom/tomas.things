import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './Reveal.jsx'
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
  const panelRef = useRef(null)

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
    <motion.div
      className="modal-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <motion.div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
        ref={panelRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 34, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.985 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
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
            <motion.img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.25 + Math.min(i, 4) * 0.08 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
