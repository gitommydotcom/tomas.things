import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './Reveal.jsx'
import { SqUnderline, SqArrow, BrandAsterisk } from './Doodles.jsx'

/*
 * The jewel piece. Each slogan word flips on hover (tap on touch) to its
 * Italian or Czech translation, alternating IT / CZ.
 *
 * Layout rules:
 * - The slogan is composed of FIXED lines — words never jump between
 *   lines, on any screen. A flipping word only slides its own line's
 *   neighbours aside.
 * - Each word's width is measured continuously (hidden sizers +
 *   ResizeObserver), so the width transition is always px -> px and
 *   stays correct through font loading and window resizes.
 */
const LINES = [
  [
    { en: 'I', t: 'Io', lang: 'it' },
    { en: 'translate', t: 'překládám', lang: 'cs' },
  ],
  [
    { en: 'ideas', t: 'idee', lang: 'it', contrast: true },
    { en: 'into', t: 'do', lang: 'cs' },
  ],
  [{ en: 'things', t: 'cose', lang: 'it', last: true }],
]

function FlipWord({ word, index, revealed, tapped, onTap, onRevealed }) {
  const [hovered, setHovered] = useState(false)
  const [widths, setWidths] = useState(null)
  const frontSizer = useRef(null)
  const backSizer = useRef(null)

  const active = hovered || tapped

  useLayoutEffect(() => {
    const measure = () => {
      const fw = frontSizer.current?.offsetWidth
      const bw = backSizer.current?.offsetWidth
      if (fw && bw) setWidths({ fw, bw })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (frontSizer.current) ro.observe(frontSizer.current)
    if (backSizer.current) ro.observe(backSizer.current)
    document.fonts?.ready?.then(measure)
    return () => ro.disconnect()
  }, [])

  return (
    <span className={`hero-mask ${revealed ? 'hero-mask--open' : ''}`}>
      <motion.span
        className="hero-mask-inner"
        initial={{ y: '115%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 + index * 0.12 }}
        onAnimationComplete={word.last ? onRevealed : undefined}
      >
        <span
          className={`flip ${word.contrast ? 'flip--ideas' : ''} ${active ? 'flip--active' : ''}`}
          style={widths ? { width: (active ? widths.bw : widths.fw) + 'px' } : undefined}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            if (window.matchMedia('(hover: none)').matches) onTap()
          }}
        >
          {/* hidden sizers: keep both face widths measured at all times */}
          <span ref={frontSizer} className="flip-face flip-sizer" aria-hidden="true">
            {word.en}
          </span>
          <span ref={backSizer} className="flip-face flip-sizer" aria-hidden="true">
            {word.t}
          </span>
          <span className="flip-pivot">
            <span className="flip-face flip-front">{word.en}</span>
            <span className="flip-face flip-back" lang={word.lang}>
              {word.t}
              <span className="flip-lang">{word.lang}</span>
            </span>
          </span>
          {word.contrast && <SqUnderline className="ideas-underline" delay={1.6} />}
        </span>
        {word.last && (
          <motion.span
            className="hero-asterisk"
            initial={{ scale: 0, rotate: -120 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.35 }}
          >
            <BrandAsterisk className="hero-asterisk-mark" />
          </motion.span>
        )}
      </motion.span>
    </span>
  )
}

const WORD_ORDER = ['I', 'translate', 'ideas', 'into', 'things']

export default function Hero() {
  const [revealed, setRevealed] = useState(false)
  // one tapped word at a time — tapping another flips the first back
  const [tappedId, setTappedId] = useState(null)
  const userTouched = useRef(false)
  const sloganRef = useRef(null)

  // any tap elsewhere on the page flips the tapped word back
  useEffect(() => {
    if (tappedId == null) return
    const clear = (e) => {
      if (!e.target.closest?.('.flip')) setTappedId(null)
    }
    document.addEventListener('click', clear)
    return () => document.removeEventListener('click', clear)
  }, [tappedId])

  // touch devices can't hover, so the slogan performs by itself:
  // words take turns flipping to their translation and back.
  // Stops as soon as the visitor starts tapping words themselves.
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let inView = true
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
    })
    if (sloganRef.current) io.observe(sloganRef.current)

    let i = 0
    let flipBack = null
    const interval = setInterval(() => {
      if (userTouched.current || !inView || document.hidden) return
      const word = WORD_ORDER[i % WORD_ORDER.length]
      i += 1
      setTappedId(word)
      flipBack = setTimeout(() => {
        setTappedId((current) => (current === word ? null : current))
      }, 1900)
    }, 3400)

    return () => {
      io.disconnect()
      clearInterval(interval)
      if (flipBack) clearTimeout(flipBack)
    }
  }, [])

  let wordIndex = -1

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <h1
          className="hero-slogan"
          aria-label="I translate ideas into things."
          ref={sloganRef}
        >
          {LINES.map((line, li) => (
            <span className="hero-line" key={li}>
              {line.map((word) => {
                wordIndex += 1
                const id = word.en
                return (
                  <FlipWord
                    key={id}
                    word={word}
                    index={wordIndex}
                    revealed={revealed}
                    tapped={tappedId === id}
                    onTap={() => {
                      userTouched.current = true
                      setTappedId(tappedId === id ? null : id)
                    }}
                    onRevealed={() => setRevealed(true)}
                  />
                )
              })}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.25 }}
        >
          Design, print, code — from the idea to the finished object.
        </motion.p>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.8 }}
        aria-hidden="true"
      >
        <span>scroll</span>
        <SqArrow className="hero-scroll-arrow" inView={false} delay={2} />
      </motion.div>
    </section>
  )
}
