import { useEffect, useRef } from 'react'

/*
 * Custom pointer: a brand-pink dot that replaces the native cursor on
 * fine-pointer devices. It grows over interactive targets. Touch devices
 * and reduced-motion users keep the native cursor.
 */
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const el = ref.current
    document.documentElement.classList.add('has-cursor')

    const move = (e) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      el.classList.add('cursor--visible')
      const target = e.target.closest(
        'a, button, [role="button"], .flip, [data-cursor="grow"]',
      )
      el.classList.toggle('cursor--grow', !!target)
    }
    const hide = () => el.classList.remove('cursor--visible')
    const down = () => el.classList.add('cursor--down')
    const up = () => el.classList.remove('cursor--down')

    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return <div ref={ref} className="cursor" aria-hidden="true" />
}
