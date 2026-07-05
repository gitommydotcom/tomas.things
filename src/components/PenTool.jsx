import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/*
 * The designer's tell, now alive: a bézier curve with a working pen-tool
 * handle. It breathes on its own, the handle swings when you hover
 * (bending the curve exactly like a real vector tool would), and every
 * click redraws the curve into a new random shape.
 *
 * All geometry is derived from one tiny state object and written
 * straight to SVG attributes - no React re-renders, no layout work.
 */
const START = { x: 16, y: 116 }
const END = { x: 206, y: 70 }
const BASE_H = { x: -56, y: -48 } // handle vector: c2 - END
const KNOB = 0.55 // visible handle length as a fraction of the vector

const rot = (x, y, rad, k = 1) => [
  (x * Math.cos(rad) - y * Math.sin(rad)) * k,
  (x * Math.sin(rad) + y * Math.cos(rad)) * k,
]

export default function PenTool({ className = '' }) {
  const svgRef = useRef(null)

  useLayoutEffect(() => {
    const svg = svgRef.current
    const q = (s) => svg.querySelector(s)
    const curve = q('.pen-curve')
    const handle = q('.pen-handle')
    const knobA = q('.pen-knob--a')
    const knobB = q('.pen-knob--b')

    // s.wave is an additive breath on the first control point, so the
    // idle animation never fights the hover/click tweens
    const s = { c1x: 60, c1y: 36, hx: BASE_H.x, hy: BASE_H.y, wave: 0 }
    let base = { ...BASE_H } // hover swings around this; click replaces it

    const render = () => {
      const c1y = s.c1y + s.wave * 14
      const c2x = END.x + s.hx
      const c2y = END.y + s.hy
      curve.setAttribute(
        'd',
        `M${START.x} ${START.y} C ${s.c1x} ${c1y}, ${c2x} ${c2y}, ${END.x} ${END.y}`,
      )
      const ax = END.x + s.hx * KNOB
      const ay = END.y + s.hy * KNOB
      const bx = END.x - s.hx * KNOB
      const by = END.y - s.hy * KNOB
      handle.setAttribute('d', `M${ax} ${ay} L ${bx} ${by}`)
      knobA.setAttribute('cx', ax)
      knobA.setAttribute('cy', ay)
      knobB.setAttribute('cx', bx)
      knobB.setAttribute('cy', by)
    }
    render()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // entrance: the curve draws itself, then the rig pops in
      gsap.fromTo(
        curve,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power3.out', delay: 1.4 },
      )
      gsap.from([handle, knobA, knobB, q('.pen-anchor'), q('.pen-anchor--start')], {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: '50% 50%',
        stagger: 0.07,
        duration: 0.5,
        ease: 'back.out(2.2)',
        delay: 2.1,
      })
      // idle: the whole rig floats, the curve breathes
      gsap.to(svg, {
        y: -8,
        rotation: -2.5,
        duration: 3.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to(s, {
        wave: 1,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        onUpdate: render,
      })
    }, svg)

    const swing = (rad, k, dur, ease) => {
      const [hx, hy] = rot(base.x, base.y, rad, k)
      gsap.to(s, { hx, hy, duration: dur, ease, onUpdate: render, overwrite: 'auto' })
    }
    const enter = () => {
      swing(-0.38, 1.2, 0.6, 'power3.out')
      gsap.to([knobA, knobB], { scale: 1.5, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' })
    }
    const leave = () => {
      swing(0, 1, 0.7, 'power3.out')
      gsap.to([knobA, knobB], { scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'power3.out' })
    }
    const click = () => {
      const [bx, by] = rot(
        BASE_H.x,
        BASE_H.y,
        gsap.utils.random(-0.8, 0.8),
        gsap.utils.random(0.75, 1.35),
      )
      base = { x: bx, y: by }
      gsap.to(s, {
        c1x: gsap.utils.random(34, 104),
        c1y: gsap.utils.random(12, 70),
        hx: bx,
        hy: by,
        duration: 0.9,
        ease: 'elastic.out(1, 0.45)',
        onUpdate: render,
        overwrite: 'auto',
      })
      gsap.fromTo(svg, { scale: 0.96 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' })
    }

    svg.addEventListener('mouseenter', enter)
    svg.addEventListener('mouseleave', leave)
    svg.addEventListener('click', click)
    return () => {
      svg.removeEventListener('mouseenter', enter)
      svg.removeEventListener('mouseleave', leave)
      svg.removeEventListener('click', click)
      ctx.revert()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="-10 -10 280 170"
      aria-hidden="true"
      className={className}
      data-cursor="grow"
    >
      {/* invisible hit surface: hover and click work on the whole rig,
          not just on the strokes themselves */}
      <rect x="-10" y="-10" width="280" height="170" fill="transparent" />
      {/* the curve being drawn; pathLength=1 keeps the dash trick and
          the live d-attribute morphs compatible */}
      <path
        className="pen-curve"
        d=""
        pathLength="1"
        strokeDasharray="1"
        fill="none"
        stroke="var(--azure)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* tangent handle through the live anchor */}
      <path
        className="pen-handle"
        d=""
        fill="none"
        stroke="var(--ink-50)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle className="pen-knob pen-knob--a" r="6" fill="var(--pink)" />
      <circle className="pen-knob pen-knob--b" r="6" fill="var(--pink)" />
      <rect
        className="pen-anchor"
        x={END.x - 7}
        y={END.y - 7}
        width="14"
        height="14"
        fill="var(--ink)"
      />
      <rect
        className="pen-anchor--start"
        x={START.x - 6}
        y={START.y - 6}
        width="12"
        height="12"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
    </svg>
  )
}
