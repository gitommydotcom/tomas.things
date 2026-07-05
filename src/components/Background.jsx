import { BrandAsterisk } from './Doodles.jsx'

/*
 * Ambient background: three soft color fields and two faint brand
 * asterisks in continuous slow drift behind the whole page.
 * Pure CSS transform animations on composited layers — no JS, no
 * filter blur, nothing that costs frames while scrolling.
 * prefers-reduced-motion freezes it via the global media query.
 */
export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-blob bg-blob--1" />
      <div className="bg-blob bg-blob--2" />
      <div className="bg-blob bg-blob--3" />
      <BrandAsterisk className="bg-asterisk bg-asterisk--big" />
      <BrandAsterisk className="bg-asterisk bg-asterisk--small" />
    </div>
  )
}
