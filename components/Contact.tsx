'use client'

import { useState, useRef, useEffect } from 'react'
import { useLang } from '@/context/LangContext'
import { BRAND } from '@/lib/data'
import Icon from './Icon'

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

type FormState = { name: string; email: string; message: string }
type Touched = Partial<Record<keyof FormState, boolean>>

export default function Contact({
  intentIdx,
  setIntentIdx,
}: {
  intentIdx: number
  setIntentIdx: (i: number) => void
}) {
  const { L } = useLang()
  const ref = useScrollReveal()
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState<Touched>({})
  const [sent, setSent] = useState(false)

  const errs = {
    name: form.name.trim().length < 2 ? L.contact.errName : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? L.contact.errEmail : '',
    message: form.message.trim().length < 10 ? L.contact.errMessage : '',
  }
  const valid = !errs.name && !errs.email && !errs.message

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!valid) return
    setSent(true)
  }

  const field = (k: keyof FormState) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value })),
    onBlur: () => setTouched(t => ({ ...t, [k]: true })),
    className: `field${touched[k] && errs[k] ? ' field-err' : ''}`,
  })

  const sentBody = L.contact.sentBody
    .replace('{name}', form.name.split(' ')[0] || '')
    .replace('{email}', form.email)

  return (
    <section className="section section-alt" id="contact" ref={ref}>
      <div className="wrap contact-grid">
        <div className="contact-aside reveal">
          <div className="sec-head">
            <span className="sec-tag"><i className="dot" /> {L.contact.tag}</span>
            <h2 className="sec-title">{L.contact.title}</h2>
          </div>
          <p className="contact-lead">{L.contact.lead}</p>
          <div className="contact-links">
            <a href={BRAND.igUrl} target="_blank" rel="noreferrer" className="cl">
              <span className="cl-ic"><Icon name="instagram" size={20} /></span>
              <div><b>@{BRAND.ig}</b><span>{L.contact.igSub}</span></div>
            </a>
            <a href={BRAND.ttUrl} target="_blank" rel="noreferrer" className="cl">
              <span className="cl-ic"><Icon name="tiktok" size={20} /></span>
              <div><b>@{BRAND.tt}</b><span>{L.contact.ttSub}</span></div>
            </a>
            <a href={`mailto:${BRAND.email}`} className="cl">
              <span className="cl-ic"><Icon name="mail" size={20} /></span>
              <div><b>{BRAND.email}</b><span>{L.contact.emailSub}</span></div>
            </a>
          </div>
        </div>

        <div className="contact-form-wrap reveal" style={{ animationDelay: '.08s' }}>
          {sent ? (
            <div className="sent">
              <span className="sent-ic"><Icon name="check" size={34} /></span>
              <h3>{L.contact.sentTitle}</h3>
              <p>{sentBody}</p>
              <button className="btn btn-ghost" onClick={() => {
                setSent(false)
                setForm({ name: '', email: '', message: '' })
                setTouched({})
              }}>{L.contact.sendAnother}</button>
            </div>
          ) : (
            <form className="cform" onSubmit={submit} noValidate>
              <label className="fl">
                <span>{L.contact.aboutLabel}</span>
                <div className="intent-row">
                  {L.contact.intents.map((it, i) => (
                    <button type="button" key={i}
                      className={`chip${intentIdx === i ? ' chip-on' : ''}`}
                      onClick={() => setIntentIdx(i)}>{it}</button>
                  ))}
                </div>
              </label>
              <div className="fl-2">
                <label className="fl">
                  <span>{L.contact.name}</span>
                  <input type="text" placeholder={L.contact.phName} {...field('name')} />
                  {touched.name && errs.name && <em className="err">{errs.name}</em>}
                </label>
                <label className="fl">
                  <span>{L.contact.email}</span>
                  <input type="email" placeholder={L.contact.phEmail} {...field('email')} />
                  {touched.email && errs.email && <em className="err">{errs.email}</em>}
                </label>
              </div>
              <label className="fl">
                <span>{L.contact.message}</span>
                <textarea rows={4} placeholder={L.contact.phMessage} {...field('message')} />
                {touched.message && errs.message && <em className="err">{errs.message}</em>}
              </label>
              <button type="submit" className="btn btn-lg btn-block">
                {L.contact.send} <Icon name="arrow" size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
