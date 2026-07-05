import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BrandAsterisk } from './Doodles.jsx'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'

/* touch devices get tap-worded captions; the interactions themselves
   (pointer drag, sliders, taps) work the same everywhere */
const TOUCH = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

/*
 * The hero's second protagonist: an interactive workbench with three
 * live modes, one per craft. The visitor switches them with the tabs
 * below; every mode is a real little tool, not a looping gif.
 *
 *  Design - a working pen-tool rig: every anchor and handle drags
 *           with pixel precision, clicking the space shuffles it.
 *  Print  - a variable serif specimen (Fraunces): outline glyph with
 *           real height, weight and alternates controls.
 *  Code   - one line of source that flips into the real, fully
 *           dressed element on hover; click keeps it.
 */

/* ---------------- Design: the adjustable bezier ---------------- */

const VB = { w: 290, h: 230 }
const F = 0.55 // visible handle length as a fraction of the control vector

function BezierRig() {
  const rootRef = useRef(null)

  useEffect(() => {
    const svg = rootRef.current.querySelector('svg')
    const q = (sel) => svg.querySelector(sel)
    const curve = q('.rig-curve')
    const hStart = q('.rig-handle--start')
    const hEnd = q('.rig-handle--end')
    const kC1 = q('.rig-knob--c1')
    const kH1 = q('.rig-knob--h1')
    const kH2 = q('.rig-knob--h2')
    const aS = q('.rig-anchor--start')
    const aE = q('.rig-anchor--end')

    // one state object drives every SVG attribute - no React re-renders
    const s = { sx: 34, sy: 192, ex: 252, ey: 78, c1x: 86, c1y: 60, hx: -64, hy: -58, wave: 0 }

    const render = () => {
      const c1y = s.c1y + s.wave * 12
      curve.setAttribute(
        'd',
        `M${s.sx} ${s.sy} C ${s.c1x} ${c1y}, ${s.ex + s.hx} ${s.ey + s.hy}, ${s.ex} ${s.ey}`,
      )
      const k0x = s.sx + (s.c1x - s.sx) * F
      const k0y = s.sy + (c1y - s.sy) * F
      hStart.setAttribute('d', `M${s.sx} ${s.sy} L ${k0x} ${k0y}`)
      kC1.setAttribute('cx', k0x)
      kC1.setAttribute('cy', k0y)
      const k1x = s.ex + s.hx * F
      const k1y = s.ey + s.hy * F
      const k2x = s.ex - s.hx * F
      const k2y = s.ey - s.hy * F
      hEnd.setAttribute('d', `M${k1x} ${k1y} L ${k2x} ${k2y}`)
      kH1.setAttribute('cx', k1x)
      kH1.setAttribute('cy', k1y)
      kH2.setAttribute('cx', k2x)
      kH2.setAttribute('cy', k2y)
      aS.setAttribute('x', s.sx - 7)
      aS.setAttribute('y', s.sy - 7)
      aE.setAttribute('x', s.ex - 8)
      aE.setAttribute('y', s.ey - 8)
    }
    render()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let waveTween = null
    const stopWave = () => {
      if (!waveTween) return
      waveTween.kill()
      waveTween = null
      s.c1y += s.wave * 12 // bake the breath in so nothing jumps
      s.wave = 0
      render()
    }
    const startWave = () => {
      if (reduced || waveTween) return
      waveTween = gsap.to(s, {
        wave: 1,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        onUpdate: render,
      })
    }

    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.fromTo(
        curve,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.1, ease: 'power3.out', delay: 0.1 },
      )
      gsap.from([hStart, hEnd, kC1, kH1, kH2, aS, aE], {
        scale: 0,
        transformOrigin: '50% 50%',
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(2.2)',
        delay: 0.6,
      })
      startWave()
    }, svg)

    // --- precise pointer work: map client coords to viewBox coords ---
    const toVB = (e) => {
      const r = svg.getBoundingClientRect()
      return [
        gsap.utils.clamp(8, VB.w - 8, ((e.clientX - r.left) / r.width) * VB.w),
        gsap.utils.clamp(8, VB.h - 8, ((e.clientY - r.top) / r.height) * VB.h),
      ]
    }
    let dragKind = null
    let dragged = false
    const down = (e) => {
      const t = e.target.closest('[data-drag]')
      if (!t) return
      e.preventDefault()
      svg.setPointerCapture(e.pointerId)
      stopWave() // the visitor takes control; nothing may drift under the pointer
      dragKind = t.dataset.drag
      dragged = false
    }
    const move = (e) => {
      if (!dragKind) return
      const [x, y] = toVB(e)
      dragged = true
      if (dragKind === 'start') {
        // the anchor carries its handle along, like a real pen tool
        s.c1x += x - s.sx
        s.c1y += y - s.sy
        s.sx = x
        s.sy = y
      } else if (dragKind === 'end') {
        s.ex = x
        s.ey = y
      } else if (dragKind === 'c1') {
        s.c1x = s.sx + (x - s.sx) / F
        s.c1y = s.sy + (y - s.sy) / F
      } else if (dragKind === 'h1') {
        s.hx = (x - s.ex) / F
        s.hy = (y - s.ey) / F
      } else if (dragKind === 'h2') {
        s.hx = (s.ex - x) / F
        s.hy = (s.ey - y) / F
      }
      render()
    }
    const up = () => {
      dragKind = null
    }
    // clicking the empty space (never a drag) shuffles the curve
    const shuffle = (e) => {
      if (e.target.closest('[data-drag]') || dragged) return
      const to = {
        c1x: gsap.utils.random(30, 150),
        c1y: gsap.utils.random(16, 120),
        hx: gsap.utils.random(-110, -30),
        hy: gsap.utils.random(-95, 40),
        ey: gsap.utils.random(45, 130),
      }
      if (reduced) {
        Object.assign(s, to)
        render()
      } else {
        gsap.to(s, {
          ...to,
          duration: 0.9,
          ease: 'elastic.out(1, 0.45)',
          onUpdate: render,
          overwrite: 'auto',
        })
      }
    }
    const enter = () => stopWave()
    const leave = () => {
      if (!dragKind) startWave()
    }

    svg.addEventListener('pointerdown', down)
    svg.addEventListener('pointermove', move)
    svg.addEventListener('pointerup', up)
    svg.addEventListener('pointercancel', up)
    svg.addEventListener('click', shuffle)
    svg.addEventListener('pointerenter', enter)
    svg.addEventListener('pointerleave', leave)
    return () => {
      svg.removeEventListener('pointerdown', down)
      svg.removeEventListener('pointermove', move)
      svg.removeEventListener('pointerup', up)
      svg.removeEventListener('pointercancel', up)
      svg.removeEventListener('click', shuffle)
      svg.removeEventListener('pointerenter', enter)
      svg.removeEventListener('pointerleave', leave)
      waveTween?.kill()
      ctx.revert()
    }
  }, [])

  return (
    <div className="rig" ref={rootRef}>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} aria-hidden="true">
        <rect width={VB.w} height={VB.h} fill="transparent" />
        <path
          className="rig-curve"
          d=""
          pathLength="1"
          strokeDasharray="1"
          fill="none"
          stroke="var(--azure)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path className="rig-handle rig-handle--start" d="" />
        <path className="rig-handle rig-handle--end" d="" />
        <circle className="rig-knob rig-knob--c1" r="7" data-drag="c1" />
        <circle className="rig-knob rig-knob--h1" r="7" data-drag="h1" />
        <circle className="rig-knob rig-knob--h2" r="7" data-drag="h2" />
        <rect className="rig-anchor rig-anchor--start" width="14" height="14" data-drag="start" />
        <rect className="rig-anchor rig-anchor--end" width="16" height="16" data-drag="end" />
      </svg>
      <p className="stage-caption">
        drag the points · {TOUCH ? 'tap' : 'click'} the space to shuffle
      </p>
    </div>
  )
}

