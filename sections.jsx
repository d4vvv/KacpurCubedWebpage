// sections.jsx — Gallery, Lightbox, Process, Pricing, Contact, Footer (bilingual)
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useContext: useCtxS } = React;

function SectionHead({ tag, title, sub, center }) {
  return (
    <div className={"sec-head" + (center ? " center" : "")}>
      <span className="sec-tag"><i className="dot" /> {tag}</span>
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}

/* ============================== GALLERY ============================== */
function Reels() {
  const { L } = useCtxS(LangCtx);
  const rowRef = useRefS(null);
  const cardRefs = useRefS([]);
  cardRefs.current = [];
  const addRef = (el) => { if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el); };

  useEffectS(() => {
    const touch = window.matchMedia("(hover: none), (max-width: 760px)").matches;
    const playOnly = (keep) => cardRefs.current.forEach(card => {
      const v = card.querySelector("video"); if (!v) return;
      if (card === keep) { v.play().catch(() => {}); card.classList.add("is-playing"); }
      else { v.pause(); card.classList.remove("is-playing"); }
    });
    if (!touch) return; // desktop = hover handlers below
    // mobile: play whichever card is most centered in the viewport row
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let best = null, bestRatio = 0;
        cardRefs.current.forEach(card => {
          const r = card.getBoundingClientRect();
          const vw = window.innerWidth;
          const visible = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
          const ratio = visible / r.width;
          if (ratio > bestRatio) { bestRatio = ratio; best = card; }
        });
        if (best && bestRatio > 0.55) playOnly(best);
      });
    }, { threshold: [0, 0.3, 0.6, 0.9], root: rowRef.current });
    cardRefs.current.forEach(c => io.observe(c));
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const onEnter = (e) => { const v = e.currentTarget.querySelector("video"); if (v) { v.play().catch(() => {}); e.currentTarget.classList.add("is-playing"); } };
  const onLeave = (e) => { const v = e.currentTarget.querySelector("video"); if (v) { v.pause(); v.currentTime = 0; e.currentTarget.classList.remove("is-playing"); } };

  return (
    <div className="reels">
      <div className="reels-head">
        <h3><Icon name="cube" size={18} /> {L.gallery.reelsTitle}</h3>
        <p>{L.gallery.reelsSub}</p>
      </div>
      <div className="reels-row" ref={rowRef}>
        {REELS.map(r => {
          const rc = L.reels[r.id];
          return (
            <figure key={r.id} className="reel" ref={addRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <div className="reel-video">
                <video src={r.video} poster={r.poster} muted loop playsInline preload="metadata"
                  ref={el => { if (el) el.muted = true; }} />
                <span className="reel-badge"><Icon name="cube" size={13} /> {rc.meta}</span>
                <span className="reel-playicon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                </span>
                <span className="gal-scan" />
              </div>
              <figcaption><b>{rc.title}</b></figcaption>
            </figure>
          );
        })}
      </div>
      <div className="social-cards">
        <a className="social-card sc-ig" href={BRAND.igUrl} target="_blank" rel="noreferrer">
          <span className="sc-ic"><Icon name="instagram" size={24} /></span>
          <span className="sc-body">
            <b>Instagram</b>
            <span className="sc-handle">@{BRAND.ig}</span>
          </span>
          <span className="sc-go"><Icon name="arrow" size={18} /></span>
        </a>
        <a className="social-card sc-tt" href={BRAND.ttUrl} target="_blank" rel="noreferrer">
          <span className="sc-ic"><Icon name="tiktok" size={24} /></span>
          <span className="sc-body">
            <b>TikTok</b>
            <span className="sc-handle">@{BRAND.tt}</span>
          </span>
          <span className="sc-go"><Icon name="arrow" size={18} /></span>
        </a>
      </div>
    </div>
  );
}

