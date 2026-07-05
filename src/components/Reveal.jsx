import { motion } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

/*
 * Masked text reveal — content slides up from behind an invisible
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
