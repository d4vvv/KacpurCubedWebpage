export const BRAND = {
  name: 'KACPUR',
  cubed: '³',
  ig: 'kacpur_cubed',
  igUrl: 'https://www.instagram.com/kacpur_cubed/',
  tt: 'kacpur.cubed',
  ttUrl: 'https://www.tiktok.com/@kacpur.cubed',
  email: 'kacpur.cubed@gmail.com',
}

export interface Piece {
  id: string
  real: string
  feature?: boolean
}

export interface Reel {
  id: string
  video: string
  poster: string
}

export interface TierDef {
  key: string
  featured?: boolean
}

export const PIECES: Piece[] = [
  { id: 'p8', real: '/assets/mosaic-4.jpg', feature: true },
  { id: 'p9', real: '/assets/mosaic-5.jpg' },
  { id: 'p10', real: '/assets/mosaic-6.jpg' },
  { id: 'p2', real: '/assets/mosaic-2.jpg' },
  { id: 'p3', real: '/assets/mosaic-3.jpg' },
  { id: 'p7', real: '/assets/art-duo.jpg' },
]

export const REELS: Reel[] = [
  { id: 'r1',  video: '/assets/reel-build.mp4',  poster: '/assets/reel-build-poster.jpg' },
  { id: 'rb',  video: '/assets/reel-barley.mp4', poster: '/assets/reel-barley-poster.jpg' },
  { id: 'rbb', video: '/assets/reel-bbnos.mp4',  poster: '/assets/reel-bbnos-poster.jpg' },
]

export const TIERS: TierDef[] = [
  { key: 'full',  featured: false },
  { key: 'small', featured: true },
  { key: 'brand', featured: false },
]

export const HERO_IMAGES = [
  '/assets/mosaic-3.jpg',
  '/assets/mosaic-1.jpg',
  '/assets/mosaic-4.jpg',
  '/assets/mosaic-2.jpg',
]

export type Lang = 'en' | 'pl'

export interface Translations {
  code: string
  nav: { work: string; process: string; pricing: string; contact: string; commission: string }
  hero: {
    kickerSplit: string; kickerStage: string
    splitT1: string; splitT2: string
    splitSub: string; stageSub: string
    viewWork: string; commission: string; enterGallery: string
    badge: string
  }
  stats: Array<{ k: string; v: string }>
  gallery: {
    tag: string; title: string; sub: string; view: string
    reelsTitle: string; reelsSub: string; moreTitle: string; moreSub: string
  }
  pieces: Record<string, { title: string; meta: string }>
  reels: Record<string, { title: string; meta: string }>
  about: { tag: string; title: string; lead: string; photo: string }
  process: Array<{ n: string; t: string; d: string }>
  pricing: { tag: string; title: string; sub: string; popular: string; note: string }
  tiers: Record<string, { name: string; tag: string; price: string; cubes: string; feats: string[]; cta: string }>
  contact: {
    tag: string; title: string; lead: string
    igSub: string; ttSub: string; emailSub: string; aboutLabel: string
    intents: string[]
    name: string; email: string; message: string
    phName: string; phEmail: string; phMessage: string
    errName: string; errEmail: string; errMessage: string
    send: string; sentTitle: string; sentBody: string; sendAnother: string
  }
  footer: { tagline: string; explore: string; connect: string; studio: string; built: string }
}

