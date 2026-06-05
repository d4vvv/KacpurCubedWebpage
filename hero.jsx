// hero.jsx — Nav (with language toggle) + animated backgrounds + 2 hero layouts
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH, useContext: useCtxH } = React;

function GlitchText({ children, className = "", as = "span" }) {
  const Tag = as;
  return <Tag className={"glitch " + className} data-text={children}>{children}</Tag>;
}

function Brackets() {
  return (
    <React.Fragment>
      <span className="brk brk-tl" /><span className="brk brk-tr" />
      <span className="brk brk-bl" /><span className="brk brk-br" />
    </React.Fragment>
  );
}

/* ---------- cycling glitch art for the hero ---------- */
const HERO_IMAGES = ["assets/mosaic-3.jpg", "assets/mosaic-1.jpg", "assets/mosaic-4.jpg", "assets/mosaic-2.jpg"];

function GlitchArt() {
  const [idx, setIdx] = useStateH(0);
  const [glitch, setGlitch] = useStateH(false);
  const idxRef = useRefH(0);
  useEffectH(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // preload
    HERO_IMAGES.forEach(s => { const im = new Image(); im.src = s; });
    let t1, t2;
    const cycle = () => {
      if (document.hidden) return;
      setGlitch(true);
      t1 = setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % HERO_IMAGES.length;
        setIdx(idxRef.current);
      }, reduce ? 120 : 150);
      t2 = setTimeout(() => setGlitch(false), reduce ? 320 : 340);
    };
    const iv = setInterval(cycle, 4600);
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const src = HERO_IMAGES[idx];
  return (
    <div className={"glitch-art" + (glitch ? " is-glitch" : "")}>
      <img className="ga-layer ga-main" src={src} alt="Rubik's cube portrait" />
      <img className="ga-layer ga-ghost ga-r" src={src} alt="" aria-hidden="true" />
      <img className="ga-layer ga-ghost ga-c" src={src} alt="" aria-hidden="true" />
      <span className="ga-band" aria-hidden="true" />
    </div>
  );
}

function HeroBG({ layout }) {
  return (
    <div className="herobg" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      {layout === "stage" && <div className="bg-conic" />}
      <div className="bg-scan" />
      <div className="bg-noise" />
    </div>
  );
}

/* ---------- language toggle ---------- */
function LangToggle() {
  const { lang, setLang } = useCtxH(LangCtx);
  return (
    <div className="lang" role="group" aria-label="Language">
      {["en", "pl"].map(code => (
        <button key={code} className={"lang-btn" + (lang === code ? " on" : "")}
          onClick={() => setLang(code)} aria-pressed={lang === code}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ---------- nav ---------- */
function Nav({ onJump }) {
  const { L } = useCtxH(LangCtx);
  const [scrolled, setScrolled] = useStateH(false);
  const [open, setOpen] = useStateH(false);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    [L.nav.work, "work"], [L.nav.process, "process"], [L.nav.pricing, "pricing"], [L.nav.contact, "contact"],
  ];
  const go = (id) => { setOpen(false); onJump(id); };
  return (
    <header className={"nav" + (scrolled ? " nav-on" : "")}>
      <div className="nav-inner">
        <a className="brand" onClick={() => go("top")}>
          <Cube3D size={24} />
          <span>{BRAND.name}<sup>{BRAND.cubed}</sup></span>
        </a>
        <nav className="nav-links">
          {links.map(([t, id]) => (<a key={id} onClick={() => go(id)}>{t}</a>))}
        </nav>
        <div className="nav-cta">
          <LangToggle />
          <a className="ic-btn nav-social" href={BRAND.igUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Icon name="instagram" size={18} />
          </a>
          <a className="ic-btn nav-social" href={BRAND.ttUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
            <Icon name="tiktok" size={18} />
          </a>
          <button className="btn btn-sm" onClick={() => go("contact")}>{L.nav.commission}</button>
          <button className="ic-btn nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>
      <div className={"nav-mobile" + (open ? " is-open" : "")}>
        {links.map(([t, id], i) => (
          <a key={id} onClick={() => go(id)} style={{ "--i": i }}>{t}</a>
        ))}
        <a href={BRAND.igUrl} target="_blank" rel="noreferrer" style={{ "--i": links.length }}>Instagram ↗</a>
        <a href={BRAND.ttUrl} target="_blank" rel="noreferrer" style={{ "--i": links.length + 1 }}>TikTok ↗</a>
      </div>
    </header>
  );
}

/* ====================================================================== */
function Hero({ layout, onJump }) {
  return (
    <section className={"hero hero-" + layout} id="top">
      <HeroBG layout={layout} />
      {layout === "split" && <HeroSplit onJump={onJump} />}
      {layout === "stage" && <HeroStage onJump={onJump} />}
    </section>
  );
}

function HeroSplit({ onJump }) {
  const { L } = useCtxH(LangCtx);
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
          <button className="btn" onClick={() => onJump("work")}>{L.hero.viewWork} <Icon name="arrow" size={18} /></button>
          <button className="btn btn-ghost" onClick={() => onJump("pricing")}>{L.hero.commission}</button>
        </div>
        <div className="hero-stats">
          {L.stats.map(s => (<div key={s.v} className="stat"><b>{s.k}</b><span>{s.v}</span></div>))}
        </div>
      </div>
      <div className="hero-art-wrap reveal in" style={{ animationDelay: ".12s" }}>
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
  );
}

function HeroStage({ onJump }) {
  const { L } = useCtxH(LangCtx);
  return (
    <div className="wrap hero-stage-inner">
      <span className="kicker center reveal in"><i className="dot" /> {L.hero.kickerStage}</span>
      <h1 className="hero-h1 huge reveal in" style={{ animationDelay: ".05s" }}>
        <GlitchText>KACPUR</GlitchText><span className="cubed-big">³</span>
      </h1>
      <p className="hero-sub center reveal in" style={{ animationDelay: ".12s" }}>{L.hero.stageSub}</p>
      <div className="hero-actions center reveal in" style={{ animationDelay: ".18s" }}>
        <button className="btn btn-lg" onClick={() => onJump("work")}>{L.hero.enterGallery} <Icon name="arrow" size={18} /></button>
      </div>
      <div className="stage-art reveal in" style={{ animationDelay: ".22s" }}>
        <span className="stage-halo" />
        <div className="art-frame">
          <GlitchArt />
          <span className="art-scanline" />
          <Brackets />
        </div>
      </div>
      <div className="hero-stats center reveal in" style={{ animationDelay: ".28s" }}>
        {L.stats.map(s => (<div key={s.v} className="stat"><b>{s.k}</b><span>{s.v}</span></div>))}
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Hero, GlitchText, Brackets, LangToggle });
