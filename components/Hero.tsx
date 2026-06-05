'use client'

import { useLang } from '@/context/LangContext'
import Icon, { Cube3D } from './Icon'
import GlitchText, { Brackets } from './GlitchText'
import GlitchArt from './GlitchArt'

interface HeroProps {
  layout: string
  onJump: (id: string) => void
}

function HeroBG({ layout }: { layout: string }) {
  return (
    <div className="herobg" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      {layout === 'stage' && <div className="bg-conic" />}
      <div className="bg-scan" />
      <div className="bg-noise" />
    </div>
  )
}

function HeroSplit({ onJump }: { onJump: (id: string) => void }) {
  const { L } = useLang()
  return (
    <div className="wrap hero-grid">
      <div className="hero-copy reveal in">
        <span className="kicker"><i className="dot" /> {L.hero.kickerSplit}</span>
        <h1 className="hero-h1">
          <GlitchText>{L.hero.splitT1}</GlitchText><br />
          <span className="accent"><GlitchText>{L.hero.splitT2}</GlitchText></span>
        </h1>
        <p className="hero-sub">{L.hero.splitSub}</p>
        <div className="hero-actions">
          <button className="btn" onClick={() => onJump('work')}>{L.hero.viewWork} <Icon name="arrow" size={18} /></button>
          <button className="btn btn-ghost" onClick={() => onJump('pricing')}>{L.hero.commission}</button>
        </div>
        <div className="hero-stats">
          {L.stats.map(s => (
            <div key={s.v} className="stat"><b>{s.k}</b><span>{s.v}</span></div>
          ))}
        </div>
      </div>
      <div className="hero-art-wrap reveal in" style={{ animationDelay: '.12s' }}>
        <div className="art-float">
          <div className="art-frame">
            <GlitchArt />
            <span className="art-scanline" />
            <Brackets />
          </div>
          <span className="art-badge"><Cube3D size={16} /> {L.hero.badge}</span>
        </div>
      </div>
    </div>
  )
}

function HeroStage({ onJump }: { onJump: (id: string) => void }) {
  const { L } = useLang()
  return (
    <div className="wrap hero-stage-inner">
      <span className="kicker center reveal in"><i className="dot" /> {L.hero.kickerStage}</span>
      <h1 className="hero-h1 huge reveal in" style={{ animationDelay: '.05s' }}>
        <GlitchText>KACPUR</GlitchText><span className="cubed-big">³</span>
      </h1>
      <p className="hero-sub center reveal in" style={{ animationDelay: '.12s' }}>{L.hero.stageSub}</p>
      <div className="hero-actions center reveal in" style={{ animationDelay: '.18s' }}>
        <button className="btn btn-lg" onClick={() => onJump('work')}>{L.hero.enterGallery} <Icon name="arrow" size={18} /></button>
      </div>
      <div className="stage-art reveal in" style={{ animationDelay: '.22s' }}>
        <span className="stage-halo" />
        <div className="art-frame">
          <GlitchArt />
          <span className="art-scanline" />
          <Brackets />
        </div>
      </div>
      <div className="hero-stats center reveal in" style={{ animationDelay: '.28s' }}>
        {L.stats.map(s => (
          <div key={s.v} className="stat"><b>{s.k}</b><span>{s.v}</span></div>
        ))}
      </div>
    </div>
  )
}

export default function Hero({ layout, onJump }: HeroProps) {
  return (
    <section className={`hero hero-${layout}`} id="top">
      <HeroBG layout={layout} />
      {layout === 'split' && <HeroSplit onJump={onJump} />}
      {layout === 'stage' && <HeroStage onJump={onJump} />}
    </section>
  )
}
