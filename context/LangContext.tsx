'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { STR, type Lang, type Translations } from '@/lib/data'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  L: Translations
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  L: STR.en,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kacpur_lang') as Lang | null
      if (stored === 'en' || stored === 'pl') setLangState(stored)
    } catch {}
  }, [])

  const setLang = (code: Lang) => {
    setLangState(code)
    try { localStorage.setItem('kacpur_lang', code) } catch {}
    document.documentElement.lang = code
  }

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, L: STR[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