function Gallery({ onJump }) {
  const { L } = useCtxS(LangCtx);
  // merge structural pieces with localized copy
  const pieces = PIECES.map(p => ({ ...p, ...L.pieces[p.id] }));
  const reals = pieces.filter(p => p.real);
  const [lb, setLb] = useStateS(-1);
  const ref = useScrollReveal();

  useEffectS(() => {
    const onKey = (e) => {
      if (lb < 0) return;
      if (e.key === "Escape") setLb(-1);
      if (e.key === "ArrowRight") setLb(i => (i + 1) % reals.length);
      if (e.key === "ArrowLeft") setLb(i => (i - 1 + reals.length) % reals.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb, reals.length]);

  const feature = pieces.find(p => p.feature);
  const rest = pieces.filter(p => !p.feature);
  const trackRef = useRefS(null);

  const slide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".gal-slide");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const start = el.scrollLeft;
    const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, start + dir * step));
    const t0 = performance.now(), dur = 380;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.scrollLeft = start + (target - start) * ease(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <section className="section" id="work" ref={ref}>
      <div className="wrap">
        <div className="gal-head">
          <SectionHead tag={L.gallery.tag} title={L.gallery.title} sub={L.gallery.sub} />
          <div className="gal-nav">
            <button className="gal-arrow gal-arrow-prev" aria-label="Previous" onClick={() => slide(-1)}><Icon name="arrow" size={18} /></button>
            <button className="gal-arrow" aria-label="Next" onClick={() => slide(1)}><Icon name="arrow" size={18} /></button>
          </div>
        </div>

        <div className="gal-slider" ref={trackRef}>
          {pieces.map((p, i) => (
            <figure key={p.id} className={"gal-slide reveal is-real" + (p.feature ? " is-feature" : "")}
              style={{ animationDelay: (i * 0.05) + "s" }}
              onClick={() => setLb(reals.indexOf(p))}>
              <div className="gal-img">
                <img src={p.real} alt={p.title} />
                <span className="gal-scan" />
                <span className="gal-zoom"><Icon name="spark" size={16} /> {L.gallery.view}</span>
              </div>
              <figcaption>
                <span className="gal-no">{String(i + 1).padStart(3, "0")}</span>
                <div><b>{p.title}</b><span>{p.meta}</span></div>
              </figcaption>
            </figure>
          ))}
        </div>

        <Reels />
      </div>

      {lb >= 0 && (
        <Lightbox items={reals} index={lb}
          onClose={() => setLb(-1)}
          onPrev={() => setLb(i => (i - 1 + reals.length) % reals.length)}
          onNext={() => setLb(i => (i + 1) % reals.length)} />
      )}
    </section>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const it = items[index];
  return (
    <div className="lb" onClick={onClose}>
      <button className="lb-close ic-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
      <button className="lb-nav lb-prev ic-btn" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous"><Icon name="chevL" size={26} /></button>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <img src={it.real} alt={it.title} />
        <figcaption><b>{it.title}</b><span>{it.meta}</span><em>{index + 1} / {items.length}</em></figcaption>
      </figure>
      <button className="lb-nav lb-next ic-btn" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next"><Icon name="chevR" size={26} /></button>
    </div>
  );
}

