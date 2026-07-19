import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal.jsx'
import { useUI } from '../i18n/LangContext.jsx'
import LangSwitcher from '../i18n/LangSwitcher.jsx'
import { BrandAsterisk, SqCreature } from './Doodles.jsx'
import Socials from './Socials.jsx'

/*
 * The lead form. Posts to Netlify Forms (the mirror form in index.html
 * makes the build bots register it); if the POST fails - e.g. the site
 * is hosted elsewhere - the visitor is handed the direct email instead,
 * so no message is ever lost to a broken endpoint.
 */
function ContactForm() {
  const ui = useUI()
  const f = ui.contact.form
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('bot-field')) return // honeypot: bots fill it, humans can't see it
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="contact-card contact-card--ok" role="status">
        <BrandAsterisk className="contact-ok-ast" />
        <p className="contact-ok-title">{f.okTitle}</p>
        <p className="contact-ok-body">{f.okBody}</p>
      </div>
    )
  }

  return (
    <form
      className="contact-card contact-form"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden aria-hidden="true">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="form-row">
        <label className="form-field">
          <span className="form-label">{f.name}</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="form-field">
          <span className="form-label">{f.email}</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="form-field">
        <span className="form-label">{f.type}</span>
        <select name="type" defaultValue="identity">
          <option value="identity">{f.types.identity}</option>
          <option value="web">{f.types.web}</option>
          <option value="content">{f.types.content}</option>
          <option value="other">{f.types.other}</option>
        </select>
      </label>
      <label className="form-field">
        <span className="form-label">{f.message}</span>
        <textarea name="message" rows={5} required />
      </label>
      {status === 'error' && (
        <p className="form-error" role="alert">
          {f.error} <a href="mailto:tomas.mtj@gmail.com">tomas.mtj@gmail.com</a>
        </p>
      )}
      <button type="submit" className="btn btn--primary form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : f.send}
      </button>
    </form>
  )
}

export default function Contact() {
  const ui = useUI()
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
        {ui.contact.eyebrow}
      </Reveal>
      <h2 className="contact-title">
        <Reveal as="span" className="contact-line" delay={0.08}>
          {ui.contact.l1}
        </Reveal>
        <Reveal as="span" className="contact-line" delay={0.2}>
          {ui.contact.article ? `${ui.contact.article} ` : ''}
          <em className="contact-thing">{ui.contact.thing}</em>
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
      <Reveal as="p" className="contact-reassure" delay={0.3}>
        {ui.contact.reassure}
      </Reveal>

      <motion.div
        className="contact-form-wrap"
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      >
        <ContactForm />
      </motion.div>

      <motion.div
        className="contact-actions"
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
      >
        <SqCreature className="contact-creature" eyeRef={eyesRef} />
        <p className="contact-direct">{ui.contact.direct}</p>
        <a className="contact-button" href="mailto:tomas.mtj@gmail.com">
          tomas.mtj@gmail.com
        </a>
        <div className="contact-alts">
          <a className="contact-alt" href="tel:+393493569260">
            +39 349 356 9260
          </a>
          <a className="contact-alt" href="https://wa.me/393493569260" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <Socials className="contact-socials" />
        <LangSwitcher variant="inline" className="contact-langs" />
      </motion.div>
    </section>
  )
}
