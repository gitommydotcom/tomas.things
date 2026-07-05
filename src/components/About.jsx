import { motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal.jsx'
import { SqArrow, BrandAsterisk } from './Doodles.jsx'

/* What "full-stack designer" actually means — the pipeline, one pair of hands. */
const STACK = [
  ['01', 'Identity & artwork', 'Logos, covers, posters — designed to survive real use'],
  ['02', 'Print production', 'Press-ready files; inks, formats and finishes chosen up front'],
  ['03', 'Web & code', 'Sites and tools, written by the same person who designed them'],
  ['04', 'Motion & content', 'Video direction, edits, animation — timed and ready to post'],
  ['05', 'The finish', 'Printed, online or working: you get the thing, not a file'],
]

const SKILLS = [
  'Photoshop', 'InDesign', 'Illustrator', 'Premiere Pro',
  'HTML', 'JavaScript', 'Python', 'AI workflows', 'Offset print',
  'EN · IT · CS',
]

export default function About() {
  return (
    <section className="about container" id="about">
      <header className="section-head">
        <Reveal as="p" className="eyebrow">
          <BrandAsterisk className="eyebrow-asterisk eyebrow-asterisk--lead" />
          About
        </Reveal>
        <Reveal as="h2" className="section-title" delay={0.08}>
          A full-stack designer.
        </Reveal>
      </header>

      <div className="about-grid">
        <div className="about-copy">
          <motion.p
            className="about-lede"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Design and code are usually two people. Print and pixels usually
            two more. Here, they're one — I design the thing, build the
            thing, and hand it over finished.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            Most projects die in the handoffs — designer to developer, file
            to printer, idea to reality. I remove the handoffs. The person
            who draws your logo is the same one who preps the offset plates,
            writes the code and presses publish. Nothing gets lost in
            between, because there is no in-between.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            I grew up between languages — Czech, Italian, English — and I
            work between disciplines the same way. Translation is the whole
            job: idea to object, sketch to system, file to finished thing.
            <em> AI multiplies my hands; it never replaces the eye.</em>
          </motion.p>

          <div className="about-quote">
            <Reveal as="blockquote" className="pull-quote" delay={0.1}>
              "A designer hands you a file.
            </Reveal>
            <Reveal as="blockquote" className="pull-quote" delay={0.22}>
              I hand you the finished&nbsp;thing."
            </Reveal>
          </div>

          <motion.div
            className="idea-thing"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            aria-hidden="true"
          >
            <span className="idea-thing-word">idea</span>
            <SqArrow className="idea-thing-arrow" delay={0.3} />
            <span className="idea-thing-word idea-thing-word--bold">thing</span>
          </motion.div>
        </div>

        <div className="about-services">
          <Reveal as="p" className="eyebrow about-stack-label">
            What full-stack means here
          </Reveal>
          <ul className="service-list">
            {STACK.map(([num, name, detail], i) => (
              <motion.li
                key={num}
                className="service-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              >
                <span className="service-num">{num}</span>
                <span className="service-name">{name}</span>
                <span className="service-detail">{detail}</span>
              </motion.li>
            ))}
          </ul>
          <motion.ul
            className="skill-pills"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            {SKILLS.map((skill) => (
              <li key={skill} className="pill">
                {skill}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
