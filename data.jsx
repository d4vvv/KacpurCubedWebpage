// data.jsx — theme presets + bilingual content (EN/PL) + shared atoms
const { useState, useEffect, useRef, useCallback } = React;

/* ============================== DIRECTIONS / PALETTES ============================== */
const DIRECTIONS = {
  "neon-grid": { label: "Neon Grid", heroLayout: "split", intensity: "medium", palette: "magenta-cyan" },
  "voltage":   { label: "Voltage",   heroLayout: "stage", intensity: "full",   palette: "blue-violet" },
};

const PALETTES = {
  "magenta-cyan": {
    swatch: ["#ff2d9b", "#1ef0ff"],
    vars: {
      "--bg": "#07060d", "--bg-2": "#0d0b18", "--panel": "#120e22",
      "--ink": "#f4f1ff", "--muted": "#9b95b8",
      "--neon": "#ff2d9b", "--neon-2": "#1ef0ff", "--neon-3": "#ffd84d",
      "--grid": "rgba(125,100,210,0.16)", "--stroke": "rgba(255,255,255,0.09)",
    },
  },
  "blue-violet": {
    swatch: ["#4b6bff", "#b15bff"],
    vars: {
      "--bg": "#04050f", "--bg-2": "#090b1c", "--panel": "#0d1026",
      "--ink": "#eef1ff", "--muted": "#8e93c4",
      "--neon": "#4b6bff", "--neon-2": "#b15bff", "--neon-3": "#c6ff3d",
      "--grid": "rgba(90,110,255,0.18)", "--stroke": "rgba(255,255,255,0.10)",
    },
  },
  "amber": {
    swatch: ["#ff7a18", "#ffd24d"],
    vars: {
      "--bg": "#0a0806", "--bg-2": "#100c08", "--panel": "#16110b",
      "--ink": "#f7f1e8", "--muted": "#a6977f",
      "--neon": "#ff7a18", "--neon-2": "#ffd24d", "--neon-3": "#48e0c0",
      "--grid": "rgba(255,140,40,0.12)", "--stroke": "rgba(255,255,255,0.08)",
    },
  },
  "acid-green": {
    swatch: ["#acff3d", "#19c3ff"],
    vars: {
      "--bg": "#05080a", "--bg-2": "#0a0f10", "--panel": "#0c1416",
      "--ink": "#eafff2", "--muted": "#86a594",
      "--neon": "#acff3d", "--neon-2": "#19c3ff", "--neon-3": "#ff4d8d",
      "--grid": "rgba(120,255,90,0.12)", "--stroke": "rgba(255,255,255,0.08)",
    },
  },
  "hot-coral": {
    swatch: ["#ff4d6d", "#ff9f1c"],
    vars: {
      "--bg": "#0b0709", "--bg-2": "#130a0d", "--panel": "#170b10",
      "--ink": "#fff0f2", "--muted": "#b58a92",
      "--neon": "#ff4d6d", "--neon-2": "#ff9f1c", "--neon-3": "#3de0ff",
      "--grid": "rgba(255,90,120,0.13)", "--stroke": "rgba(255,255,255,0.09)",
    },
  },
};

const INTENSITY = {
  subtle: { glow: 0.5,  scan: 0.0,  grid: 0.45, glitch: false, scanlines: false },
  medium: { glow: 1.0,  scan: 0.05, grid: 1.0,  glitch: true,  scanlines: true  },
  full:   { glow: 1.35, scan: 0.09, grid: 1.4,  glitch: true,  scanlines: true  },
};