export const STR: Record<Lang, Translations> = {
  en: {
    code: 'EN',
    nav: { work: 'Work', process: 'Process', pricing: 'Pricing', contact: 'Contact', commission: 'Commission a piece' },
    hero: {
      kickerSplit: 'Rubik’s-cube art · handmade in my room',
      kickerStage: 'Rubik’s-cube art · handmade',
      splitT1: 'PIXEL ART,', splitT2: 'BUILT FROM CUBES',
      splitSub: 'I turn photographs into giant mosaics made entirely from Rubik’s cubes — every single square twisted to the right colour by hand.',
      stageSub: 'Photographs reborn as electric mosaics — thousands of Rubik’s cubes, solved by hand, locked into one giant grid.',
      viewWork: 'View the work', commission: 'Commission a piece', enterGallery: 'Enter the gallery',
      badge: '494 cubes',
    },
    stats: [
      { k: '500', v: 'cubes per piece' },
      { k: '100%', v: 'solved by hand' },
      { k: '2.0 m', v: 'tallest build' },
    ],
    gallery: {
      tag: 'Selected work', title: 'The gallery',
      sub: 'Each mosaic is one of a kind. Click a finished piece to view it large.',
      view: 'view',
      reelsTitle: 'In motion',
      reelsSub: 'Build timelapses & reveals — hover to play, or swipe through on mobile.',
      moreTitle: 'More on my socials',
      moreSub: 'New builds, timelapses and reveals go up regularly on Instagram and TikTok.',
    },
    pieces: {
      p8:  { title: 'Cristiano Ronaldo', meta: 'Football player' },
      p9:  { title: 'Bedoes 2115',        meta: 'Polish rapper' },
      p10: { title: 'Ed Sheeran',        meta: 'Famous musician' },
      p2:  { title: 'OKI',               meta: 'Polish musician' },
      p3:  { title: 'Vessel',            meta: 'Sleep Token vocalist' },
      p7:  { title: 'Two of a kind',     meta: 'finished builds · studio' },
    },
    reels: {
      r1:  { title: 'Build & reveal',  meta: '0:17' },
      rb:  { title: 'Barley The Burr', meta: '0:15' },
      rbb: { title: 'bbno$',           meta: '0:20' },
    },
    about: {
      tag: 'The studio', title: 'Made by hand, one twist at a time',
      lead: 'I’m Kacpur. I’ve been solving Rubik’s cubes since I was a kid — now I build portraits out of them. No stickers swapped, no shortcuts: every cube is genuinely solved so the right colour faces the wall.',
      photo: 'Drop a studio / artist photo',
    },
    process: [
      { n: '01', t: 'Choose the image', d: 'Send me a photo — a face, a logo, an album cover. Anything with strong contrast translates beautifully.' },
      { n: '02', t: 'Map to a cube grid', d: 'I pixelate it down to a grid of squares and match every pixel to one of six cube colours.' },
      { n: '03', t: 'Solve, face by face', d: 'Each cube is twisted by hand so the right colour faces out. Hundreds, sometimes thousands of them.' },
      { n: '04', t: 'Mount & frame', d: 'Cubes are locked into a rigid grid and framed in solid oak, ready to hang.' },
    ],
    pricing: {
      tag: 'Commissions', title: 'Own a piece, or build a brand moment',
      sub: 'Buy a ready-made mosaic, commission your own portrait, or bring me in for a promotion or event. Prices are starting points — every build is quoted to size.',
      popular: 'Most popular',
      note: 'Open to paid promotions, collaborations & commercial licensing — say hi below.',
    },
    tiers: {
      full:  { name: 'Full-size cubes', tag: 'Bold & graphic',   price: '~8,000 zł', cubes: '494 cubes',
        feats: ['106 × 153 cm finished', '494 standard Rubik’s cubes', 'Punchy, poster-like portrait', 'Solid oak frame'], cta: 'Commission this size' },
      small: { name: 'Small cubes',     tag: 'Fine detail',      price: '10,000 zł', cubes: '1,200 cubes',
        feats: ['90 × 120 cm finished', '1,200 mini cubes', 'Photographic, high-detail', 'Solid oak frame'], cta: 'Commission this size' },
      brand: { name: 'Brand / event',   tag: 'Promo & collabs',  price: "let's talk",    cubes: 'custom scale',
        feats: ['Logos, mascots, campaigns', 'Live builds & timelapses', 'Bulk or wall-scale installs', 'Open to paid promotions'], cta: 'Pitch a project' },
    },
    contact: {
      tag: 'Get in touch', title: 'Let’s build something',
      lead: 'Commission, purchase or collaboration — tell me what you have in mind and I’ll come back within two working days.',
      igSub: 'Daily builds & timelapses', ttSub: 'Reels & build clips', emailSub: 'For briefs & quotes',
      aboutLabel: 'What’s this about?',
      intents: ['Buy a finished piece', 'Commission a portrait', 'Promotion / collaboration', 'Something else'],
      name: 'Name', email: 'Email', message: 'Message',
      phName: 'Your name', phEmail: 'you@email.com', phMessage: 'Tell me about the piece, the subject, rough size, timeline…',
      errName: 'Tell me your name', errEmail: 'Enter a valid email', errMessage: 'A little more detail, please',
      send: 'Send message',
      sentTitle: 'Message launched', sentBody: 'Thanks {name} — I’ll reply to {email} within two working days.', sendAnother: 'Send another',
    },
    footer: {
      tagline: 'Photographs, rebuilt from Rubik’s cubes. Handmade in my room.',
      explore: 'Explore', connect: 'Connect', studio: 'Cube art studio', built: 'built one twist at a time',
    },
  },

  pl: {
    code: 'PL',
    nav: { work: 'Prace', process: 'Proces', pricing: 'Cennik', contact: 'Kontakt', commission: 'Zamów pracę' },
    hero: {
      kickerSplit: 'Sztuka z kostek Rubika · ręcznie w pracowni',
      kickerStage: 'Sztuka z kostek Rubika · ręcznie',
      splitT1: 'PIKSEL ART,', splitT2: 'ZBUDOWANY Z KOSTEK',
      splitSub: 'Zamieniam zdjęcia w ogromne mozaiki w całości złożone z kostek Rubika — każda kostka ułożona ręcznie, kolor po kolorze.',
      stageSub: 'Zdjęcia odrodzone jako elektryzujące mozaiki — tysiące kostek Rubika, ułożonych ręcznie, w jednej wielkiej siatce.',
      viewWork: 'Zobacz prace', commission: 'Zamów pracę', enterGallery: 'Wejdź do galerii',
      badge: '494 kostki',
    },
    stats: [
      { k: '500',  v: 'kostek na pracę' },
      { k: '100%', v: 'ułożone ręcznie' },
      { k: '2,0 m', v: 'najwyższa praca' },
    ],
    gallery: {
      tag: 'Wybrane prace', title: 'Galeria',
      sub: 'Każda mozaika jest jedyna w swoim rodzaju. Kliknij gotąwą pracę, by zobaczyć ją w powiększeniu.',
      view: 'zobacz',
      reelsTitle: 'W ruchu',
      reelsSub: 'Timelapse’y budowania i układania — resztę obejrzysz w moich social mediach.',
      moreTitle: 'Więcej w social mediach',
      moreSub: 'Nowe realizacje, timelapse’y i odsłony pojawiają się regularnie na Instagramie i TikToku.',
    },
    pieces: {
      p8:  { title: 'Cristiano Ronaldo', meta: 'Piłkarz' },
      p9:  { title: 'Bedoes 2115',        meta: 'Polski raper' },
      p10: { title: 'Ed Sheeran',        meta: 'Znany muzyk' },
      p2:  { title: 'OKI',               meta: 'Polski muzyk' },
      p3:  { title: 'Barley The Burr',   meta: 'Streamer na Twitchu' },
      p7:  { title: 'Dwie prace',        meta: 'gotówe realizacje · pracownia' },
    },
    reels: {
      r1:  { title: 'Budowa i odsłona', meta: '0:17' },
      rb:  { title: 'Barley The Burr',     meta: '0:15' },
      rbb: { title: 'bbno$',               meta: '0:20' },
    },
    about: {
      tag: 'Pracownia', title: 'Tworzone ręcznie, ruch po ruchu',
      lead: 'Jestem Kacpur. Uładam kostki Rubika na czas od dzieciństwa — a teraz buduję z nich portrety. Bez przeklejania naklejek, bez skrótów: każda kostka jest naprawdę ułożona, tak by właściwy kolor był na wierzchu.',
      photo: 'Przeciągnij zdjęcie z pracowni / artysty',
    },
    process: [
      { n: '01', t: 'Wybierz zdjęcie', d: 'Prześlij mi zdjęcie — twarz, logo, okładkę albumu. Wszystko z mocnym kontrastem wygląda świetnie.' },
      { n: '02', t: 'Mapuj na siatkę kostek', d: 'Pikseluję je do siatki kwadratów i dopasowuję każdy piksel do jednego z sześciu kolorów kostki.' },
      { n: '03', t: 'Uładaj, ścianka po ściance', d: 'Każdą kostkę układam ręcznie, by właściwy kolor był na wierzchu. Setki, czasem tysiące kostek.' },
      { n: '04', t: 'Montaż i oprawa', d: 'Kostki blokuję w sztywnej siatce i oprawiam w litą dębinu, gotowe do powieszenia.' },
    ],
    pricing: {
      tag: 'Zamówienia', title: 'Miej własną pracę albo zbuduj moment dla marki',
      sub: 'Kup gotąwą mozaikę, zamów własny portret albo zaproprós mnie do promocji lub wydarzenia. Ceny są punktem wyjścia — każdą pracę wyceniam według rozmiaru.',
      popular: 'Najpopularniejsze',
      note: 'Otwarty na płatne promocje, współprace i licencje komercyjne — napisz poniżej.',
    },
    tiers: {
      full:  { name: 'Duże kostki',  tag: 'Mocny, graficzny',         price: '~8000 zł',     cubes: '494 kostki',
        feats: ['106 × 153 cm gotowe', '494 standardowe kostki Rubika', 'Wyrazisty, plakatowy portret', 'Rama z litego dębu'], cta: 'Zamów ten rozmiar' },
      small: { name: 'Małe kostki', tag: 'Drobny detal',              price: '10 000 zł',    cubes: '1200 kostek',
        feats: ['90 × 120 cm gotowe', '1200 mini kostek', 'Fotograficzny, bogaty detal', 'Rama z litego dębu'], cta: 'Zamów ten rozmiar' },
      brand: { name: 'Marka / event',   tag: 'Promocje i współprace', price: 'porozmawiajmy', cubes: 'dowolna skala',
        feats: ['Loga, maskotki, kampanie', 'Budowanie na żywo i timelapse’y', 'Realizacje wielkoformatowe', 'Otwarty na płatne promocje'], cta: 'Opisz projekt' },
    },
    contact: {
      tag: 'Kontakt', title: 'Zbudujmy coś razem',
      lead: 'Zamówienie, zakup czy współpraca — napisz, co masz na myśli, a odezwę się w ciągu dwóch dni roboczych.',
      igSub: 'Codzienne realizacje i timelapse’y', ttSub: 'Reelsy i klipy z budowy', emailSub: 'Briefy i wyceny',
      aboutLabel: 'Czego dotyczy wiadomość?',
      intents: ['Kup gotąwą pracę', 'Zamów portret', 'Promocja / współpraca', 'Coś innego'],
      name: 'Imię', email: 'E-mail', message: 'Wiadomość',
      phName: 'Twoje imię', phEmail: 'ty@email.com', phMessage: 'Opowiedz o pracy, motywie, przybliżonym rozmiarze i terminie…',
      errName: 'Podaj swoje imię', errEmail: 'Podaj poprawny e-mail', errMessage: 'Napisz trochę więcej, proszę',
      send: 'Wyślij wiadomość',
      sentTitle: 'Wiadomość wysłana', sentBody: 'Dzięki, {name} — odpowiem na {email} w ciągu dwóch dni roboczych.', sendAnother: 'Wyślij kolejną',
    },
    footer: {
      tagline: 'Zdjęcia odtworzone z kostek Rubika. Tworzone ręcznie w pracowni.',
      explore: 'Odkryj', connect: 'Kontakt', studio: 'Pracownia sztuki z kostek', built: 'tworzone ruch po ruchu',
    },
  },
}
