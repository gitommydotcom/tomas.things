/*
 * Real work, grouped into macro sections (see `group`). `cover` is the
 * card image; galleries open full-size in the lightbox. Links render as
 * "Label: CTA" rows in the detail view.
 */
export const GROUPS = [
  { id: 'digital', label: 'Digital products' },
  { id: 'identity', label: 'Brand identity' },
  { id: 'editorial', label: 'Print & editorial' },
]

export const PROJECTS = [
  {
    id: 'belgrado',
    index: '01',
    group: 'digital',
    category: 'Web app',
    title: 'Belgrado & Gargano',
    blurb: 'An interactive travel dossier: a day-by-day plan, maps and a shared packing list.',
    role: 'Product design · UI · Build',
    cover: '/work/belgrado-browser.jpg',
    coverAlt: 'The Belgrado & Gargano trip dossier open in a browser window',
    description: [
      'Belgrado & Gargano is a template as much as a trip. It plans a full week split between a city and the sea, but the structure is built to be re-run for any destination: a boarding-pass header, a day-by-day itinerary you open one day at a time, beach and parking cards, a phrasebook, and interactive maps that pin every spot.',
      'Under the warm, magazine-like surface it is a fairly deep system - dozens of moving parts across days, places, transport, budgets, packing and checklists, all editable and all kept in sync. Two people share it live through the cloud, ticking things off on both phones at once, with an offline fallback when the signal drops. Change the variables and the same dossier plans the next trip. (Shown here with the personal details swapped out.)',
    ],
    gallery: [
      { src: '/work/belgrado-browser.jpg', alt: 'The Belgrado & Gargano dossier in a browser: the boarding-pass ticket and trip title' },
      { src: '/work/belgrado-peschici.jpg', alt: 'Peschici view: a teal seaside hero with travel facts' },
      { src: '/work/belgrado-valigia.jpg', alt: 'Packing view: an amber hero with per-person checklists' },
      { src: '/work/belgrado-see.jpg', alt: 'Belgrade day plan with cards for what to see' },
    ],
  },
  {
    id: 'pandino',
    index: '02',
    group: 'digital',
    category: 'App',
    title: 'Pandino',
    blurb: 'A Tesla-style companion app for a 2007 Fiat Panda.',
    role: 'Product design · 3D · Build',
    cover: '/work/pandino-browser.jpg',
    coverAlt: 'Pandino in a browser window: a yellow 3D Fiat Panda beside its status dashboard',
    description: [
      'Modern cars get a slick app. My 2007 Fiat Panda got Pandino. It keeps every deadline a car quietly piles up - insurance, road tax, the yearly inspection, the timing belt - in one calm dashboard that tells you what is due and exactly what to do about it.',
      'The car sits in the middle as a 3D model you can spin: tap a wheel, the hood or the body and it opens the right card. Everything lives on your device, offline. Built for one very specific car, designed so anyone could use it for theirs.',
    ],
    gallery: [
      { src: '/work/pandino-browser.jpg', alt: 'Pandino in a browser window with its interactive 3D Fiat Panda' },
      { src: '/work/pandino-sheet.jpg', alt: 'A Pandino detail card explaining the car inspection deadline' },
      { src: '/work/pandino-mobile.jpg', alt: 'Pandino on mobile: 3D car above the status tiles' },
    ],
  },
  {
    id: 'move',
    index: '03',
    group: 'digital',
    category: 'Product',
    title: 'Move',
    blurb: 'A social planner that turns a roster of clients into a month of posts.',
    role: 'Product design · UI · Build',
    cover: '/work/move-browser.jpg',
    coverAlt: 'The Move dashboard in a browser window: client cards, stats and sparklines',
    description: [
      'Move is the tool I built for the part of the job nobody enjoys: planning a month of social content for a whole roster of clients. Each client keeps a living profile - who they are, how they talk, what they sell, which platforms - and Move turns that into a finished editorial plan in one pass: dates, formats, objectives, captions, visual directions, hashtags and SEO notes, all ready to edit.',
      'It is built to actually run an agency week. A dashboard flags which clients are overdue and draws an activity sparkline for each one; the generator drafts a whole month at a time; and everything syncs to the cloud so it follows you between devices, with an offline-first fallback when the signal drops. Less staring at an empty calendar, more shipping.',
    ],
    gallery: [
      { src: '/work/move-browser.jpg', alt: 'The Move dashboard in a browser: six client cards with metrics and sparklines' },
      { src: '/work/move-plan.jpg', alt: 'A generated editorial plan: post cards with date, format, caption, visual notes and hashtags' },
    ],
    links: [
      { label: 'Live tool', cta: 'Open Move', href: 'https://move-editorial-planner.netlify.app' },
    ],
  },
  {
    id: 'berkana',
    index: '04',
    group: 'identity',
    category: 'Brand identity',
    title: 'studio Berkana',
    blurb: 'Identity and communication for a high-end architecture studio.',
    role: 'Brand identity · Art direction · Print',
    cover: '/work/berkana-stationery-thumb.jpg',
    coverAlt: 'studio Berkana stationery: navy and cream letterhead and cards',
    description: [
      "Studio Berkana is a high-end architecture and engineering practice in L'Aquila. They do precise, considered work, and their communication needed to match. I gave them an identity that says it plainly - a geometric mark, a deep navy, a lot of quiet space - and carried it across everything the studio hands a client.",
      'Business cards, letterhead, a folded invitation for the new-office opening, plus the project and social visuals: one clear system, so every piece looks like it came from the same careful hand.',
    ],
    gallery: [
      { src: '/work/berkana-stationery.jpg', alt: 'Berkana letterhead, cards and folder on a neutral surface' },
      { src: '/work/berkana-map.jpg', alt: 'A 3D territory map locating Berkana condo developments across Abruzzo' },
      { src: '/work/berkana-cards3.jpg', alt: 'Berkana business cards, navy and cream, held against a teal backdrop' },
      { src: '/work/berkana-rsvp.jpg', alt: 'Berkana opening invitation with a duotone-blue architecture photo' },
    ],
  },
  {
    id: 'edilfer',
    index: '05',
    group: 'identity',
    category: 'Rebrand',
    title: 'Corti Edil-Fer',
    blurb: 'A full rebrand for a construction firm - snail and all.',
    role: 'Brand identity · Mascot · Web design · Build',
    cover: '/work/edilfer-cards.jpg',
    coverAlt: 'Corti Edil-Fer business cards, green and white with the snail mark',
    description: [
      'Corti Edil-Fer is a building firm, and building is the one job where rushing shows. So the rebrand leans into it: a snail as the mascot, unhurried and exact, curled into a mark that doubles as the C of Corti and the e of Edil-Fer.',
      'A green-and-navy system built to survive a construction site: one bold emblem for stamps and signage, the full Corti Edil-Fer lockup for paperwork, the parent Edil-Fer cut, and the snail on its own for everything small. Loud where it needs to be, legible everywhere.',
      'The same system runs the website, cortiedilfer.it - designed and built end to end, so the brand you meet on a business card is the brand you meet online.',
    ],
    gallery: [
      { src: '/work/edilfer-logo.jpg', alt: 'The Corti Edil-Fer primary lockup: blue Corti, green Edil-Fer and the snail mark' },
      { src: '/work/edilfer-web.jpg', alt: 'The Corti Edil-Fer website on three phones: homepage, the paints page and the menu' },
      { src: '/work/edilfer-cards.jpg', alt: 'Corti Edil-Fer business cards, a white front and a green back with the snail' },
      { src: '/work/edilfer-suite.jpg', alt: 'The logo suite: lockup, emblem, Edil-Fer wordmark and the snail mascot' },
    ],
    links: [
      { label: 'Live site', cta: 'cortiedilfer.it', href: 'https://www.cortiedilfer.it' },
    ],
  },
  {
    id: 'fregno',
    index: '06',
    group: 'identity',
    category: 'Identity',
    title: 'Fregno',
    blurb: 'A teaser identity for a music venue that is not open yet.',
    role: 'Identity · Poster system · Type',
    cover: '/work/fregno-wall.jpg',
    coverAlt: 'Three Fregno posters wheatpasted on a concrete wall',
    description: [
      'Fregno is a music venue in the making. Before the doors open, the job was to build curiosity - so the identity arrived as a run of posters that say a lot with almost nothing: a night, a place, a wall of loud type in colours that keep changing.',
      'One elastic system, many faces - acid green on teal, on cobalt, on black - made to spread across walls and feeds and leave you asking what it is.',
    ],
    gallery: [
      { src: '/work/fregno-wall.jpg', alt: 'Three Fregno posters wheatpasted together on a wall' },
      { src: '/work/fregno-teal.jpg', alt: 'Fregno poster, acid green on teal: Ogni venerdi un party in centro' },
      { src: '/work/fregno-blue.jpg', alt: 'Fregno poster in the cobalt-blue colourway' },
      { src: '/work/fregno-black.jpg', alt: 'Fregno poster: genre list in lavender on black' },
    ],
  },
  {
    id: 'manuale',
    index: '07',
    group: 'editorial',
    category: 'Editorial',
    title: 'Il manuale maniacale',
    blurb: 'The cover for a diary I made to help people quit biting their nails.',
    role: 'Concept · Illustration · Type',
    cover: '/work/manuale-detail.jpg',
    coverAlt: 'Detail of Il manuale maniacale: the m drawn as two bitten fingernails',
    description: [
      'The cover for "Il manuale maniacale", a diary I made to help people stop biting their nails - a small daily companion for a habit that is hard to break. The idea had to carry the whole page, so the title letter does the work: the m is a pair of fingers, nails bitten to the quick. You get the joke, and the point, before you read a word.',
      'Flat colour, one clean display face, a single visual pun - the kind of cover that makes you pick the thing up, and maybe put your fingers down.',
    ],
    gallery: [
      { src: '/work/manuale.jpg', alt: 'Il manuale maniacale, the cover as a printed booklet' },
      { src: '/work/manuale-detail.jpg', alt: 'Detail: the m drawn as two fingers with bitten nails' },
    ],
  },
  {
    id: 'covers',
    index: '08',
    group: 'editorial',
    category: 'Cover art',
    title: 'Album covers',
    blurb: 'Sleeves that sound like the record before you press play.',
    role: 'Art direction · Artwork · Type',
    cover: '/work/album-vinyl-chiedi.jpg',
    coverAlt: 'Chiedi Di Me sleeve with the record pulled out, the cover art on the label',
    description: [
      'Covers for Zero75, Donci Kong and Kid Kontrasto. Every record gets its own room: the unresolved charcoal face of "William Blake", the teal duotone of "Chiedi Di Me", the lantern against the dark in "Luce", the gold blackletter of "Non e Musica Soltanto".',
      'Different artists, different moods - the same job: make the sleeve sound like the music before you press play.',
    ],
    gallery: [
      { src: '/work/album-vinyl-blake.jpg', alt: 'Zero75 - William Blake, sleeve and record' },
      { src: '/work/album-vinyl-chiedi.jpg', alt: 'Zero75 ft. Sean Poly - Chiedi Di Me, sleeve and record' },
      { src: '/work/album-vinyl-luce.jpg', alt: 'Donci Kong - Luce, sleeve and record' },
      { src: '/work/album-vinyl-kid.jpg', alt: 'Kid Kontrasto - Non e Musica Soltanto, sleeve and record' },
    ],
  },
]
