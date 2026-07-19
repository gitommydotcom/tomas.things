import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, SplitTitle, EASE } from './Reveal.jsx'
import { useLang, useUI } from '../i18n/LangContext.jsx'
import { SqArrow, BrandAsterisk, SpiralCreature } from './Doodles.jsx'

gsap.registerPlugin(ScrollTrigger)

// TODO(Tomáš): path to your portrait once one exists, e.g. '/portrait.jpg'.
// A face sells "you talk to one human" better than any paragraph.
const PORTRAIT = ''

export default function About() {
  const { lang } = useLang()
  const ui = useUI()
  const a = ui.about
  const sectionRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // the lede inks itself in word by word, scrubbed to the scrollbar.
      // Solid color to solid color - the words are printed light and
      // the ink fills in; nothing is transparent, nothing fades.
      gsap.fromTo(
        '.lede-word',
        { color: '#d3c8ba' },
        {
          color: '#181616',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-lede',
            start: 'top 82%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )
    })
    return () => mm.revert()
    // re-run when the language (and so the lede words) change
  }, [lang])

  return (
    <section className="about container" id="about" ref={sectionRef}>
      <header className="section-head">
        <Reveal as="p" className="eyebrow">
          <BrandAsterisk className="eyebrow-asterisk eyebrow-asterisk--lead" />
          {a.eyebrow}
        </Reveal>
        {/* Ringo coils beside the About title now that Elvis opens the show */}
        <div className="about-title-row">
          <SplitTitle key={lang} className="section-title" text={a.title} />
          <SpiralCreature className="about-creature" />
        </div>
      </header>

      <p className="about-lede">
        {a.lede.map((tok, i) => (
          <span className="lede-word" key={i}>
            {tok.em ? <em>{tok.w}</em> : tok.w}{' '}
          </span>
        ))}
      </p>

      <div className="about-grid">
        <div className="about-copy">
          <motion.p
            initial={{ y: 32 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            {a.copy1}
          </motion.p>
          <motion.p
            initial={{ y: 32 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
          >
            {a.copy2}
            <em>{a.copy2em}</em>
          </motion.p>

          {/* who and where - the trust facts a client checks before writing.
              TODO(Tomáš): confirm the city in ui.js (about.location) */}
          <Reveal as="p" className="about-location" delay={0.1}>
            {a.location}
          </Reveal>

          <motion.div
            className="idea-thing"
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            aria-hidden="true"
          >
            <span className="idea-thing-word">{a.ideaWord}</span>
            {/* static stroke: the draw-on animation never fired on iOS
                and left the arrow as two dots */}
            <SqArrow className="idea-thing-arrow" draw={false} />
            <span className="idea-thing-word idea-thing-word--bold">{a.thingWord}</span>
          </motion.div>
        </div>

        <div className="about-services">
          {/* the human behind "you talk to one human". Renders once a
              real photo exists - TODO(Tomáš): drop a portrait into
              public/ (e.g. /portrait.jpg) and set PORTRAIT below */}
          {PORTRAIT && (
            <figure className="about-portrait">
              <img src={PORTRAIT} alt="Tomáš Matějček" loading="lazy" decoding="async" />
            </figure>
          )}
          <Reveal as="p" className="eyebrow about-stack-label">
            {a.craftLabel}
          </Reveal>
          <ul className="craft-list">
            {a.craft.map(([name, detail], i) => (
              <motion.li
                key={name}
                className="craft-row"
                initial={{ y: 22 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              >
                <span className="craft-name">{name}</span>
                <span className="craft-detail">{detail}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="about-toolkit"
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <p className="eyebrow about-stack-label">{a.toolboxLabel}</p>
            {a.toolkit.map(([group, skills]) => (
              <div className="kit-group" key={group}>
                <span className="kit-label">{group}</span>
                <ul className="skill-pills">
                  {skills.map((skill) => (
                    <li key={skill} className="pill">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
