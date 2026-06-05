// app.jsx — composition, theme + language, Tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "neon-grid",
  "heroLayout": "split",
  "palette": "magenta-cyan",
  "intensity": "medium"
}/*EDITMODE-END*/;

const HERO_LABELS = { split: "Split", stage: "Stage" };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLangState] = useStateA(() => {
    try { return localStorage.getItem("kacpur_lang") || "en"; } catch (e) { return "en"; }
  });
  const [intentIdx, setIntentIdx] = useStateA(1); // default: commission a portrait

  const setLang = (code) => {
    setLangState(code);
    try { localStorage.setItem("kacpur_lang", code); } catch (e) {}
    document.documentElement.lang = code;
  };
  useEffectA(() => { document.documentElement.lang = lang; }, [lang]);

  const L = STR[lang] || STR.en;

  useEffectA(() => { applyTheme(t.palette, t.intensity); }, [t.palette, t.intensity]);

  const jump = (id) => {
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // pricing tier -> contact intent index
  const choosePlan = (key) => {
    const map = { full: 1, small: 1, brand: 2 };
    setIntentIdx(map[key] ?? 1);
    jump("contact");
  };

  const applyDirection = (key) => {
    const d = DIRECTIONS[key];
    if (!d) return;
    setTweak({ direction: key, heroLayout: d.heroLayout, palette: d.palette, intensity: d.intensity });
  };

  const palOptions = Object.values(PALETTES).map(p => p.swatch);
  const curSwatch = (PALETTES[t.palette] || PALETTES["magenta-cyan"]).swatch;
  const swatchToKey = (sw) => Object.keys(PALETTES).find(k => PALETTES[k].swatch.join() === sw.join()) || t.palette;

  return (
    <LangCtx.Provider value={{ lang, setLang, L }}>
      <Nav onJump={jump} />
      <main>
        <Hero layout={t.heroLayout} onJump={jump} />
        <Gallery onJump={jump} />
        <About onJump={jump} />
        <Pricing onChoose={choosePlan} />
        <Contact intentIdx={intentIdx} setIntentIdx={setIntentIdx} />
      </main>
      <Footer onJump={jump} />

      <TweaksPanel>
        <TweakSection label="Direction" />
        <TweakSelect label="Preset" value={t.direction}
          options={[...Object.keys(DIRECTIONS).map(k => ({ value: k, label: DIRECTIONS[k].label })), { value: "", label: "Custom" }]}
          onChange={applyDirection} />

        <TweakSection label="Hero" />
        <TweakSelect label="Layout" value={t.heroLayout}
          options={Object.keys(HERO_LABELS).map(k => ({ value: k, label: HERO_LABELS[k] }))}
          onChange={(v) => setTweak({ heroLayout: v, direction: "" })} />

        <TweakSection label="Look" />
        <TweakColor label="Palette" value={curSwatch} options={palOptions}
          onChange={(arr) => setTweak({ palette: swatchToKey(arr), direction: "" })} />
        <TweakRadio label="Cyberpunk" value={t.intensity}
          options={["subtle", "medium", "full"]}
          onChange={(v) => setTweak({ intensity: v, direction: "" })} />
      </TweaksPanel>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
