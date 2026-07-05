/*
 * Real work. Descriptions are working copy - tweak freely.
 * `cover` is the card thumbnail (640px), galleries use full-size images.
 * Links render as "Label: CTA" rows in the detail view.
 */
export const PROJECTS = [
  {
    id: 'vans-jeda',
    index: '01',
    category: 'Campaign',
    title: 'Vans × Jeda',
    blurb: 'Social campaign for a collab drop - built to stop the scroll.',
    role: 'Art direction · Layout · Social set',
    cover: '/work/vans-2-thumb.jpg',
    coverAlt: 'Vans × Jeda campaign post with bold layout',
    description: [
      'A full social set for a Vans collaboration drop: feed posts and stories cut from one visual system - type, color and rhythm consistent across every format.',
      'Designed so each post works alone, and the grid works as one piece.',
    ],
    gallery: [
      { src: '/work/vans-2.jpg', alt: 'Vans × Jeda feed post 1' },
      { src: '/work/vans-3.jpg', alt: 'Vans × Jeda feed post 2' },
      { src: '/work/vans-4.jpg', alt: 'Vans × Jeda feed post 3' },
      { src: '/work/vans-story.jpg', alt: 'Vans × Jeda story format' },
    ],
  },
  {
    id: 'covers',
    index: '02',
    category: 'Cover art',
    title: 'Album covers',
    blurb: 'Six covers, six moods - charcoal, halftone, night sky, gold.',
    role: 'Art direction · Artwork · Type',
    cover: '/work/zero75-chiedi-thumb.jpg',
    coverAlt: 'Chiedi Di Me cover: torn-edge collage with duotone photography',
    description: [
      'Covers for Zero75, Panda, Donci Kong and Kid Kontrasto. Every record gets its own room: the unresolved charcoal face of "William Blake", the halftone childhood memory of "10 Settembre", the lantern against the dark in "Luce", the gold blackletter of "Non è Musica Soltanto".',
      'Different artists, different moods - the same job: make the sleeve tell you what the music sounds like before you press play.',
    ],
    gallery: [
      { src: '/work/zero75-chiedi.jpg', alt: 'Zero75 ft. Sean Poly - Chiedi Di Me single cover' },
      { src: '/work/zero75-blake.jpg', alt: 'Zero75 - William Blake single cover' },
      { src: '/work/panda.jpg', alt: 'Panda - 10 Settembre album cover' },
      { src: '/work/luce.jpg', alt: 'Donci Kong - Luce album cover' },
      { src: '/work/kid-cover.jpg', alt: 'Kid Kontrasto - Non è Musica Soltanto album cover' },
      { src: '/work/slammer-cd.jpg', alt: 'Slammer Soundcrew - Dans Les Rues CD artwork' },
    ],
  },
  {
    id: 'posters',
    index: '03',
    category: 'Posters & promo',
    title: 'Ink on walls',
    blurb: 'Event posters and release promo, designed knowing the printer.',
    role: 'Poster design · Print production',
    cover: '/work/kid-promo-thumb.jpg',
    coverAlt: 'Kid Kontrasto release party poster with blackletter title',
    description: [
      'The launch-night poster for Kid Kontrasto\'s "Non è Musica Soltanto" and the anniversary poster for Slammer Sounds\' B-Day N°6 - graphics born on screen, finished on paper.',
      'Inks, formats and finishes chosen up front: the kind of job where knowing the press matters as much as knowing the pen.',
    ],
    gallery: [
      { src: '/work/kid-promo.jpg', alt: 'Release party poster for Non è Musica Soltanto' },
      { src: '/work/slammer-bday.jpg', alt: 'Slammer B-Day N°6 anniversary poster, black and white graffiti' },
    ],
  },
  {
    id: 'motion',
    index: '04',
    category: 'Motion',
    title: 'Moving pictures',
    blurb: 'Video direction, edits and logo animation.',
    role: 'Direction · Editing · Animation',
    cover: '/work/motion-direction.jpg',
    coverAlt: 'Still frame from a directed music video',
    description: [
      'Direction and editing for music videos, plus animated identity work - like the All Bars Game theme logo animation.',
      'Cut, timed and delivered ready to post.',
    ],
    gallery: [
      { src: '/work/motion-direction.jpg', alt: 'Video direction still' },
      { src: '/work/motion-edit.jpg', alt: 'Video editing still' },
    ],
    links: [
      {
        label: 'Direction and editing',
        cta: 'Watch video',
        href: 'https://www.youtube.com/watch?v=JwZPe_SuJ7w',
      },
      {
        label: 'Editing',
        cta: 'Watch video',
        href: 'https://www.youtube.com/watch?v=p9TI1u2b0JM',
      },
      {
        label: 'Theme logo animation',
        cta: 'See channel',
        href: 'https://www.youtube.com/@All_Bars_Game',
      },
    ],
  },
]
