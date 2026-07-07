/*
 * Real work. `cover` is the card thumbnail; galleries use full-size images.
 * Links render as "Label: CTA" rows in the detail view.
 * The lineup spans the whole craft: two shipped digital products, a brand
 * identity, an event identity, an editorial cover and a set of sleeves.
 */
export const PROJECTS = [
  {
    id: 'move',
    index: '01',
    category: 'Product',
    title: 'Move',
    blurb: 'A social planner that turns a stack of clients into a month of posts.',
    role: 'Product design · UI · Build',
    cover: '/work/move-login-thumb.jpg',
    coverAlt: 'Move login screen, acid-green wordmark on near-black',
    description: [
      'Move is a tool I built for the part of the job nobody enjoys: planning a month of social content for a stack of different clients. Each client keeps a profile - who they are, how they talk, what they sell - and Move turns that into a ready editorial plan in minutes.',
      'One dark, fast workspace: a dashboard that flags who needs a new plan, and a generator that drafts a whole month of posts - dates, formats, captions and visual notes - so the time goes into editing, not staring at an empty grid.',
    ],
    gallery: [
      { src: '/work/move-plan.jpg', alt: 'A generated editorial plan: post cards with date, format, caption and visual notes' },
      { src: '/work/move-dash.jpg', alt: 'Move dashboard: client cards, metrics and activity sparklines' },
      { src: '/work/move-generate.jpg', alt: 'Move plan generator, picking a client to start from' },
    ],
    links: [
      { label: 'Live tool', cta: 'Open Move', href: 'https://move-editorial-planner.netlify.app' },
    ],
  },
  {
    id: 'pandino',
    index: '02',
    category: 'App',
    title: 'Pandino',
    blurb: 'A Tesla-style companion app for a 2007 Fiat Panda.',
    role: 'Product design · 3D · Build',
    cover: '/work/pandino-dash-thumb.jpg',
    coverAlt: 'Pandino app: a yellow 3D Fiat Panda beside a status dashboard',
    description: [
      'Modern cars get a slick app. My 2007 Fiat Panda got Pandino. It keeps every deadline a car quietly piles up - insurance, road tax, the yearly inspection, the timing belt - in one calm dashboard that tells you what is due and exactly what to do about it.',
      'The car sits in the middle as a 3D model you can spin: tap a wheel, the hood or the body and it opens the right card. Everything lives on your device, offline. Built for one very specific car, designed so anyone could use it for theirs.',
    ],
    gallery: [
      { src: '/work/pandino-dash.jpg', alt: 'Pandino dashboard with an interactive 3D Fiat Panda' },
      { src: '/work/pandino-sheet.jpg', alt: 'A Pandino detail card explaining the car inspection deadline' },
      { src: '/work/pandino-mobile.jpg', alt: 'Pandino on mobile: 3D car above the status tiles' },
    ],
  },
  {
    id: 'berkana',
    index: '03',
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
      { src: '/work/berkana-cards.jpg', alt: 'Berkana business cards, navy and cream, held' },
      { src: '/work/berkana-cards2.jpg', alt: 'Berkana cards: a cream front beside a navy stack' },
      { src: '/work/berkana-cards3.jpg', alt: 'Berkana cards held against a teal backdrop' },
      { src: '/work/berkana-rsvp.jpg', alt: 'Berkana opening invitation with a duotone-blue architecture photo' },
    ],
  },
  {
    id: 'fregno',
    index: '04',
    category: 'Identity',
    title: 'Fregno',
    blurb: 'A teaser identity for a music venue that is not open yet.',
    role: 'Identity · Poster system · Type',
    cover: '/work/fregno-teal-thumb.jpg',
    coverAlt: 'Fregno poster: bold acid-green type on teal',
    description: [
      'Fregno is a music venue in the making. Before the doors open, the job was to build curiosity - so the identity arrived as a run of posters that say a lot with almost nothing: a night, a place, a wall of loud type in colours that keep changing.',
      'One elastic system, many faces - acid green on teal, on cobalt, on black - made to spread across walls and feeds and leave you asking what it is.',
    ],
    gallery: [
      { src: '/work/fregno-teal.jpg', alt: 'Fregno poster, acid green on teal: Ogni venerdi un party in centro' },
      { src: '/work/fregno-blue.jpg', alt: 'Fregno poster in the cobalt-blue colourway' },
      { src: '/work/fregno-black.jpg', alt: 'Fregno poster: genre list in lavender on black' },
    ],
  },
  {
    id: 'manuale',
    index: '05',
    category: 'Editorial',
    title: 'Il manuale maniacale',
    blurb: 'A cover about the little habits we cannot quite stop.',
    role: 'Concept · Illustration · Type',
    cover: '/work/manuale-thumb.jpg',
    coverAlt: "Cover of Il manuale maniacale: the letter m drawn as two bitten fingernails",
    description: [
      'A cover for "Il manuale maniacale", the manual of small manias. The idea had to carry the whole page, so the title letter does the work: the m is a pair of fingers, nails bitten to the quick. You get the joke before you read a word.',
      'Flat colour, one clean display face, a single visual pun - the kind of cover that makes you pick the thing up.',
    ],
    gallery: [
      { src: '/work/manuale.jpg', alt: 'Il manuale maniacale, the cover as a printed booklet' },
      { src: '/work/manuale-detail.jpg', alt: 'Detail: the m drawn as two fingers with bitten nails' },
    ],
  },
  {
    id: 'covers',
    index: '06',
    category: 'Cover art',
    title: 'Album covers',
    blurb: 'Sleeves that sound like the record before you press play.',
    role: 'Art direction · Artwork · Type',
    cover: '/work/zero75-chiedi-thumb.jpg',
    coverAlt: 'Chiedi Di Me cover: torn-edge collage with duotone photography',
    description: [
      'Covers for Zero75, Panda, Donci Kong and Kid Kontrasto. Every record gets its own room: the unresolved charcoal face of "William Blake", the halftone childhood photo of "10 Settembre", the lantern against the dark in "Luce", the gold blackletter of "Non e Musica Soltanto".',
      'Different artists, different moods - the same job: make the sleeve sound like the music before you press play.',
    ],
    gallery: [
      { src: '/work/zero75-chiedi.jpg', alt: 'Zero75 ft. Sean Poly - Chiedi Di Me single cover' },
      { src: '/work/zero75-blake.jpg', alt: 'Zero75 - William Blake single cover' },
      { src: '/work/panda.jpg', alt: 'Panda - 10 Settembre album cover' },
      { src: '/work/luce.jpg', alt: 'Donci Kong - Luce album cover' },
      { src: '/work/kid-cover.jpg', alt: 'Kid Kontrasto - Non e Musica Soltanto album cover' },
    ],
  },
]
