'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/context/LangContext'
import { BRAND } from '@/lib/data'
import Icon, { Cube3D } from './Icon'

interface NavProps {
  onJump: (id: string) => void
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang" role="group" aria-label="Language">
      {(['en', 'pl'] as const).map(code => (
        <button key={code} className={`lang-btn${lang === code ? ' on' : ''}`}
          onClick={() => setLang(code)} aria-pressed={lang === code}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function Nav({ onJump }: NavProps) {
  const { L } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links: [string, string][] = [
    [L.nav.work, 'work'], [L.nav.process, 'process'],
    [L.nav.pricing, 'pricing'], [L.nav.contact, 'contact'],
  ]
  const go = (id: string) => { setOpen(false); onJump(id) }

  return (
    <header className={`nav${scrolled ? ' nav-on' : ''}`}>
      <div className="nav-inner">
        <a className="brand" onClick={() => go('top')} style={{ cursor: 'pointer' }}>
          <Cube3D size={24} />
          <span>{BRAND.name}<sup>{BRAND.cubed}</sup></span>
        </a>
        <nav className="nav-links">
          {links.map(([t, id]) => (
            <a key={id} onClick={() => go(id)} style={{ cursor: 'pointer' }}>{t}</a>
          ))}
        </nav>
        <div className="nav-cta">
          <LangToggle />
          <a className="ic-btn nav-social" href={BRAND.igUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Icon name="instagram" size={18} />
          </a>
          <a className="ic-btn nav-social" href={BRAND.ttUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
            <Icon name="tiktok" size={18} />
          </a>
          <button className="btn btn-sm" onClick={() => go('contact')}>{L.nav.commission}</button>
          <button className="ic-btn nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>
      <div className={`nav-mobile${open ? ' is-open' : ''}`}>
        {links.map(([t, id], i) => (
          <a key={id} onClick={() => go(id)} style={{ '--i': i } as React.CSSProperties}>{t}</a>
        ))}
        <a href={BRAND.igUrl} target="_blank" rel="noreferrer" style={{ '--i': links.length } as React.CSSProperties}>Instagram ↗</a>
        <a href={BRAND.ttUrl} target="_blank" rel="noreferrer" style={{ '--i': links.length + 1 } as React.CSSProperties}>TikTok ↗</a>
      </div>
    </header>
  )
}
