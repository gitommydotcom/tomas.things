import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, SplitTitle, EASE } from './Reveal.jsx'
import { SqArrow, BrandAsterisk, SpiralCreature } from './Doodles.jsx'

gsap.registerPlugin(ScrollTrigger)

/* What I take care of - compact rows, the words do the work. */
const CRAFT = [
  ['Identity & artwork', 'logos, covers, posters that survive real use'],
  ['Print production', 'press-ready files; inks and finishes chosen up front'],
  ['Web & code', 'sites and tools, built by the person who designed them'],
  ['Motion & content', 'direction, edits, animation, ready to post'],
  ['The finish', 'printed, online or working: a thing, not a file'],
]

const TOOLKIT = [
  ['Design', ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro']],
  ['Code', ['HTML & CSS', 'JavaScript', 'React', 'Python']],
  ['Plus', ['AI workflows', 'Offset print', 'EN · IT · CZ']],
]

/* the lede is authored word by word so GSAP can fill it in on scroll */
const LEDE = [
  'Hi,', "I'm", 'Tomáš.', 'I', 'design', 'things,', 'then', 'I',
  'stay', 'to', <em key="build">build</em>, 'them.',
]

export default function About() {
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
  }, [])

  return (
    <section className="about container" id="about" ref={sectionRef}>
      <header className="section-head">
        <Reveal as="p" className="eyebrow">
          <BrandAsterisk className="eyebrow-asterisk eyebrow-asterisk--lead" />
          About
        </Reveal>
        {/* Ringo coils beside the About title now that Elvis opens the show */}
        <div className="about-title-row">
          <SplitTitle className="section-title" text="A full-stack designer." />
          <SpiralCreature className="about-creature" />
        </div>
      </header>

      <p className="about-lede">
        {LEDE.map((word, i) => (
          <span className="lede-word" key={i}>
            {word}{' '}
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
            I grew up speaking English, Czech and Italian, always
            translating one world into another. That habit became a
            profession: I take an idea and walk it all the way into
            reality, from the first sketch to the artwork, the website,
            the video, the print run.
          </motion.p>
          <motion.p
            initial={{ y: 32 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
          >
            Most projects fade a little every time they get passed along.
            Mine never leave my desk: the person who draws your logo
            also preps the plates, writes the code and puts it all live.
            You talk to one human and receive something that simply works.
            <em> AI multiplies my speed. The eye and the care stay
            mine.</em>
          </motion.p>

          <div className="about-quote">
            <Reveal as="blockquote" className="pull-quote" delay={0.1}>
              "A designer hands you a file.
            </Reveal>
            <Reveal as="blockquote" className="pull-quote" delay={0.22}>
              I deliver finished&nbsp;products."
            </Reveal>
          </div>

          <motion.div
            className="idea-thing"
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
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
