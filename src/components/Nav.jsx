import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './Reveal.jsx'
import logo from '../assets/logo.svg'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -14 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
    >
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <nav className="nav-inner container" aria-label="Main">
        <a href="#top" className="logo" aria-label="tomáš - back to top">
          <img src={logo} alt="" className="logo-img" />
        </a>
        <ul className="nav-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="nav-link">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
