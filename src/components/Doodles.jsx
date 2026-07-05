import { motion } from 'framer-motion'
import { EASE } from './Reveal.jsx'

/*
 * One hand-drawn stroke, many jobs: it underlines "ideas", becomes the
 * idea->thing arrow, and - with two eyes - a family of little creatures.
 * The asterisk is the exact mark from Tomáš's EPS, not a lookalike.
 */

const strokeProps = {
  fill: 'none',
  stroke: 'var(--pink)',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* The exact brand asterisk (vector path from EPS/asterisk.eps). */
export function BrandAsterisk({ className = '', ...rest }) {
  return (
    <svg viewBox="0 0.3 28.6 28.4" aria-hidden="true" className={className} {...rest}>
      <path
        fill="currentColor"
        d="M 14.29 28.61 C 13.38 28.61 12.65 28.28 12.11 27.62 C 11.56 26.96 11.29 25.97 11.29 24.65 C 11.29 23.04 11.28 21.81 11.25 20.95 C 11.22 20.09 11.11 19.52 10.91 19.22 C 10.72 18.92 10.38 18.85 9.90 19.00 C 9.68 19.09 9.34 19.32 8.88 19.68 C 8.41 20.04 7.89 20.46 7.32 20.95 C 6.75 21.43 6.18 21.91 5.60 22.37 C 5.03 22.83 4.52 23.21 4.07 23.49 C 3.20 24 2.45 24.16 1.81 23.96 C 1.18 23.76 0.70 23.35 0.37 22.73 C 0.05 22.12 -0.07 21.45 0.04 20.73 C 0.14 20.02 0.50 19.41 1.13 18.90 C 1.75 18.40 2.41 17.92 3.12 17.48 C 3.83 17.04 4.53 16.61 5.21 16.20 C 5.90 15.75 6.52 15.41 7.07 15.16 C 7.62 14.90 7.91 14.66 7.91 14.41 C 7.91 14.26 7.71 14.08 7.32 13.87 C 6.93 13.66 6.43 13.43 5.81 13.17 C 5.19 12.92 4.54 12.65 3.85 12.36 C 3.17 12.08 2.51 11.79 1.88 11.51 C 1.25 11.18 0.86 10.72 0.69 10.14 C 0.52 9.55 0.49 8.96 0.59 8.37 C 0.70 7.77 0.83 7.32 1.00 7.02 C 1.46 6.18 2.08 5.64 2.86 5.41 C 3.63 5.18 4.42 5.33 5.21 5.86 C 5.66 6.12 6.16 6.45 6.72 6.83 C 7.29 7.22 7.85 7.59 8.40 7.96 C 8.96 8.32 9.45 8.61 9.88 8.81 C 10.30 9.02 10.59 9.09 10.73 9.03 C 10.86 8.96 10.96 8.79 11.04 8.50 C 11.11 8.21 11.18 7.85 11.23 7.39 C 11.29 6.94 11.33 6.41 11.36 5.79 C 11.39 5.18 11.40 4.52 11.40 3.81 C 11.40 2.78 11.66 1.94 12.16 1.30 C 12.67 0.66 13.55 0.34 14.79 0.34 C 15.73 0.34 16.34 0.64 16.62 1.25 C 16.89 1.86 17.02 2.68 16.98 3.71 C 16.98 4.30 16.98 4.88 16.99 5.41 C 17 5.95 17.03 6.45 17.08 6.90 C 17.12 7.35 17.22 7.73 17.37 8.04 C 17.52 8.35 17.71 8.55 17.95 8.66 C 18.29 8.82 18.72 8.74 19.25 8.42 C 19.79 8.10 20.42 7.68 21.13 7.16 C 21.84 6.64 22.62 6.18 23.47 5.76 C 24.27 5.39 25.03 5.23 25.75 5.28 C 26.47 5.34 27.06 5.70 27.52 6.39 C 28.23 7.38 28.47 8.35 28.25 9.31 C 28.02 10.27 27.46 11.03 26.55 11.61 C 26.22 11.80 25.79 12.01 25.25 12.23 C 24.71 12.45 24.18 12.67 23.64 12.88 C 23.11 13.09 22.65 13.29 22.28 13.50 C 21.91 13.71 21.71 13.92 21.70 14.11 C 21.66 14.42 21.88 14.78 22.35 15.19 C 22.82 15.59 23.32 15.99 23.86 16.36 C 24.53 16.87 25.27 17.50 26.10 18.24 C 26.92 18.99 27.52 19.64 27.91 20.19 C 28.34 20.81 28.55 21.46 28.54 22.14 C 28.53 22.82 28.34 23.42 27.98 23.92 C 27.62 24.43 27.12 24.74 26.47 24.85 C 25.82 24.96 25.07 24.77 24.22 24.29 C 23.76 24.02 23.18 23.50 22.49 22.73 C 21.79 21.96 20.98 21.08 20.06 20.09 C 19.52 19.54 19.04 19.03 18.60 18.56 C 18.17 18.08 17.80 18 17.51 18.31 C 17.30 18.55 17.19 19.04 17.18 19.78 C 17.16 20.52 17.16 21.35 17.20 22.27 C 17.24 23.20 17.23 24.07 17.18 24.88 C 17.12 26.03 16.86 26.93 16.40 27.61 C 15.93 28.28 15.23 28.61 14.29 28.61"
      />
    </svg>
  )
}

export function SqUnderline({ delay = 0, ...rest }) {
  return (
    <svg viewBox="0 0 220 26" aria-hidden="true" {...rest}>
      <motion.path
        d="M6 16 C 44 5, 80 22, 116 12 C 150 3, 182 18, 214 10"
        strokeWidth="7"
        {...strokeProps}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      />
    </svg>
  )
}

export function SqArrow({ delay = 0, inView = true, draw = true, ...rest }) {
  // draw={false} renders the full stroke statically. iOS Safari can leave
  // the pathLength-animated version stuck at 0 (three round caps - reads
  // as two dots), so anything that must render everywhere uses this.
  if (!draw) {
    return (
      <svg viewBox="0 0 130 56" aria-hidden="true" {...rest}>
        <path
          d="M6 40 C 34 12, 68 46, 104 26 M104 26 L 84 18 M104 26 L 90 43"
          strokeWidth="6.5"
          {...strokeProps}
        />
      </svg>
    )
  }
  const anim = inView
    ? { whileInView: { pathLength: 1 }, viewport: { once: true, margin: '-10% 0px' } }
    : { animate: { pathLength: 1 } }
  return (
    <svg viewBox="0 0 130 56" aria-hidden="true" {...rest}>
      <motion.path
        d="M6 40 C 34 12, 68 46, 104 26 M104 26 L 84 18 M104 26 L 90 43"
        strokeWidth="6.5"
        {...strokeProps}
        initial={{ pathLength: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        {...anim}
      />
    </svg>
  )
}


/* The classic: a wavy line that grew a pair of eyes. */
export function SqCreature({ eyeRef, ...props }) {
  return (
    <svg viewBox="0 0 130 74" aria-hidden="true" {...props}>
      <path
        className="creature-body"
        d="M8 58 C 18 22, 46 24, 54 48 C 61 68, 88 66, 97 42 C 100 34, 104 28, 112 26"
        strokeWidth="7"
        {...strokeProps}
      />
      <g className="creature-eyes" ref={eyeRef}>
        <circle cx="100" cy="16" r="5.5" fill="var(--ink)" />
        <circle cx="115" cy="12" r="5.5" fill="var(--ink)" />
      </g>
    </svg>
  )
}

/* A tall squiggle with a little waving arm.
   The viewBox has headroom above so the waving arm never gets clipped. */
export function WaveCreature(props) {
  return (
    <svg viewBox="0 -18 64 102" aria-hidden="true" {...props}>
      <path
        d="M26 80 C 10 62, 36 50, 24 32 C 18 23, 22 14, 30 10"
        strokeWidth="7"
        {...strokeProps}
      />
      <path
        className="creature-arm"
        d="M30 10 C 40 8, 46 12, 54 6"
        strokeWidth="7"
        {...strokeProps}
      />
      <g className="creature-eyes">
        <circle cx="30" cy="22" r="4.5" fill="var(--ink)" />
        <circle cx="41" cy="20" r="4.5" fill="var(--ink)" />
      </g>
    </svg>
  )
}
