import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BrandAsterisk } from './Doodles.jsx'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/playfair-display/index.css'
import '@fontsource-variable/bricolage-grotesque/index.css'
import '@fontsource-variable/unbounded/index.css'
import '@fontsource-variable/caveat/index.css'

/* touch devices get tap-worded captions; the interactions themselves
   (pointer drag, sliders, taps) work the same everywhere */
const TOUCH = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * The hero's second protagonist: an interactive workbench with three
 * live modes, one per craft. Each one is a real little tool:
 *
 *  Design - a working pen tool: tap the space to add anchor points and
 *           draw your own path, drag anchors and handles like in a
 *           vector editor, undo, shuffle, change the ink.
 *  Print  - a live type specimen: drag the glyph itself to bend the
 *           variable axes (x = weight, y = height), tap it for the
 *           next typeface; every cut leaves a proof stamp behind.
 *  Code   - source with tappable values: cycle the label and the
 *           theme in the markup, then render the real element.
 */

/* ---------------- Design: the pen tool ---------------- */

const VB = { w: 290, h: 230 }
const MAX_PTS = 12
/* anchors carry symmetric handles: the outgoing control point is
   (x+hx, y+hy), the incoming one mirrors it at (x-hx, y-hy) */
const START_PTS = [
  { x: 34, y: 192, hx: 42, hy: -72 },
  { x: 252, y: 78, hx: 42, hy: 38 },
]
const INKS = ['var(--azure)', 'var(--pink)', 'var(--ink)']

const r1 = (n) => Math.round(n * 10) / 10
const pathFrom = (pts) =>
  pts
    .map((p, i) => {
      if (i === 0) return `M${r1(p.x)} ${r1(p.y)}`
      const a = pts[i - 1]
      return ` C ${r1(a.x + a.hx)} ${r1(a.y + a.hy)}, ${r1(p.x - p.hx)} ${r1(p.y - p.hy)}, ${r1(p.x)} ${r1(p.y)}`
    })
    .join('')

