import { motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal.jsx'
import { BrandAsterisk, WaveCreature } from './Doodles.jsx'

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
          <div className="contact-button-row">
            <a className="contact-button" href="mailto:tomas.mtj@gmail.com">
              tomas.mtj@gmail.com
            </a>
            <WaveCreature className="contact-creature" />
          </div>
          <a className="contact-alt" href="tel:+393493569260">
            +39 349 356 9260
          </a>
          <a
            className="contact-alt"
            href="https://www.instagram.com/truetommy_"
            target="_blank"
            rel="noreferrer"
          >
            @truetommy_ <span aria-hidden="true">↗</span>
          </a>
          <span className="contact-langs">EN&ensp;·&ensp;IT&ensp;·&ensp;CS</span>
        </motion.div>
      </section>
  )
}
