'use client'

import { useRef, useEffect } from 'react'
import { useLang } from '@/context/LangContext'
import { TIERS } from '@/lib/data'
import Icon, { Cube3D } from './Icon'

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

export default function Pricing({ onChoose }: { onChoose: (key: string) => void }) {
  const { L } = useLang()
  const ref = useScrollReveal()

  return (
    <section className="section" id="pricing" ref={ref}>
      <div className="wrap">
        <div className="sec-head center">
          <span className="sec-tag"><i className="dot" /> {L.pricing.tag}</span>
          <h2 className="sec-title">{L.pricing.title}</h2>
          <p className="sec-sub">{L.pricing.sub}</p>
        </div>
        <div className="tiers">
          {TIERS.map(t => {
            const tc = L.tiers[t.key]
            return (
              <div key={t.key} className={`tier reveal${t.featured ? ' tier-on' : ''}`}>
                {t.featured && <span className="tier-flag">{L.pricing.popular}</span>}
                <div className="tier-top">
                  <h3>{tc.name}</h3>
                  <span className="tier-tag">{tc.tag}</span>
                </div>
                <div className="tier-price">{tc.price}</div>
                <div className="tier-cubes"><Cube3D size={15} /> {tc.cubes}</div>
                <ul className="tier-feats">
                  {tc.feats.map(f => (
                    <li key={f}><Icon name="check" size={16} /> {f}</li>
                  ))}
                </ul>
                <button className={`btn${t.featured ? '' : ' btn-ghost'}`} onClick={() => onChoose(t.key)}>
                  {tc.cta}
                </button>
              </div>
            )
          })}
        </div>
        <p className="tier-note"><Icon name="spark" size={15} /> {L.pricing.note}</p>
      </div>
    </section>
  )
}
