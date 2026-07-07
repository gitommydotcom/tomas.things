import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { UI } from './ui.js'

/*
 * Tiny i18n layer. One piece of state - the active language - drives the
 * whole site through useUI() (chrome copy) and the project localizer.
 * The choice persists in localStorage and stamps <html lang> so screen
 * readers and the browser get the right language too (cz -> BCP-47 "cs").
 */
export const LANGS = ['en', 'it', 'cz']
export const LANG_LABELS = { en: 'EN', it: 'IT', cz: 'CZ' }
const HTML_LANG = { en: 'en', it: 'it', cz: 'cs' }
const DOC_TITLE = {
  en: 'Tomáš Matějček - graphic designer · ideas into things',
  it: 'Tomáš Matějček - graphic designer · idee in cose',
  cz: 'Tomáš Matějček - grafický designér · nápady ve věci',
}
const STORAGE_KEY = 'tm-lang'

function detectInitial() {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && LANGS.includes(saved)) return saved
  } catch {
    /* private mode - fall through to language detection */
  }
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase()
  if (nav === 'it') return 'it'
  if (nav === 'cs' || nav === 'sk') return 'cz'
  return 'en'
}

const LangContext = createContext({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial)

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang] || 'en'
    if (DOC_TITLE[lang]) document.title = DOC_TITLE[lang]
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang: (next) => {
        if (!LANGS.includes(next)) return
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          /* ignore write failures in private mode */
        }
        setLangState(next)
      },
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

// the chrome/microcopy dictionary for the active language
export function useUI() {
  const { lang } = useLang()
  return UI[lang] ?? UI.en
}
