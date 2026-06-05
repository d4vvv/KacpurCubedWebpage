'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '@/context/LangContext'
import { PIECES, REELS, BRAND } from '@/lib/data'
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

function Reels() {
  const { L } = useLang()
  const rowRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLElement[]>([])
  cardRefs.current = []
  const addRef = (el: HTMLElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el)
  }

  useEffect(() => {
    const touch = window.matchMedia('(hover: none), (max-width: 760px)').matches
    const playOnly = (keep: HTMLElement | null) => cardRefs.current.forEach(card => {
      const v = card.querySelector('video')
      if (!v) return
      if (card === keep) { v.play().catch(() => {}); card.classList.add('is-playing') }
      else { v.pause(); card.classList.remove('is-playing') }
    })
    if (!touch) return
    let raf = 0
    const io = new IntersectionObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        let best: HTMLElement | null = null, bestRatio = 0
        cardRefs.current.forEach(card => {
          const r = card.getBoundingClientRect()
          const vw = window.innerWidth
          const visible = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0))
          const ratio = visible / r.width
          if (ratio > bestRatio) { bestRatio = ratio; best = card }
        })
        if (best && bestRatio > 0.55) playOnly(best)
      })
    }, { threshold: [0, 0.3, 0.6, 0.9], root: rowRef.current })
    cardRefs.current.forEach(c => io.observe(c))
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    const v = e.currentTarget.querySelector('video')
    if (v) { v.play().catch(() => {}); e.currentTarget.classList.add('is-playing') }
  }
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const v = e.currentTarget.querySelector('video')
    if (v) { v.pause(); v.currentTime = 0; e.currentTarget.classList.remove('is-playing') }
  }

  return (
    <div className="reels">
      <div className="reels-head">
        <h3><Icon name="cube" size={18} /> {L.gallery.reelsTitle}</h3>
        <p>{L.gallery.reelsSub}</p>
      </div>
      <div className="reels-row" ref={rowRef}>
        {REELS.map(r => {
          const rc = L.reels[r.id]
          return (
            <figure key={r.id} className="reel" ref={addRef as (el: HTMLElement | null) => void}
              onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <div className="reel-video">
                <video src={r.video} poster={r.poster} muted loop playsInline preload="metadata" />
                <span className="reel-badge"><Icon name="cube" size={13} /> {rc.meta}</span>
                <span className="reel-playicon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                </span>
                <span className="gal-scan" />
              </div>
              <figcaption><b>{rc.title}</b></figcaption>
            </figure>
          )
        })}
      </div>
      <div className="social-cards">
        <a className="social-card sc-ig" href={BRAND.igUrl} target="_blank" rel="noreferrer">
          <span className="sc-ic"><Icon name="instagram" size={24} /></span>
          <span className="sc-body"><b>Instagram</b><span className="sc-handle">@{BRAND.ig}</span></span>
          <span className="sc-go"><Icon name="arrow" size={18} /></span>
        </a>
        <a className="social-card sc-tt" href={BRAND.ttUrl} target="_blank" rel="noreferrer">
          <span className="sc-ic"><Icon name="tiktok" size={24} /></span>
          <span className="sc-body"><b>TikTok</b><span className="sc-handle">@{BRAND.tt}</span></span>
          <span className="sc-go"><Icon name="arrow" size={18} /></span>
        </a>
      </div>
    </div>
  )
}

function Lightbox({ items, index, onClose, onPrev, onNext }: {
  items: typeof PIECES; index: number
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  const { L } = useLang()
  const it = items[index]
  const pieceL = L.pieces[it.id] ?? { title: it.id, meta: '' }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])
  return (
    <div className="lb" onClick={onClose}>
      <button className="lb-close ic-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
      <button className="lb-nav lb-prev ic-btn" onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Previous"><Icon name="chevL" size={26} /></button>
      <figure className="lb-fig" onClick={e => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={it.real} alt={pieceL.title} />
        <figcaption><b>{pieceL.title}</b><span>{pieceL.meta}</span><em>{index + 1} / {items.length}</em></figcaption>
      </figure>
      <button className="lb-nav lb-next ic-btn" onClick={e => { e.stopPropagation(); onNext() }} aria-label="Next"><Icon name="chevR" size={26} /></button>
    </div>
  )
}

export default function Gallery({ onJump }: { onJump: (id: string) => void }) {
  const { L } = useLang()
  const [lb, setLb] = useState(-1)
  const ref = useScrollReveal()
  const trackRef = useRef<HTMLDivElement>(null)

  const slide = useCallback((dir: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.gal-slide')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    const start = el.scrollLeft
    const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, start + dir * step))
    const t0 = performance.now(), dur = 380
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur)
      el.scrollLeft = start + (target - start) * ease(p)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <section className="section" id="work" ref={ref}>
      <div className="wrap">
        <div className="gal-head">
          <div className="sec-head">
            <span className="sec-tag"><i className="dot" /> {L.gallery.tag}</span>
            <h2 className="sec-title">{L.gallery.title}</h2>
            <p className="sec-sub">{L.gallery.sub}</p>
          </div>
          <div className="gal-nav">
            <button className="gal-arrow gal-arrow-prev" aria-label="Previous" onClick={() => slide(-1)}><Icon name="arrow" size={18} /></button>
            <button className="gal-arrow" aria-label="Next" onClick={() => slide(1)}><Icon name="arrow" size={18} /></button>
          </div>
        </div>

        <div className="gal-slider" ref={trackRef}>
          {PIECES.map((p, i) => {
            const pieceL = L.pieces[p.id] ?? { title: p.id, meta: '' }
            return (
              <figure key={p.id}
                className={`gal-slide reveal is-real${p.feature ? ' is-feature' : ''}`}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setLb(i)}>
                <div className="gal-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.real} alt={pieceL.title} />
                  <span className="gal-scan" />
                  <span className="gal-zoom"><Icon name="spark" size={16} /> {L.gallery.view}</span>
                </div>
                <figcaption>
                  <span className="gal-no">{String(i + 1).padStart(3, '0')}</span>
                  <div><b>{pieceL.title}</b><span>{pieceL.meta}</span></div>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <Reels />
      </div>

      {lb >= 0 && (
        <Lightbox items={PIECES} index={lb}
          onClose={() => setLb(-1)}
          onPrev={() => setLb(i => (i - 1 + PIECES.length) % PIECES.length)}
          onNext={() => setLb(i => (i + 1) % PIECES.length)} />
      )}
    </section>
  )
}
