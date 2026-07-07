/* Viky now lives down in the contact section (bottom-left, by the email
   button), so the footer keeps just the sign-off line. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-note">
          © {new Date().getFullYear()} Tomáš Matějček - I translate ideas into things.
        </p>
      </div>
    </footer>
  )
}