/* ---------------- Print: the variable serif specimen ---------------- */

function PrintLetter() {
  const [weight, setWeight] = useState(620)
  const [height, setHeight] = useState(1)
  const [alt, setAlt] = useState(false)
  const letterRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(letterRef.current, { scale: 0.7, duration: 0.8, ease: 'back.out(1.8)' })
    gsap.from('.print-controls > *', {
      y: 12,
      stagger: 0.07,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.3,
    })
  }, [])

  const stamp = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      letterRef.current,
      { scale: 0.82, rotate: gsap.utils.random(-5, 5) },
      { scale: 1, rotate: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' },
    )
  }

  return (
    <div className="print-stage" aria-hidden="true">
      <span className="print-letter-wrap" style={{ transform: `scaleY(${height})` }}>
        {/* the capital A, azure outline; "alternates" swaps in the
            italic cut - Fraunces' genuinely different letterform */}
        <span
          ref={letterRef}
          className="print-letter"
          style={{
            fontVariationSettings: `'opsz' 144, 'wght' ${weight}, 'SOFT' 0, 'WONK' ${alt ? 1 : 0}`,
            fontStyle: alt ? 'italic' : 'normal',
          }}
          onClick={stamp}
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
            value={weight}
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
        Fraunces · pull the sliders · {TOUCH ? 'tap' : 'click'} the A to stamp it
      </p>
    </div>
  )
}

/* ---------------- Code: source that renders ---------------- */

/* asterisk burst when the element compiles: fixed polar directions,
   alternating brand colors */
const BURST = Array.from({ length: 6 }, (_, i) => ({
  angle: (i / 6) * Math.PI * 2 - Math.PI / 2,
  azure: i % 2 === 1,
}))

function CodeLine() {
  const [pinned, setPinned] = useState(false)
  const [hover, setHover] = useState(false)
  const rootRef = useRef(null)
  const wasShown = useRef(false)
  const show = pinned || hover

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // no fade: the asterisks pop in at full ink and shrink away as
    // they fly out
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

  return (
    <div
      className="code-stage"
      ref={rootRef}
      onClick={() => setPinned((p) => !p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-hidden="true"
    >
      <div className={`code-flip ${show ? 'code-flip--on' : ''}`}>
        <div className="code-face code-face--src">
          <span className="code-chrome">
            <i />
            <i />
            <i />
          </span>
          <code className="code-src">
            <span className="tok-p">&lt;</span>
            <span className="tok-tag">button</span>{' '}
            <span className="tok-attr">class</span>
            <span className="tok-p">=</span>
            <span className="tok-str">"thing"</span>
            <span className="tok-p">&gt;</span>
            <span className="tok-txt">ahoj!</span>
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
          <span className="code-demo-btn">
            ahoj!
            <BrandAsterisk className="code-demo-ast" />
          </span>
        </div>
      </div>
      <p className="stage-caption">
        {show
          ? TOUCH
            ? 'tap to flip it back'
            : 'click to keep it'
          : TOUCH
            ? 'tap to render it'
            : 'hover to render it'}
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
        {mode === 'design' && <BezierRig />}
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
