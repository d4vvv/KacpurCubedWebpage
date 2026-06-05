'use client'

import { useState, useCallback } from 'react'
import { LangProvider } from '@/context/LangContext'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

function PageInner() {
  const [intentIdx, setIntentIdx] = useState(1)

  const jump = useCallback((id: string) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const choosePlan = useCallback((key: string) => {
    const map: Record<string, number> = { full: 1, small: 1, brand: 2 }
    setIntentIdx(map[key] ?? 1)
    jump('contact')
  }, [jump])

  return (
    <>
      <Nav onJump={jump} />
      <main>
        <Hero layout="split" onJump={jump} />
        <Gallery onJump={jump} />
        <About />
        <Pricing onChoose={choosePlan} />
        <Contact intentIdx={intentIdx} setIntentIdx={setIntentIdx} />
      </main>
      <Footer onJump={jump} />
    </>
  )
}

export default function Page() {
  return (
    <LangProvider>
      <PageInner />
    </LangProvider>
  )
}