function PenTool() {
  const svgRef = useRef(null)
  const [pts, setPts] = useState(START_PTS)
  const [sel, setSel] = useState(1)
  const [ink, setInk] = useState(0)
  const [fresh, setFresh] = useState(true)
  const ptsRef = useRef(pts)
  ptsRef.current = pts

  // entrance: the starting curve draws itself, the anchors pop in
  useEffect(() => {
    if (REDUCED()) return
    const svg = svgRef.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pen-curve',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.1, ease: 'power3.out', delay: 0.1 },
      )
      gsap.from('.pen-node', {
        scale: 0,
        transformOrigin: '50% 50%',
        stagger: 0.07,
        duration: 0.5,
        ease: 'back.out(2.2)',
        delay: 0.7,
        clearProps: 'transform',
      })
      gsap.from('.rig-hint-pop', {
        scale: 0,
        transformOrigin: '50% 50%',
        duration: 0.55,
        ease: 'back.out(2)',
        delay: 1.5,
      })
    }, svg)
    return () => ctx.revert()
  }, [])

  // --- pointer work: precise viewBox coords, capture-based drags ---
  useEffect(() => {
    const svg = svgRef.current
    const toVB = (e) => {
      const r = svg.getBoundingClientRect()
      return [
        gsap.utils.clamp(8, VB.w - 8, ((e.clientX - r.left) / r.width) * VB.w),
        gsap.utils.clamp(8, VB.h - 8, ((e.clientY - r.top) / r.height) * VB.h),
      ]
    }
    let drag = null // { kind: 'pt' | 'front' | 'back', idx }
    // set fresh on EVERY press: a press that begins on a grab target
    // must never add a point when its trailing click lands on the svg
    // (pointer capture retargets that click), but a press on empty
    // space must ALWAYS add - even right after a drag
    let fromGrab = false

    const down = (e) => {
      setFresh(false)
      const t = e.target.closest('[data-pt],[data-h]')
      fromGrab = !!t
      if (!t) return
      e.preventDefault()
      svg.setPointerCapture(e.pointerId)
      if (t.dataset.pt != null) {
        const idx = +t.dataset.pt
        drag = { kind: 'pt', idx }
        setSel(idx)
      } else {
        drag = { kind: t.dataset.h, idx: +t.dataset.hIdx }
      }
    }
    const move = (e) => {
      if (!drag) return
      const [x, y] = toVB(e)
      const { kind, idx } = drag
      setPts((prev) => {
        const next = prev.slice()
        const p = { ...next[idx] }
        if (kind === 'pt') {
          p.x = x
          p.y = y
        } else if (kind === 'front') {
          p.hx = x - p.x
          p.hy = y - p.y
        } else {
          p.hx = p.x - x
          p.hy = p.y - y
        }
        next[idx] = p
        return next
      })
    }
    const up = () => {
      drag = null
    }
    // clicking the empty space (never a grab gesture) adds the next anchor
    const add = (e) => {
      if (fromGrab || e.target.closest('[data-pt],[data-h],.pen-toolbar')) return
      const [x, y] = toVB(e)
      const cur = ptsRef.current
      if (cur.length >= MAX_PTS) {
        if (!REDUCED())
          gsap.fromTo(svg, { x: -4 }, { x: 0, duration: 0.4, ease: 'elastic.out(1.2, 0.3)' })
        return
      }
      const prev = cur[cur.length - 1]
      const dx = x - prev.x
      const dy = y - prev.y
      const len = Math.max(Math.hypot(dx, dy), 1)
      const h = Math.min(46, len / 3)
      setPts([...cur, { x, y, hx: (dx / len) * h, hy: (dy / len) * h }])
      setSel(cur.length)
    }

    svg.addEventListener('pointerdown', down)
    svg.addEventListener('pointermove', move)
    svg.addEventListener('pointerup', up)
    svg.addEventListener('pointercancel', up)
    svg.addEventListener('click', add)
    return () => {
      svg.removeEventListener('pointerdown', down)
      svg.removeEventListener('pointermove', move)
      svg.removeEventListener('pointerup', up)
      svg.removeEventListener('pointercancel', up)
      svg.removeEventListener('click', add)
    }
  }, [])

  // a freshly added anchor pops in
  useEffect(() => {
    if (REDUCED()) return
    const node = svgRef.current?.querySelector(`[data-pt="${pts.length - 1}"] .pen-node`)
    if (!node || pts.length <= START_PTS.length) return
    gsap.from(node, {
      scale: 0,
      transformOrigin: '50% 50%',
      duration: 0.5,
      ease: 'back.out(2.6)',
      clearProps: 'transform',
    })
  }, [pts.length])

  const undo = () => {
    setFresh(false)
    setPts((prev) => (prev.length > 2 ? prev.slice(0, -1) : prev))
    setSel((s) => Math.min(s, Math.max(pts.length - 2, 1)))
  }
  // shuffle: every anchor jitters, every handle spins to a new pose,
  // eased elastically by lerping the whole set through one progress
  const shuffle = () => {
    setFresh(false)
    const from = ptsRef.current
    const to = from.map((p) => ({
      x: gsap.utils.clamp(20, VB.w - 20, p.x + gsap.utils.random(-36, 36)),
      y: gsap.utils.clamp(20, VB.h - 20, p.y + gsap.utils.random(-36, 36)),
      hx: gsap.utils.random(-70, 70),
      hy: gsap.utils.random(-70, 70),
    }))
    if (REDUCED()) {
      setPts(to)
      return
    }
    const prog = { t: 0 }
    gsap.to(prog, {
      t: 1,
      duration: 0.9,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
      onUpdate: () =>
        setPts(
          from.map((f, i) => ({
            x: f.x + (to[i].x - f.x) * prog.t,
            y: f.y + (to[i].y - f.y) * prog.t,
            hx: f.hx + (to[i].hx - f.hx) * prog.t,
            hy: f.hy + (to[i].hy - f.hy) * prog.t,
          })),
        ),
    })
  }

  const s = pts[Math.min(sel, pts.length - 1)]
  const last = pts[pts.length - 1]
  return (
    <div className="rig">
      {/* mini toolbar: undo, shuffle, ink */}
      <div className="pen-toolbar" aria-hidden="true">
        <button type="button" className="pen-tool-btn" onClick={undo} disabled={pts.length <= 2} title="undo">
          <svg viewBox="0 0 24 24">
            <path d="M9 6 L4 11 L9 16 M4 11 H15 C18 11 20 13 20 16" />
          </svg>
        </button>
        <button type="button" className="pen-tool-btn" onClick={shuffle} title="shuffle">
          <svg viewBox="0 0 24 24">
            <path d="M4 7 C 9 7, 14 17, 20 17 M4 17 C 9 17, 14 7, 20 7 M20 7 L 16.5 5 M20 7 L 17 10.5 M20 17 L 16.5 19 M20 17 L 17 13.5" />
          </svg>
        </button>
        <button
          type="button"
          className="pen-tool-btn pen-tool-btn--ink"
          onClick={() => setInk((i) => (i + 1) % INKS.length)}
          title="ink"
        >
          <span className="pen-ink-dot" style={{ background: INKS[(ink + 1) % INKS.length] }} />
        </button>
      </div>

      <svg ref={svgRef} className="pen-svg" viewBox={`0 0 ${VB.w} ${VB.h}`} aria-hidden="true">
        <rect width={VB.w} height={VB.h} fill="transparent" />
        <path
          className="pen-curve"
          d={pathFrom(pts)}
          pathLength="1"
          strokeDasharray="1"
          fill="none"
          stroke={INKS[ink]}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* the selected anchor exposes its two handles, vector-editor style */}
        {pts.length > 0 && sel < pts.length && (
          <g className="pen-handles">
            <path
              className="rig-handle"
              d={`M${r1(s.x - s.hx)} ${r1(s.y - s.hy)} L ${r1(s.x + s.hx)} ${r1(s.y + s.hy)}`}
            />
            <g className="rig-grab" data-h="front" data-h-idx={sel} data-cursor="grow" transform={`translate(${r1(s.x + s.hx)} ${r1(s.y + s.hy)})`}>
              <circle className="rig-halo" r="17" />
              <circle className="rig-knob pen-node" r="7" />
            </g>
            <g className="rig-grab" data-h="back" data-h-idx={sel} data-cursor="grow" transform={`translate(${r1(s.x - s.hx)} ${r1(s.y - s.hy)})`}>
              <circle className="rig-halo" r="17" />
              <circle className="rig-knob pen-node" r="7" />
            </g>
          </g>
        )}
        {pts.map((p, i) => (
          <g
            key={i}
            className="rig-grab"
            data-pt={i}
            data-cursor="grow"
            transform={`translate(${r1(p.x)} ${r1(p.y)})`}
          >
            <circle className="rig-halo" r="20" />
            <rect
              className={`rig-anchor pen-node ${i === sel ? '' : 'rig-anchor--start'}`}
              x="-7"
              y="-7"
              width="14"
              height="14"
            />
          </g>
        ))}
        {/* first-visit nudge, riding the last anchor until any touch */}
        {fresh && (
          <g className="rig-hint" transform={`translate(${r1(last.x)} ${r1(last.y)})`}>
            <g className="rig-hint-pop">
              <g className="rig-hint-bob">
                <path className="rig-hint-arrow" d="M0 26 C 4 21, -3 16, 1 11 M1 11 L -5 16 M1 11 L 6 17" />
                <text className="rig-hint-text" x="0" y="44">
                  drag &amp; draw!
                </text>
              </g>
            </g>
          </g>
        )}
      </svg>
      <p className="stage-caption">
        {TOUCH ? 'tap' : 'click'} the space to add points · drag them into a drawing
      </p>
    </div>
  )
}

