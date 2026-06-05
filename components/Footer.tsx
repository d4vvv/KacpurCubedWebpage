'use client'

import { useLang } from '@/context/LangContext'
import { BRAND } from '@/lib/data'
import { Cube3D } from './Icon'

export default function Footer({ onJump }: { onJump: (id: string) => void }) {
  const { L } = useLang()
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a className="brand" onClick={() => onJump('top')} style={{ cursor: 'pointer' }}>
            <Cube3D size={22} /><span>{BRAND.name}<sup>{BRAND.cubed}</sup></span>
          </a>
          <p>{L.footer.tagline}</p>
        </div>
        <div className="footer-cols">
          <div className="fcol">
            <span className="fcol-h">{L.footer.explore}</span>
            <a onClick={() => onJump('work')} style={{ cursor: 'pointer' }}>{L.nav.work}</a>
            <a onClick={() => onJump('process')} style={{ cursor: 'pointer' }}>{L.nav.process}</a>
            <a onClick={() => onJump('pricing')} style={{ cursor: 'pointer' }}>{L.nav.pricing}</a>
          </div>
          <div className="fcol">
            <span className="fcol-h">{L.footer.connect}</span>
            <a href={BRAND.igUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={BRAND.ttUrl} target="_blank" rel="noreferrer">TikTok ↗</a>
            <a href={`mailto:${BRAND.email}`}>{L.contact.email}</a>
            <a onClick={() => onJump('contact')} style={{ cursor: 'pointer' }}>{L.nav.commission}</a>
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <span>© {new Date().getFullYear()} {BRAND.name}{BRAND.cubed} · {L.footer.studio}</span>
        <span className="footer-built"><Cube3D size={14} /> {L.footer.built}</span>
      </div>
    </footer>
  )
}
