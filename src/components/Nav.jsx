import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './Reveal.jsx'
import { useUI } from '../i18n/LangContext.jsx'
import LangSwitcher from '../i18n/LangSwitcher.jsx'
import logo from '../assets/logo.svg'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const ui = useUI()

  const links = [
    { href: '#work', label: ui.nav.work },
    { href: '#about', label: ui.nav.about },
    { href: '#contact', label: ui.nav.contact },
  ]

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
      <a className="skip-link" href="#main">
        {ui.nav.skip}
      </a>
      <nav className="nav-inner container" aria-label={ui.nav.menu}>
        <a href="#top" className="logo" aria-label={ui.nav.backToTop}>
          <img src={logo} alt="" className="logo-img" />
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="nav-link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <LangSwitcher />
        </div>
      </nav>
    </motion.header>
  )
}
