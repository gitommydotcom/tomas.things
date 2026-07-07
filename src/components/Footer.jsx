import { useUI } from '../i18n/LangContext.jsx'

/* Viky now lives down in the contact section (bottom-left, by the email
   button), so the footer keeps just the sign-off line. */
export default function Footer() {
  const ui = useUI()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-note">
          © {new Date().getFullYear()} Tomáš Matějček - {ui.footer.note}
        </p>
      </div>
    </footer>
  )
}
