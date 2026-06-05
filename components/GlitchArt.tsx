'use client'

import { useState, useEffect, useRef } from 'react'
import { HERO_IMAGES } from '@/lib/data'

export default function GlitchArt() {
  const [idx, setIdx] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const idxRef = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    HERO_IMAGES.forEach(s => { const im = new Image(); im.src = s })
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>
    const cycle = () => {
      if (document.hidden) return
      setGlitch(true)
      t1 = setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % HERO_IMAGES.length
        setIdx(idxRef.current)
      }, reduce ? 120 : 150)
      t2 = setTimeout(() => setGlitch(false), reduce ? 320 : 340)
    }
    const iv = setInterval(cycle, 4600)
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const src = HERO_IMAGES[idx]
  return (
    <div className={`glitch-art${glitch ? ' is-glitch' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ga-layer ga-main" src={src} alt="Rubik's cube portrait" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ga-layer ga-ghost ga-r" src={src} alt="" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ga-layer ga-ghost ga-c" src={src} alt="" aria-hidden="true" />
      <span className="ga-band" aria-hidden="true" />
    </div>
  )
}
