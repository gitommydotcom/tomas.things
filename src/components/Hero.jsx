import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE } from './Reveal.jsx'
import { SqUnderline, SqArrow, BrandAsterisk } from './Doodles.jsx'
import PenTool from './PenTool.jsx'

gsap.registerPlugin(ScrollTrigger)

/*
 * The jewel piece. Each slogan word flips on hover (tap on touch) to a
 * translation - Italian or Czech. Every word alternates between the two
 * languages, starting from a random one, so both always show up and no
 * two visits read the same.
 *
 * Layout rules:
 * - The slogan is composed of FIXED lines - words never jump between
 *   lines, on any screen. A flipping word only slides its own line's
 *   neighbours aside.
 * - Each face's width is measured continuously (hidden sizers +
 *   ResizeObserver), so the width transition is always px -> px and
 *   stays correct through font loading and window resizes.
 * - Hover lives on a dedicated hit area that never shrinks below the
 *   word's resting footprint, so the width animation can't push the
 *   pointer off the word and make it rattle at the borders.
 */
const LANGS = {
  it: { label: 'IT', html: 'it' },
  cz: { label: 'CZ', html: 'cs' }, // displayed as CZ; BCP-47 tag stays "cs"
}

const LINES = [
  [
    { en: 'I', it: 'Io', cz: 'Já' },
    { en: 'translate', it: 'traduco', cz: 'překládám' },
  ],
  [
    { en: 'ideas', it: 'idee', cz: 'nápady', contrast: true },
    { en: 'into', it: 'in', cz: 'do' },
  ],
  [{ en: 'things', it: 'cose', cz: 'věci', last: true }],
]

const WORDS = LINES.flat().map((w) => w.en)

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function FlipWord({ word, index, revealed, tapped, onTap, onRevealed }) {
  const [hovered, setHovered] = useState(false)
  // the language this word will flip to next - random start, then
  // strict alternation so a visitor always gets to see both
  const [lang, setLang] = useState(() => (Math.random() < 0.5 ? 'it' : 'cz'))
  const [widths, setWidths] = useState(null)
  const sizerEn = useRef(null)
  const sizerIt = useRef(null)
  const sizerCz = useRef(null)

  const active = hovered || tapped

  // advance the language on each activation, while the back face is
  // still hidden (rotation 0), so the swap is never visible
  const wasActive = useRef(false)
  useEffect(() => {
    if (active && !wasActive.current) {
      setLang((l) => (l === 'it' ? 'cz' : 'it'))
    }
    wasActive.current = active
  }, [active])

  useLayoutEffect(() => {
    const measure = () => {
      const en = sizerEn.current?.offsetWidth
      const it = sizerIt.current?.offsetWidth
      const cz = sizerCz.current?.offsetWidth
      if (en && it && cz) setWidths({ en, it, cz })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (sizerEn.current) ro.observe(sizerEn.current)
    if (sizerIt.current) ro.observe(sizerIt.current)
    if (sizerCz.current) ro.observe(sizerCz.current)
    document.fonts?.ready?.then(measure)
    return () => ro.disconnect()
  }, [])

  const back = word[lang]
  const width = widths ? (active ? widths[lang] : widths.en) : null
  // the hit area covers the resting word AND the flipped word, so the
  // pointer can never fall off mid-transition
  const hitWidth = widths ? (active ? Math.max(widths.en, widths[lang]) : widths.en) : null

  return (
    <span
      className={`hero-mask ${revealed ? 'hero-mask--open' : ''} ${active ? 'hero-mask--front' : ''}`}
    >
      <motion.span
        className="hero-mask-inner"
        initial={{ y: '115%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 + index * 0.12 }}
        onAnimationComplete={word.last ? onRevealed : undefined}
      >
        <span
          className={`flip ${word.contrast ? 'flip--ideas' : ''} ${active ? 'flip--active' : ''}`}
          style={width ? { width: width + 'px' } : undefined}
        >
          {/* hidden sizers: keep every face's width measured at all times */}
          <span ref={sizerEn} className="flip-face flip-sizer" aria-hidden="true">
            {word.en}
          </span>
          <span ref={sizerIt} className="flip-face flip-sizer" aria-hidden="true">
            {word.it}
          </span>
          <span ref={sizerCz} className="flip-face flip-sizer" aria-hidden="true">
            {word.cz}
          </span>
          <span className="flip-pivot">
            <span className="flip-face flip-front">{word.en}</span>
            <span className="flip-face flip-back" lang={LANGS[lang].html}>
              {back}
              <span className="flip-lang">{LANGS[lang].label}</span>
            </span>
          </span>
          {word.contrast && <SqUnderline className="ideas-underline" delay={1.6} />}
          {/* stable hover/tap surface - its size never animates */}
          <span
            className="flip-hit"
            style={hitWidth ? { width: hitWidth + 'px' } : undefined}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              if (window.matchMedia('(hover: none)').matches) onTap()
            }}
          />
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

export default function Hero() {
  const [revealed, setRevealed] = useState(false)
  // one tapped word at a time - tapping another flips the first back
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
  // words take turns (in a shuffled order every round) flipping to a
  // translation and back - quickly, so it's seen before scrolling on.
  // Stops as soon as the visitor starts tapping words themselves.
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let inView = true
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
    })
    if (sloganRef.current) io.observe(sloganRef.current)

    let order = []
    let flipBack = null
    let next = null
    const tick = () => {
      if (userTouched.current) return
      if (inView && !document.hidden) {
        if (order.length === 0) order = shuffle(WORDS)
        const word = order.shift()
        setTappedId(word)
        flipBack = setTimeout(() => {
          setTappedId((current) => (current === word ? null : current))
        }, 1300)
      }
      next = setTimeout(tick, 2000)
    }
    // first flip lands right after the entrance reveal settles
    next = setTimeout(tick, 2200)

    return () => {
      io.disconnect()
      clearTimeout(next)
      if (flipBack) clearTimeout(flipBack)
    }
  }, [])

  // scrolling away pulls the hero up and fades it, scrubbed to the
  // scrollbar - the first hint that this page moves with you
  const sectionRef = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.hero-inner', {
        yPercent: -12,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    })
    return () => mm.revert()
  }, [])

  let wordIndex = -1

  return (
    <section className="hero" id="top" ref={sectionRef}>
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

        <div className="hero-subs">
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.25 }}
          >
            Design, print, code - from the idea to the finished thing.
          </motion.p>
          <motion.p
            className="hero-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 2.1 }}
            aria-hidden="true"
          >
            <span className="hero-hint--hover">
              psst: hover the slogan, it speaks three languages.
            </span>
            <span className="hero-hint--touch">
              psst: the slogan speaks three languages, tap it.
            </span>
          </motion.p>
        </div>

        {/* the designer's tell: a live bézier curve - it breathes, bends
            on hover and redraws on click */}
        <PenTool className="hero-pen" />
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
