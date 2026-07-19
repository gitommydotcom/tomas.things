import { useUI } from '../i18n/LangContext.jsx'
import Socials from './Socials.jsx'

// TODO(Tomáš): fill in your P.IVA - Italian law requires it on the site
// of anyone invoicing; it renders automatically once set
const VAT = ''

/* Viky now lives down in the contact section (bottom-left, by the email
   button), so the footer keeps the sign-off line plus the outward links. */
export default function Footer() {
  const ui = useUI()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Socials className="footer-socials" />
        <p className="footer-note">
          © {new Date().getFullYear()} Tomáš Matějček
          {VAT ? ` · P.IVA ${VAT}` : ''} - {ui.footer.note}
        </p>
      </div>
    </footer>
  )
}
