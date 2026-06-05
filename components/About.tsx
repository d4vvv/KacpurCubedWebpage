'use client'

import { useRef, useEffect } from 'react'
import { useLang } from '@/context/LangContext'
import { Brackets } from './GlitchText'

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

export default function About() {
  const { L } = useLang()
  const ref = useScrollReveal()

  return (
    <section className="section section-alt" id="process" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-intro reveal">
          <div className="sec-head">
            <span className="sec-tag"><i className="dot" /> {L.about.tag}</span>
            <h2 className="sec-title">{L.about.title}</h2>
          </div>
          <p className="about-lead">{L.about.lead}</p>
          <div className="about-photo">
            <figure className="studio-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/studio-artist.jpg" alt="Kacpur in the studio with a cube mosaic" />
              <span className="gal-scan" />
              <Brackets />
            </figure>
          </div>
        </div>
        <ol className="process">
          {L.process.map((s, i) => (
            <li key={s.n} className="proc reveal" style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="proc-n">{s.n}</span>
              <div><b>{s.t}</b><p>{s.d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
