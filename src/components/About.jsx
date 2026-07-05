import { motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal.jsx'
import { SqArrow, BrandAsterisk } from './Doodles.jsx'

/* What I take care of — quiet list, no numbering, the words do the work. */
const CRAFT = [
  ['Identity & artwork', 'Logos, covers, posters — designed to survive real use'],
  ['Print production', 'Press-ready files; inks, formats and finishes chosen up front'],
  ['Web & code', 'Sites and tools, written by the same person who designed them'],
  ['Motion & content', 'Video direction, edits, animation — timed and ready to post'],
  ['The finish', 'Printed, online or working: you get the thing, not a file'],
]

const TOOLKIT = [
  ['Design', ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro']],
  ['Code', ['HTML & CSS', 'JavaScript', 'React', 'Python']],
  ['Plus', ['AI workflows', 'Offset print', 'EN · IT · CZ']],
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

      <motion.p
        className="about-lede"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        Hi, I'm Tomáš. I design things — and then I stay
        to&nbsp;<em>build</em>&nbsp;them.
      </motion.p>

      <div className="about-grid">
        <div className="about-copy">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            I grew up between Czech and Italian, forever translating one
            half of my life to the other. Somewhere along the way that
            became the job: I take an idea and carry it all the way into
            the world — the sketch, the artwork, the press-ready file,
            the website, the video.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
          >
            Most projects lose their spark in the handoffs — designer to
            developer, file to printer, idea to reality. So I removed the
            handoffs. The same pair of hands draws your logo, preps the
            plates, writes the code and presses publish. You talk to one
            person, and nothing gets lost in between, because there is no
            in-between. <em>AI multiplies my hands; the eye — and the
            care — stay mine.</em>
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
            {/* static stroke: the draw-on animation never fired on iOS
                and left the arrow as two dots */}
            <SqArrow className="idea-thing-arrow" draw={false} />
            <span className="idea-thing-word idea-thing-word--bold">thing</span>
          </motion.div>
        </div>

        <div className="about-services">
          <Reveal as="p" className="eyebrow about-stack-label">
            What I take care of
          </Reveal>
          <ul className="craft-list">
            {CRAFT.map(([name, detail], i) => (
              <motion.li
                key={name}
                className="craft-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
              >
                <span className="craft-name">{name}</span>
                <span className="craft-detail">{detail}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="about-toolkit"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <p className="eyebrow about-stack-label">The toolbox</p>
            {TOOLKIT.map(([group, skills]) => (
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
