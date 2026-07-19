import { SOCIALS } from '../data/socials.js'

/* External profiles, shown in Contact and Footer. Renders nothing until
   real URLs are filled in (src/data/socials.js). */
export default function Socials({ className = '' }) {
  if (!SOCIALS.length) return null
  return (
    <ul className={`socials ${className}`}>
      {SOCIALS.map(({ label, href }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noreferrer" className="social-link">
            {label}
            <span aria-hidden="true">&thinsp;↗</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
