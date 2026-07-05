import { MotionConfig } from 'framer-motion'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Marquee a={['ideas', 'idee', 'nápady']} b={['things', 'cose', 'věci']} />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