/* ---------------- Print: the live specimen ---------------- */

/* the sliders and the glyph drive the same two values: dragging the
   letter scrubs weight on x and height on y, the sliders stay synced */
const FONTS = [
  { label: 'Fraunces', family: "'Fraunces Variable', Georgia, serif", variable: true },
  { label: 'Playfair', family: "'Playfair Display Variable', Georgia, serif" },
  { label: 'Bricolage', family: "'Bricolage Grotesque Variable', system-ui, sans-serif" },
  { label: 'Unbounded', family: "'Unbounded Variable', system-ui, sans-serif" },
  { label: 'Caveat', family: "'Caveat Variable', ui-rounded, cursive" },
  { label: 'Pepi', family: "'Pepi', 'Inter Variable', sans-serif" },
  { label: 'Inter', family: "'Inter Variable', system-ui, sans-serif" },
]
const glyphStyle = (f, weight, alt) => ({
  fontFamily: f.family,
  fontStyle: alt ? 'italic' : 'normal',
  ...(f.variable
    ? { fontVariationSettings: `'opsz' 144, 'wght' ${weight}, 'SOFT' 0, 'WONK' ${alt ? 1 : 0}` }
    : { fontWeight: Math.round(weight) }),
})

function PrintLetter() {
  const [font, setFont] = useState(0)
  const [weight, setWeight] = useState(620)
  const [height, setHeight] = useState(1)
  const [alt, setAlt] = useState(false)
  const [ghosts, setGhosts] = useState([])
  const letterRef = useRef(null)
  const stageRef = useRef(null)
  const ghostId = useRef(0)

  useEffect(() => {
    if (REDUCED()) return
    gsap.from(letterRef.current, { scale: 0.7, duration: 0.8, ease: 'back.out(1.8)' })
    gsap.from('.print-controls > *', {
      y: 12,
      stagger: 0.07,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.3,
    })
  }, [])

  // drag the glyph itself: x scrubs the weight axis, y the height.
  // A press that never travels is a tap = next typeface + proof stamp.
  // Bound once; refs carry the live values so a re-render mid-drag
  // can never reset the gesture.
  const live = useRef({ weight, height })
  live.current = { weight, height }
  const stampRef = useRef(null)
  useEffect(() => {
    const el = letterRef.current
    let start = null
    const down = (e) => {
      e.preventDefault()
      el.setPointerCapture(e.pointerId)
      start = { x: e.clientX, y: e.clientY, ...live.current, moved: false }
    }
    const move = (e) => {
      if (!start) return
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y
      if (Math.abs(dx) + Math.abs(dy) > 6) start.moved = true
      setWeight(gsap.utils.clamp(100, 900, start.weight + dx * 3.2))
      setHeight(gsap.utils.clamp(0.7, 1.5, start.height + dy * 0.005))
    }
    const up = () => {
      if (start && !start.moved) stampRef.current?.()
      start = null
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [])

  // next typeface; the outgoing cut stays behind as a faint proof stamp
  const stamp = () => {
    setGhosts((g) => {
      const next = [
        ...g,
        {
          id: ghostId.current++,
          font,
          weight,
          height,
          alt,
          x: gsap.utils.random(12, 72),
          y: gsap.utils.random(8, 46),
          rot: gsap.utils.random(-14, 14),
        },
      ]
      return next.slice(-4)
    })
    setFont((f) => (f + 1) % FONTS.length)
    if (REDUCED()) return
    gsap.fromTo(
      letterRef.current,
      { scale: 0.82, rotate: gsap.utils.random(-5, 5) },
      { scale: 1, rotate: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' },
    )
    requestAnimationFrame(() => {
      const all = stageRef.current?.querySelectorAll('.print-ghost')
      const born = all?.[all.length - 1]
      if (born) gsap.from(born, { scale: 1.25, duration: 0.5, ease: 'power3.out' })
    })
  }
  stampRef.current = stamp

  const f = FONTS[font]
  return (
    <div className="print-stage" ref={stageRef} aria-hidden="true">
      {/* the proof sheet: every discarded cut stays stamped behind */}
      {ghosts.map((g) => (
        <span
          key={g.id}
          className="print-ghost"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            transform: `rotate(${g.rot}deg) scaleY(${g.height})`,
            ...glyphStyle(FONTS[g.font], g.weight, g.alt),
          }}
        >
          A
        </span>
      ))}
      <span className="print-letter-wrap" style={{ transform: `scaleY(${height})` }}>
        <span
          ref={letterRef}
          className="print-letter"
          style={glyphStyle(f, weight, alt)}
          data-cursor="grow"
        >
          A
        </span>
      </span>
      <div className="print-controls">
        <label className="print-ctl">
          <span>height</span>
          <input
            type="range"
            min="0.7"
            max="1.5"
            step="0.01"
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
          />
        </label>
        <label className="print-ctl">
          <span>weight</span>
          <input
            type="range"
            min="100"
            max="900"
            step="1"
            value={Math.round(weight)}
            onChange={(e) => setWeight(+e.target.value)}
          />
        </label>
        <button
          type="button"
          className={`print-alt ${alt ? 'print-alt--on' : ''}`}
          onClick={() => setAlt((a) => !a)}
          aria-pressed={alt}
        >
          alternates
        </button>
      </div>
      <p className="stage-caption">
        {f.label} · drag the A to bend it · {TOUCH ? 'tap' : 'click'} it for the next cut
      </p>
    </div>
  )
}

/* ---------------- Code: source you can tweak ---------------- */

/* two live values in the markup: the theme class and the label. Tap
   them to cycle, then render - three languages, on brand */
const THEMES = ['thing', 'cool', 'ink']
const LABELS = ['ahoj!', 'ciao!', 'hello!']

const BURST = Array.from({ length: 6 }, (_, i) => ({
  angle: (i / 6) * Math.PI * 2 - Math.PI / 2,
  azure: i % 2 === 1,
}))

function CodeLine() {
  const [show, setShow] = useState(false)
  const [theme, setTheme] = useState(0)
  const [label, setLabel] = useState(0)
  const [tweaked, setTweaked] = useState(false) // stops the "edit me" pulse
  const rootRef = useRef(null)
  const wasShown = useRef(false)

  useEffect(() => {
    if (REDUCED()) return
    // clearProps: the CSS class owns this element's transform for the
    // 3D flip - a leftover inline transform from the tween would win
    // over the class and block the rotation
    gsap.from(rootRef.current.querySelector('.code-flip'), {
      y: 26,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'all',
    })
  }, [])

  // the moment the element renders, asterisks burst out from behind it
  useEffect(() => {
    if (!show || wasShown.current === show) {
      wasShown.current = show
      return
    }
    wasShown.current = show
    if (REDUCED()) return
    const asts = rootRef.current.querySelectorAll('.code-burst-ast')
    asts.forEach((el, i) => {
      const { angle } = BURST[i]
      const dist = gsap.utils.random(70, 120)
      gsap.fromTo(
        el,
        { x: 0, y: 0, scale: gsap.utils.random(0.8, 1.1), rotation: 0 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          scale: 0,
          rotation: gsap.utils.random(-140, 140),
          duration: gsap.utils.random(0.7, 1),
          delay: 0.25,
          ease: 'power2.out',
          overwrite: true,
        },
      )
    })
  }, [show])

  const pop = (e) => {
    if (REDUCED()) return
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.7 },
      { scale: 1, duration: 0.45, ease: 'back.out(3)', clearProps: 'transform' },
    )
  }
  const cycleTheme = (e) => {
    e.stopPropagation()
    setTweaked(true)
    setTheme((t) => (t + 1) % THEMES.length)
    pop(e)
  }
  const cycleLabel = (e) => {
    e.stopPropagation()
    setTweaked(true)
    setLabel((l) => (l + 1) % LABELS.length)
    pop(e)
  }

  return (
    <div
      className="code-stage"
      ref={rootRef}
      onClick={() => setShow((v) => !v)}
      aria-hidden="true"
    >
      <div className={`code-flip ${show ? 'code-flip--on' : ''}`}>
        <div className="code-face code-face--src">
          <span className="code-chrome">
            <i />
            <i />
            <i />
          </span>
          <code className={`code-src ${tweaked ? '' : 'code-src--hint'}`}>
            <span className="tok-p">&lt;</span>
            <span className="tok-tag">button</span>{' '}
            <span className="tok-attr">class</span>
            <span className="tok-p">=</span>
            <span className="tok-p">"</span>
            <button type="button" className="tok-btn tok-str" onClick={cycleTheme}>
              {THEMES[theme]}
            </button>
            <span className="tok-p">"</span>
            <span className="tok-p">&gt;</span>
            <button type="button" className="tok-btn tok-txt" onClick={cycleLabel}>
              {LABELS[label]}
            </button>
            <span className="tok-p">&lt;/</span>
            <span className="tok-tag">button</span>
            <span className="tok-p">&gt;</span>
          </code>
        </div>
        <div className="code-face code-face--out">
          <span className="code-burst">
            {BURST.map((b, i) => (
              <BrandAsterisk
                key={i}
                className={`code-burst-ast ${b.azure ? 'code-burst-ast--azure' : ''}`}
              />
            ))}
          </span>
          <span className={`code-demo-btn code-demo-btn--${THEMES[theme]}`}>
            {LABELS[label]}
            <BrandAsterisk className="code-demo-ast" />
          </span>
        </div>
      </div>
      <p className="stage-caption">
        {show
          ? TOUCH
            ? 'tap to flip it back'
            : 'click to flip it back'
          : `${TOUCH ? 'tap' : 'click'} the boxed values · then anywhere to run it`}
      </p>
    </div>
  )
}

