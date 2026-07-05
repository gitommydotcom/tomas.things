import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = [0.16, 1, 0.3, 1]

/*
 * Big titles rise character by character, each masked inside its word,
 * with a little rotation that settles - GSAP + ScrollTrigger, fired
 * once when the title scrolls into view.
 */
export function SplitTitle({ text, className = '', as: Tag = 'h2' }) {
  const ref = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(ref.current.querySelectorAll('.st-char'), {
        yPercent: 120,
        rotate: 8,
        duration: 0.75,
        ease: 'power4.out',
        stagger: 0.018,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <Tag className={`split-title ${className}`} aria-label={text} ref={ref}>
      {text.split(' ').map((word, wi) => (
        <span className="st-word" key={wi} aria-hidden="true">
          {[...word].map((char, ci) => (
            <span className="st-char" key={ci}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

/*
 * Masked text reveal - content slides up from behind an invisible
 * boundary (overflow:hidden parent), per the Apple-style spec:
 * translateY 110% -> 0, cubic-bezier(0.16, 1, 0.3, 1).
 *
 * The viewport observer must live on the OUTER mask element: the inner
 * span starts fully clipped by overflow:hidden, so observing it directly
 * would never report an intersection and the reveal would never fire.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  as: Tag = 'span',
  className = '',
  ...rest
}) {
  const MotionTag = motion[Tag] ?? motion.span
  return (
    <MotionTag
      className={`mask ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      {...rest}
    >
      <motion.span
        variants={{
          hidden: { y: '125%' },
          visible: { y: '0%', transition: { duration, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.span>
    </MotionTag>
  )
}
