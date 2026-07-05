import { motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal.jsx'
import { BrandAsterisk } from './Doodles.jsx'

export default function Contact() {
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
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
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
      </section>
  )
}
