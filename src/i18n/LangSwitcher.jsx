import { LANGS, LANG_LABELS, useLang, useUI } from './LangContext.jsx'

/*
 * The language chooser. Two looks off the same state:
 *  - "nav"    : a compact segmented control for the header
 *  - "inline" : EN · IT · CZ, matching the resting label in the contact
 *               section, so the words already sitting there become live
 */
export default function LangSwitcher({ variant = 'nav', className = '' }) {
  const { lang, setLang } = useLang()
  const ui = useUI()

  if (variant === 'inline') {
    return (
      <span className={`lang-inline ${className}`} role="group" aria-label={ui.nav.language}>
        {LANGS.map((l, i) => (
          <span key={l}>
            {i > 0 && <span className="lang-inline-sep" aria-hidden="true">·</span>}
            <button
              type="button"
              className={`lang-inline-btn ${l === lang ? 'lang-inline-btn--on' : ''}`}
              aria-pressed={l === lang}
              onClick={() => setLang(l)}
            >
              {LANG_LABELS[l]}
            </button>
          </span>
        ))}
      </span>
    )
  }

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={ui.nav.language}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={`lang-btn ${l === lang ? 'lang-btn--on' : ''}`}
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  )
}