/* ---------------- The stage ---------------- */

const MODES = [
  { id: 'design', label: 'Design' },
  { id: 'print', label: 'Print' },
  { id: 'code', label: 'Code' },
]

export default function HeroStage() {
  const [mode, setMode] = useState('design')
  const rootRef = useRef(null)
  const tabsRef = useRef(null)
  const indRef = useRef(null)
  const indReady = useRef(false)

  useEffect(() => {
    if (REDUCED()) return
    gsap.from(rootRef.current, {
      y: 42,
      duration: 1,
      ease: 'power3.out',
      delay: 1.2,
      clearProps: 'all',
    })
  }, [])

  // the active-tab pill slides between tabs instead of jumping
  useLayoutEffect(() => {
    const place = () => {
      const btn = tabsRef.current?.querySelector('[aria-selected="true"]')
      if (!btn || !indRef.current) return
      const target = { x: btn.offsetLeft, width: btn.offsetWidth }
      if (!indReady.current) {
        gsap.set(indRef.current, target)
        indReady.current = true
      } else {
        gsap.to(indRef.current, { ...target, duration: 0.45, ease: 'power3.out' })
      }
    }
    place()
    document.fonts?.ready?.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [mode])

  return (
    <div className="hero-stage" ref={rootRef}>
      <div className="stage-canvas">
        <span className="stage-mark stage-mark--tl" aria-hidden="true" />
        <span className="stage-mark stage-mark--tr" aria-hidden="true" />
        <span className="stage-mark stage-mark--bl" aria-hidden="true" />
        <span className="stage-mark stage-mark--br" aria-hidden="true" />
        {mode === 'design' && <PenTool />}
        {mode === 'print' && <PrintLetter />}
        {mode === 'code' && <CodeLine />}
      </div>
      <div className="stage-tabs" role="tablist" aria-label="Pick a craft to play with" ref={tabsRef}>
        <span className="stage-tab-ind" ref={indRef} aria-hidden="true" />
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            className={`stage-tab ${mode === m.id ? 'stage-tab--active' : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}