/* ============================== ABOUT / PROCESS ============================== */
function About({ onJump }) {
  const { L } = useCtxS(LangCtx);
  const ref = useScrollReveal();
  return (
    <section className="section section-alt" id="process" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-intro reveal">
          <SectionHead tag={L.about.tag} title={L.about.title} />
          <p className="about-lead">{L.about.lead}</p>
          <div className="about-photo">
            <figure className="studio-shot">
              <img src="assets/studio-artist.jpg" alt="Kacpur in the studio with a cube mosaic" />
              <span className="gal-scan" />
              <Brackets />
            </figure>
          </div>
        </div>
        <ol className="process">
          {L.process.map((s, i) => (
            <li key={s.n} className="proc reveal" style={{ animationDelay: (i * 0.06) + "s" }}>
              <span className="proc-n">{s.n}</span>
              <div><b>{s.t}</b><p>{s.d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================== PRICING ============================== */
function Pricing({ onChoose }) {
  const { L } = useCtxS(LangCtx);
  const ref = useScrollReveal();
  return (
    <section className="section" id="pricing" ref={ref}>
      <div className="wrap">
        <SectionHead center tag={L.pricing.tag} title={L.pricing.title} sub={L.pricing.sub} />
        <div className="tiers">
          {TIERS.map(t => {
            const tc = L.tiers[t.key];
            return (
              <div key={t.key} className={"tier reveal" + (t.featured ? " tier-on" : "")}>
                {t.featured && <span className="tier-flag">{L.pricing.popular}</span>}
                <div className="tier-top">
                  <h3>{tc.name}</h3>
                  <span className="tier-tag">{tc.tag}</span>
                </div>
                <div className="tier-price">{tc.price}</div>
                <div className="tier-cubes"><Cube3D size={15} /> {tc.cubes}</div>
                <ul className="tier-feats">
                  {tc.feats.map(f => (<li key={f}><Icon name="check" size={16} /> {f}</li>))}
                </ul>
                <button className={"btn" + (t.featured ? "" : " btn-ghost")} onClick={() => onChoose(t.key)}>{tc.cta}</button>
              </div>
            );
          })}
        </div>
        <p className="tier-note"><Icon name="spark" size={15} /> {L.pricing.note}</p>
      </div>
    </section>
  );
}

/* ============================== CONTACT ============================== */
function Contact({ intentIdx, setIntentIdx }) {
  const { L } = useCtxS(LangCtx);
  const ref = useScrollReveal();
  const [form, setForm] = useStateS({ name: "", email: "", message: "" });
  const [touched, setTouched] = useStateS({});
  const [sent, setSent] = useStateS(false);

  const errs = {
    name: form.name.trim().length < 2 ? L.contact.errName : "",
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? L.contact.errEmail : "",
    message: form.message.trim().length < 10 ? L.contact.errMessage : "",
  };
  const valid = !errs.name && !errs.email && !errs.message;

  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!valid) return;
    setSent(true);
  };

  const field = (k) => ({
    value: form[k],
    onChange: (e) => setForm(f => ({ ...f, [k]: e.target.value })),
    onBlur: () => setTouched(t => ({ ...t, [k]: true })),
    className: "field" + (touched[k] && errs[k] ? " field-err" : ""),
  });

  const sentBody = L.contact.sentBody
    .replace("{name}", form.name.split(" ")[0] || (L.code === "PL" ? "" : "there"))
    .replace("{email}", form.email);

  return (
    <section className="section section-alt" id="contact" ref={ref}>
      <div className="wrap contact-grid">
        <div className="contact-aside reveal">
          <SectionHead tag={L.contact.tag} title={L.contact.title} />
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
            <a href={"mailto:" + BRAND.email} className="cl">
              <span className="cl-ic"><Icon name="mail" size={20} /></span>
              <div><b>{BRAND.email}</b><span>{L.contact.emailSub}</span></div>
            </a>
          </div>
        </div>

        <div className="contact-form-wrap reveal" style={{ animationDelay: ".08s" }}>
          {sent ? (
            <div className="sent">
              <span className="sent-ic"><Icon name="check" size={34} /></span>
              <h3>{L.contact.sentTitle}</h3>
              <p>{sentBody}</p>
              <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); setTouched({}); }}>{L.contact.sendAnother}</button>
            </div>
          ) : (
          <form className="cform" onSubmit={submit} noValidate>
            <label className="fl">
              <span>{L.contact.aboutLabel}</span>
              <div className="intent-row">
                {L.contact.intents.map((it, i) => (
                  <button type="button" key={i}
                    className={"chip" + (intentIdx === i ? " chip-on" : "")}
                    onClick={() => setIntentIdx(i)}>{it}</button>
                ))}
              </div>
            </label>
            <div className="fl-2">
              <label className="fl">
                <span>{L.contact.name}</span>
                <input type="text" placeholder={L.contact.phName} {...field("name")} />
                {touched.name && errs.name && <em className="err">{errs.name}</em>}
              </label>
              <label className="fl">
                <span>{L.contact.email}</span>
                <input type="email" placeholder={L.contact.phEmail} {...field("email")} />
                {touched.email && errs.email && <em className="err">{errs.email}</em>}
              </label>
            </div>
            <label className="fl">
              <span>{L.contact.message}</span>
              <textarea rows="4" placeholder={L.contact.phMessage} {...field("message")} />
              {touched.message && errs.message && <em className="err">{errs.message}</em>}
            </label>
            <button type="submit" className="btn btn-lg btn-block">{L.contact.send} <Icon name="arrow" size={18} /></button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */
function Footer({ onJump }) {
  const { L } = useCtxS(LangCtx);
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a className="brand" onClick={() => onJump("top")}>
            <Cube3D size={22} /><span>{BRAND.name}<sup>{BRAND.cubed}</sup></span>
          </a>
          <p>{L.footer.tagline}</p>
        </div>
        <div className="footer-cols">
          <div className="fcol">
            <span className="fcol-h">{L.footer.explore}</span>
            <a onClick={() => onJump("work")}>{L.nav.work}</a>
            <a onClick={() => onJump("process")}>{L.nav.process}</a>
            <a onClick={() => onJump("pricing")}>{L.nav.pricing}</a>
          </div>
          <div className="fcol">
            <span className="fcol-h">{L.footer.connect}</span>
            <a href={BRAND.igUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={BRAND.ttUrl} target="_blank" rel="noreferrer">TikTok ↗</a>
            <a href={"mailto:" + BRAND.email}>{L.contact.email}</a>
            <a onClick={() => onJump("contact")}>{L.nav.commission}</a>
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <span>© {new Date().getFullYear()} {BRAND.name}{BRAND.cubed} · {L.footer.studio}</span>
        <span className="footer-built"><Cube3D size={14} /> {L.footer.built}</span>
      </div>
    </footer>
  );
}

/* ---------- scroll reveal hook ---------- */
function useScrollReveal() {
  const ref = useRefS(null);
  useEffectS(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

Object.assign(window, { Gallery, About, Pricing, Contact, Footer, SectionHead, useScrollReveal });