function applyTheme(paletteKey, intensityKey) {
  const root = document.documentElement;
  const pal = PALETTES[paletteKey] || PALETTES["magenta-cyan"];
  Object.entries(pal.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  const it = INTENSITY[intensityKey] || INTENSITY.medium;
  root.style.setProperty("--glow", String(it.glow));
  root.style.setProperty("--scan", String(it.scan));
  root.style.setProperty("--grid-on", it.grid > 0 ? "1" : "0");
}

/* ============================== STRUCTURAL CONTENT (lang-independent) ============================== */
const BRAND = {
  name: "KACPUR",
  cubed: "³",
  ig: "kacpur_cubed",
  igUrl: "https://www.instagram.com/kacpur_cubed/",
  tt: "kacpur.cubed",
  ttUrl: "https://www.tiktok.com/@kacpur.cubed",
  email: "kacpur.cubed@gmail.com",
};

// id / real-image / layout flags only — copy lives in STR[lang].pieces
const PIECES = [
  { id: "p1", real: "assets/mosaic-1.jpg", feature: true },
  { id: "p8", real: "assets/mosaic-4.jpg" },
  { id: "p9", real: "assets/mosaic-5.jpg" },
  { id: "p10", real: "assets/mosaic-6.jpg" },
  { id: "p2", real: "assets/mosaic-2.jpg" },
  { id: "p3", real: "assets/mosaic-3.jpg" },
  { id: "p7", real: "assets/art-duo.jpg" },
];
const REELS = [
  { id: "r1", video: "assets/reel-build.mp4", poster: "assets/reel-build-poster.jpg" },
  { id: "rb", video: "assets/reel-barley.mp4", poster: "assets/reel-barley-poster.jpg" },
  { id: "rbb", video: "assets/reel-bbnos.mp4", poster: "assets/reel-bbnos-poster.jpg" },
];
const TIERS = [
  { key: "full", featured: false },
  { key: "small", featured: true },
  { key: "brand", featured: false },
];

/* ============================== TRANSLATIONS ============================== */
const STR = {
  en: {
    code: "EN",
    nav: { work: "Work", process: "Process", pricing: "Pricing", contact: "Contact", commission: "Commission a piece" },
    hero: {
      kickerSplit: "Rubik\u2019s-cube art · handmade in my room",
      kickerStage: "Rubik\u2019s-cube art · handmade",
      splitT1: "PIXEL ART,", splitT2: "BUILT FROM CUBES",
      splitSub: "I turn photographs into giant mosaics made entirely from Rubik\u2019s cubes — every single square twisted to the right colour by hand.",
      stageSub: "Photographs reborn as electric mosaics — thousands of Rubik\u2019s cubes, solved by hand, locked into one giant grid.",
      viewWork: "View the work", commission: "Commission a piece", enterGallery: "Enter the gallery",
      badge: "494 cubes",
    },
    stats: [
      { k: "500", v: "cubes per piece" },
      { k: "100%", v: "solved by hand" },
      { k: "2.0 m", v: "tallest build" },
    ],
    gallery: {
      tag: "Selected work", title: "The gallery",
      sub: "Each mosaic is one of a kind. Click a finished piece to view it large.",
      view: "view",
      reelsTitle: "In motion",
      reelsSub: "Build timelapses & reveals — hover to play, or swipe through on mobile.",
      moreTitle: "More on my socials",
      moreSub: "New builds, timelapses and reveals go up regularly on Instagram and TikTok.",
    },
    pieces: {
      p1: { title: "Bedoes 2115", meta: "Polish rapper" },
      p8: { title: "Cristiano Ronaldo", meta: "Football player" },
      p9: { title: "Vessel", meta: "Sleep Token vocalist" },
      p10: { title: "Ed Sheeran", meta: "Famous musician" },
      p2: { title: "OKI", meta: "Polish musician" },
      p3: { title: "Barley The Burr", meta: "Twitch streamer" },
      p4: { title: "Portrait No.04", meta: "blue ground · 40 × 52 cubes" },
      p5: { title: "Portrait No.05", meta: "32 × 42 cubes · oak frame" },
      p6: { title: "In the frame", meta: "oak frame · cubes mid-build" },
      p7: { title: "Two of a kind", meta: "finished builds · studio" },
    },
    reels: {
      r1: { title: "Build & reveal", meta: "0:17" },
      rb: { title: "Barley The Burr", meta: "0:15" },
      rbb: { title: "bbno$", meta: "0:20" },
    },
    about: {
      tag: "The studio", title: "Made by hand, one twist at a time",
      lead: "I\u2019m Kacpur. I\u2019ve been solving Rubik\u2019s cubes since I was a kid — now I build portraits out of them. No stickers swapped, no shortcuts: every cube is genuinely solved so the right colour faces the wall.",
      photo: "Drop a studio / artist photo",
    },
    process: [
      { n: "01", t: "Choose the image", d: "Send me a photo — a face, a logo, an album cover. Anything with strong contrast translates beautifully." },
      { n: "02", t: "Map to a cube grid", d: "I pixelate it down to a grid of squares and match every pixel to one of six cube colours." },
      { n: "03", t: "Solve, face by face", d: "Each cube is twisted by hand so the right colour faces out. Hundreds, sometimes thousands of them." },
      { n: "04", t: "Mount & frame", d: "Cubes are locked into a rigid grid and framed in solid oak, ready to hang." },
    ],
    pricing: {
      tag: "Commissions", title: "Own a piece, or build a brand moment",
      sub: "Buy a ready-made mosaic, commission your own portrait, or bring me in for a promotion or event. Prices are starting points — every build is quoted to size.",
      popular: "Most popular",
      note: "Open to paid promotions, collaborations & commercial licensing — say hi below.",
    },
    tiers: {
      full: { name: "Full-size cubes", tag: "Bold & graphic", price: "~8,000 zł", cubes: "494 cubes",
        feats: ["106 × 153 cm finished", "494 standard Rubik’s cubes", "Punchy, poster-like portrait", "Solid oak frame"], cta: "Commission this size" },
      small: { name: "Small cubes", tag: "Fine detail", price: "10,000 zł", cubes: "1,200 cubes",
        feats: ["90 × 120 cm finished", "1,200 mini cubes", "Photographic, high-detail", "Solid oak frame"], cta: "Commission this size" },
      brand: { name: "Brand / event", tag: "Promo & collabs", price: "let's talk", cubes: "custom scale",
        feats: ["Logos, mascots, campaigns", "Live builds & timelapses", "Bulk or wall-scale installs", "Open to paid promotions"], cta: "Pitch a project" },
    },
    contact: {
      tag: "Get in touch", title: "Let's build something",
      lead: "Commission, purchase or collaboration — tell me what you have in mind and I\u2019ll come back within two working days.",
      igSub: "Daily builds & timelapses", ttSub: "Reels & build clips", emailSub: "For briefs & quotes",
      aboutLabel: "What's this about?",
      intents: ["Buy a finished piece", "Commission a portrait", "Promotion / collaboration", "Something else"],
      name: "Name", email: "Email", message: "Message",
      phName: "Your name", phEmail: "you@email.com", phMessage: "Tell me about the piece, the subject, rough size, timeline…",
      errName: "Tell me your name", errEmail: "Enter a valid email", errMessage: "A little more detail, please",
      send: "Send message",
      sentTitle: "Message launched", sentBody: "Thanks {name} — I\u2019ll reply to {email} within two working days.", sendAnother: "Send another",
    },
    footer: {
      tagline: "Photographs, rebuilt from Rubik\u2019s cubes. Handmade in my room.",
      explore: "Explore", connect: "Connect", studio: "Cube art studio", built: "built one twist at a time",
    },
  },

  pl: {
    code: "PL",
    nav: { work: "Prace", process: "Proces", pricing: "Cennik", contact: "Kontakt", commission: "Zamów pracę" },
    hero: {
      kickerSplit: "Sztuka z kostek Rubika · ręcznie w pracowni",
      kickerStage: "Sztuka z kostek Rubika · ręcznie",
      splitT1: "PIKSEL ART,", splitT2: "ZBUDOWANY Z KOSTEK",
      splitSub: "Zamieniam zdjęcia w ogromne mozaiki w całości złożone z kostek Rubika — każda kostka ułożona ręcznie, kolor po kolorze.",
      stageSub: "Zdjęcia odrodzone jako elektryzujące mozaiki — tysiące kostek Rubika, ułożonych ręcznie, w jednej wielkiej siatce.",
      viewWork: "Zobacz prace", commission: "Zamów pracę", enterGallery: "Wejdź do galerii",
      badge: "494 kostki",
    },
    stats: [
      { k: "500", v: "kostek na pracę" },
      { k: "100%", v: "ułożone ręcznie" },
      { k: "2,0 m", v: "najwyższa praca" },
    ],
    gallery: {
      tag: "Wybrane prace", title: "Galeria",
      sub: "Każda mozaika jest jedyna w swoim rodzaju. Kliknij gotową pracę, by zobaczyć ją w powiększeniu.",
      view: "zobacz",
      reelsTitle: "W ruchu",
      reelsSub: "Timelapse\u2019y budowania i układania — resztę obejrzysz w moich social mediach.",
      moreTitle: "Więcej w social mediach",
      moreSub: "Nowe realizacje, timelapse\u2019y i odsłony pojawiają się regularnie na Instagramie i TikToku.",
    },
    pieces: {
      p1: { title: "Bedoes 2115", meta: "Polski raper" },
      p8: { title: "Cristiano Ronaldo", meta: "Piłkarz" },
      p9: { title: "Vessel", meta: "Wokalista Sleep Token" },
      p10: { title: "Ed Sheeran", meta: "Znany muzyk" },
      p2: { title: "OKI", meta: "Polski muzyk" },
      p3: { title: "Barley The Burr", meta: "Streamer na Twitchu" },
      p4: { title: "Portret nr 04", meta: "niebieskie tło · 40 × 52 kostki" },
      p5: { title: "Portret nr 05", meta: "32 × 42 kostki · dębowa rama" },
      p6: { title: "W ramie", meta: "dębowa rama · kostki w trakcie" },
      p7: { title: "Dwie prace", meta: "gotowe realizacje · pracownia" },
    },
    reels: {
      r1: { title: "Budowa i odsłona", meta: "0:17" },
      rb: { title: "Barley The Burr", meta: "0:15" },
      rbb: { title: "bbno$", meta: "0:20" },
    },
    about: {
      tag: "Pracownia", title: "Tworzone ręcznie, ruch po ruchu",
      lead: "Jestem Kacpur. Układam kostki Rubika na czas od dziecka — a teraz buduję z nich portrety. Bez przeklejania naklejek, bez skrótów: każda kostka jest naprawdę ułożona, tak by właściwy kolor był na wierzchu.",
      photo: "Przeciągnij zdjęcie z pracowni / artysty",
    },
    process: [
      { n: "01", t: "Wybierz zdjęcie", d: "Prześlij mi zdjęcie — twarz, logo, okładkę albumu. Wszystko z mocnym kontrastem wygląda świetnie." },
      { n: "02", t: "Mapuj na siatkę kostek", d: "Pikseluję je do siatki kwadratów i dopasowuję każdy piksel do jednego z sześciu kolorów kostki." },
      { n: "03", t: "Układaj, ścianka po ściance", d: "Każdą kostkę układam ręcznie, by właściwy kolor był na wierzchu. Setki, czasem tysiące kostek." },
      { n: "04", t: "Montaż i oprawa", d: "Kostki blokuję w sztywnej siatce i oprawiam w litą dębinę, gotowe do powieszenia." },
    ],
    pricing: {
      tag: "Zamówienia", title: "Miej własną pracę albo zbuduj moment dla marki",
      sub: "Kup gotową mozaikę, zamów własny portret albo zaproś mnie do promocji lub wydarzenia. Ceny są punktem wyjścia — każdą pracę wyceniam według rozmiaru.",
      popular: "Najpopularniejsze",
      note: "Otwarty na płatne promocje, współprace i licencje komercyjne — napisz poniżej.",
    },
    tiers: {
      full: { name: "Duże kostki", tag: "Mocny, graficzny", price: "~8000 zł", cubes: "494 kostki",
        feats: ["106 × 153 cm gotowe", "494 standardowe kostki Rubika", "Wyrazisty, plakatowy portret", "Rama z litego dębu"], cta: "Zamów ten rozmiar" },
      small: { name: "Małe kostki", tag: "Drobny detal", price: "10 000 zł", cubes: "1200 kostek",
        feats: ["90 × 120 cm gotowe", "1200 mini kostek", "Fotograficzny, bogaty detal", "Rama z litego dębu"], cta: "Zamów ten rozmiar" },
      brand: { name: "Marka / event", tag: "Promocje i współprace", price: "porozmawiajmy", cubes: "dowolna skala",
        feats: ["Loga, maskotki, kampanie", "Budowanie na żywo i timelapse\u2019y", "Realizacje wielkoformatowe", "Otwarty na płatne promocje"], cta: "Opisz projekt" },
    },
    contact: {
      tag: "Kontakt", title: "Zbudujmy coś razem",
      lead: "Zamówienie, zakup czy współpraca — napisz, co masz na myśli, a odezwę się w ciągu dwóch dni roboczych.",
      igSub: "Codzienne realizacje i timelapse\u2019y", ttSub: "Reelsy i klipy z budowy", emailSub: "Briefy i wyceny",
      aboutLabel: "Czego dotyczy wiadomość?",
      intents: ["Kup gotową pracę", "Zamów portret", "Promocja / współpraca", "Coś innego"],
      name: "Imię", email: "E-mail", message: "Wiadomość",
      phName: "Twoje imię", phEmail: "ty@email.com", phMessage: "Opowiedz o pracy, motywie, przybliżonym rozmiarze i terminie…",
      errName: "Podaj swoje imię", errEmail: "Podaj poprawny e-mail", errMessage: "Napisz trochę więcej, proszę",
      send: "Wyślij wiadomość",
      sentTitle: "Wiadomość wysłana", sentBody: "Dzięki, {name} — odpowiem na {email} w ciągu dwóch dni roboczych.", sendAnother: "Wyślij kolejną",
    },
    footer: {
      tagline: "Zdjęcia odtworzone z kostek Rubika. Tworzone ręcznie w pracowni.",
      explore: "Odkryj", connect: "Kontakt", studio: "Pracownia sztuki z kostek", built: "tworzone ruch po ruchu",
    },
  },
};

const LangCtx = React.createContext({ lang: "en", setLang: () => {}, L: STR.en });

/* ============================== SHARED ATOMS ============================== */
function Icon({ name, size = 20, stroke = 2 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    instagram: <g><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" /></g>,
    tiktok: <path d="M14 4c.3 2.2 1.9 4 4.2 4.3v2.6c-1.5.1-2.9-.4-4.2-1.2v5.5a4.9 4.9 0 1 1-4.9-4.9c.3 0 .6 0 .9.1v2.7a2.3 2.3 0 1 0 1.6 2.1V4H14z" fill="currentColor" stroke="none" />,
    mail: <g><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></g>,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    check: <path d="M4 12l5 5L20 6" />,
    cube: <g><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" /><path d="M12 20v-9M12 11l8-4.5M12 11L4 6.5" /></g>,
    chevL: <path d="M15 6l-6 6 6 6" />,
    chevR: <path d="M9 6l6 6-6 6" />,
    spark: <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    globe: <g><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></g>,
  };
  return <svg {...common} style={{ flex: "none" }}>{paths[name]}</svg>;
}

function Cube3D({ size = 22 }) {
  return (
    <span className="cube3d" style={{ width: size, height: size, display: "inline-block" }}>
      <Icon name="cube" size={size} stroke={1.6} />
    </span>
  );
}

Object.assign(window, {
  DIRECTIONS, PALETTES, INTENSITY, applyTheme,
  BRAND, PIECES, REELS, TIERS, STR, LangCtx,
  Icon, Cube3D,
});
