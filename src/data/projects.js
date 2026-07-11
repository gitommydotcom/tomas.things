/*
 * Real work. Each project renders in the list as a compact typographic
 * row - name, type (tipologia), tools, category (the macro family) - and
 * opens into a detail view: a lead image, the story, then the rest of
 * the images.
 *
 * User-facing copy is trilingual: any localizable field is an
 * L(en, it, cz) object. `localizeProjects(lang)` resolves a project to
 * plain strings for that language. `tools` and proper nouns (titles,
 * urls) are language-independent and pass through untouched.
 */
const L = (en, it, cz) => ({ en, it, cz })

const isL = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'en' in v
const pick = (v, lang) => (isL(v) ? v[lang] ?? v.en : v)

// macro families; labels live in the i18n UI dictionary (work.groups)
export const GROUPS = [
  { id: 'digital' },
  { id: 'identity' },
  { id: 'editorial' },
]

export const PROJECTS = [
  {
    id: 'belgrado',
    group: 'digital',
    category: L('Web app', 'Web app', 'Webová appka'),
    title: 'Belgrado & Gargano',
    tools: ['React', 'Leaflet', 'Firebase'],
    blurb: L(
      'An interactive travel dossier: a day-by-day plan, maps and a shared packing list.',
      'Un dossier di viaggio interattivo: programma giorno per giorno, mappe e una lista bagagli condivisa.',
      'Interaktivní cestovní dossier: program den po dni, mapy a sdílený seznam na balení.',
    ),
    role: L('Product design · UI · Build', 'Product design · UI · Sviluppo', 'Produktový design · UI · Vývoj'),
    cover: '/work/belgrado-browser.jpg',
    coverAlt: L(
      'The Belgrado & Gargano trip dossier open in a browser window',
      'Il dossier di viaggio Belgrado & Gargano aperto in una finestra del browser',
      'Cestovní dossier Belgrado & Gargano otevřený v okně prohlížeče',
    ),
    description: [
      L(
        'An interactive travel dossier that doubles as a template: a boarding-pass header, a day-by-day itinerary, beach and parking cards, a phrasebook and maps that pin every stop.',
        'Un dossier di viaggio interattivo che è anche un template: intestazione in stile carta d’imbarco, itinerario giorno per giorno, schede per spiagge e parcheggi, un frasario e mappe che segnano ogni tappa.',
        'Interaktivní cestovní dossier, který je zároveň šablonou: hlavička jako palubní lístek, itinerář den po dni, karty pláží a parkování, konverzační příručka a mapy, které připnou každé místo.',
      ),
      L(
        'Two people share it live through the cloud, with an offline fallback. Change the variables and it plans the next trip. (Personal details swapped out.)',
        'Due persone lo usano insieme in tempo reale, con una modalità offline quando salta il segnale. Cambi le variabili e organizza il viaggio dopo. (Dati personali sostituiti.)',
        'Dva lidé ho používají naživo přes cloud, s offline režimem. Změníš proměnné a naplánuje další cestu. (Osobní údaje vyměněné.)',
      ),
    ],
    gallery: [
      { src: '/work/belgrado-browser.jpg', alt: L(
        'The Belgrado & Gargano dossier in a browser: the boarding-pass ticket and trip title',
        'Il dossier Belgrado & Gargano nel browser: il biglietto in stile carta d’imbarco e il titolo del viaggio',
        'Dossier Belgrado & Gargano v prohlížeči: lístek jako palubní vstupenka a název cesty',
      ) },
      { src: '/work/belgrado-peschici.jpg', alt: L(
        'Peschici view: a teal seaside hero with travel facts',
        'Vista Peschici: una schermata sul mare turchese con le info di viaggio',
        'Pohled na Peschici: tyrkysová mořská scéna s cestovními údaji',
      ) },
      { src: '/work/belgrado-valigia.jpg', alt: L(
        'Packing view: an amber hero with per-person checklists',
        'Vista bagagli: una schermata ambra con le checklist per ogni persona',
        'Sekce balení: jantarová scéna se seznamy pro každou osobu',
      ) },
      { src: '/work/belgrado-see.jpg', alt: L(
        'Belgrade day plan with cards for what to see',
        'Il programma della giornata a Belgrado, con le schede su cosa vedere',
        'Denní plán Bělehradu s kartami, co vidět',
      ) },
    ],
  },
  {
    id: 'pandino',
    group: 'digital',
    category: L('Mobile app', 'App mobile', 'Mobilní appka'),
    title: 'Pandino',
    tools: ['React', 'Three.js'],
    blurb: L(
      'A Tesla-style companion app for a 2007 Fiat Panda.',
      'Un’app in stile Tesla per una Fiat Panda del 2007.',
      'Aplikace ve stylu Tesly pro Fiat Panda z roku 2007.',
    ),
    role: L('Product design · 3D · Build', 'Product design · 3D · Sviluppo', 'Produktový design · 3D · Vývoj'),
    cover: '/work/pandino-browser.jpg',
    coverAlt: L(
      'Pandino in a browser window: a yellow 3D Fiat Panda beside its status dashboard',
      'Pandino in una finestra del browser: una Fiat Panda 3D gialla accanto alla sua dashboard di stato',
      'Pandino v okně prohlížeče: žlutý 3D Fiat Panda vedle stavové nástěnky',
    ),
    description: [
      L(
        'Modern cars get a slick app. My 2007 Fiat Panda got Pandino: every deadline a car piles up - insurance, road tax, inspection, timing belt - gathered into one calm dashboard.',
        'Le auto moderne hanno un’app curata. La mia Fiat Panda del 2007 ha Pandino: ogni scadenza - assicurazione, bollo, revisione, cinghia - raccolta in un’unica schermata chiara.',
        'Moderní auta mají uhlazenou appku. Můj Fiat Panda z roku 2007 dostal Pandino: každá lhůta - pojištění, daň, technická, rozvody - v jedné přehledné obrazovce.',
      ),
      L(
        'The car sits in the middle as a 3D model you can spin: tap a part and the right card opens. Everything offline, on your device.',
        'Al centro c’è l’auto in 3D, che puoi ruotare: tocchi un pezzo e si apre la scheda giusta. Tutto offline, sul tuo dispositivo.',
        'Uprostřed je auto ve 3D, kterým můžeš otáčet: ťukneš na díl a otevře se správná karta. Všechno offline, ve tvém zařízení.',
      ),
    ],
    gallery: [
      { src: '/work/pandino-browser.jpg', alt: L(
        'Pandino in a browser window with its interactive 3D Fiat Panda',
        'Pandino in una finestra del browser con la sua Fiat Panda 3D interattiva',
        'Pandino v okně prohlížeče s interaktivním 3D Fiatem Panda',
      ) },
      { src: '/work/pandino-sheet.jpg', alt: L(
        'A Pandino detail card explaining the car inspection deadline',
        'Una scheda di dettaglio di Pandino che spiega la scadenza della revisione',
        'Detailní karta Pandina vysvětlující termín technické kontroly',
      ) },
      { src: '/work/pandino-mobile.jpg', alt: L(
        'Pandino on mobile: 3D car above the status tiles',
        'Pandino su mobile: auto 3D sopra i riquadri di stato',
        'Pandino na mobilu: 3D auto nad stavovými dlaždicemi',
      ) },
    ],
  },
  {
    id: 'move',
    group: 'digital',
    category: L('Web app', 'Web app', 'Webová appka'),
    title: 'Move',
    tools: ['React', 'Supabase'],
    blurb: L(
      'A social planner that turns a roster of clients into a month of posts.',
      'Un planner social che trasforma un parco clienti in un mese di post.',
      'Plánovač sociálních sítí, který z tvého portfolia klientů udělá měsíc příspěvků.',
    ),
    role: L('Product design · UI · Build', 'Product design · UI · Sviluppo', 'Produktový design · UI · Vývoj'),
    cover: '/work/move-browser.jpg',
    coverAlt: L(
      'The Move dashboard in a browser window: client cards, stats and sparklines',
      'La dashboard di Move in una finestra del browser: schede clienti, statistiche e sparkline',
      'Nástěnka Move v okně prohlížeče: karty klientů, statistiky a sparkliny',
    ),
    description: [
      L(
        'The tool I built for the part of the job nobody enjoys: planning a month of social content for a whole roster of clients. Each client keeps a living profile, and Move turns it into a finished editorial plan in one pass - dates, formats, captions, hashtags, SEO.',
        'Lo strumento che ho costruito per la parte del lavoro che non piace a nessuno: pianificare un mese di social per tutti i clienti. Ogni cliente ha un suo profilo, e Move lo trasforma in un piano editoriale completo in un colpo solo - date, formati, caption, hashtag, SEO.',
        'Nástroj pro tu část práce, co nikoho nebaví: naplánovat měsíc obsahu pro celé portfolio klientů. Každý klient má svůj profil a Move z něj na jeden zátah udělá hotový redakční plán - termíny, formáty, popisky, hashtagy, SEO.',
      ),
      L(
        'A dashboard flags who is overdue; everything syncs to the cloud, offline-first. Less staring at an empty calendar, more shipping.',
        'Una dashboard segnala chi è in ritardo; tutto si sincronizza nel cloud, anche offline. Meno calendario vuoto, più cose pubblicate.',
        'Nástěnka označí, kdo má zpoždění; všechno se synchronizuje do cloudu, i offline. Míň prázdného kalendáře, víc hotového.',
      ),
    ],
    gallery: [
      { src: '/work/move-browser.jpg', alt: L(
        'The Move dashboard in a browser: six client cards with metrics and sparklines',
        'La dashboard di Move nel browser: sei schede clienti con metriche e sparkline',
        'Nástěnka Move v prohlížeči: šest karet klientů s metrikami a sparkliny',
      ) },
      { src: '/work/move-plan.jpg', alt: L(
        'A generated editorial plan: post cards with date, format, caption, visual notes and hashtags',
        'Un piano editoriale generato: schede post con data, formato, caption, note visive e hashtag',
        'Vygenerovaný redakční plán: karty příspěvků s datem, formátem, popiskem, vizuálními poznámkami a hashtagy',
      ) },
      { src: '/work/move-clients.jpg', alt: L(
        'The Move clients list in a browser: six brand profiles with sector and city',
        'La lista clienti di Move nel browser: sei profili brand con settore e città',
        'Seznam klientů v Move v prohlížeči: šest profilů značek se sektorem a městem',
      ) },
      { src: '/work/move-generate.jpg', alt: L(
        'The Move plan generator: pick a client, then step through briefing and details',
        'Il generatore di piani di Move: scegli un cliente, poi passi da briefing e dettagli',
        'Generátor plánů v Move: vyber klienta a projdi briefingem i detaily',
      ) },
    ],
    links: [
      { label: L('Live tool', 'Strumento online', 'Živý nástroj'), cta: L('Open Move', 'Apri Move', 'Otevřít Move'), href: 'https://move-editorial-planner.netlify.app' },
    ],
  },
  {
    id: 'berkana',
    group: 'identity',
    category: L('Identity & print', 'Identità & stampa', 'Identita & tisk'),
    title: 'studio Berkana',
    tools: ['Illustrator', 'InDesign', 'Photoshop'],
    blurb: L(
      'Identity and communication for a high-end architecture studio.',
      'Identità e comunicazione per uno studio di architettura di alto livello.',
      'Identita a komunikace pro špičkové architektonické studio.',
    ),
    role: L('Brand identity · Art direction · Print', 'Brand identity · Art direction · Stampa', 'Vizuální identita · Art direction · Tisk'),
    cover: '/work/berkana-stationery-thumb.jpg',
    coverAlt: L(
      'studio Berkana stationery: navy and cream letterhead and cards',
      'Cancelleria studio Berkana: carta intestata e biglietti da visita blu notte e crema',
      'Papírnictví studia Berkana: hlavičkový papír a vizitky v tmavě modré a krémové',
    ),
    description: [
      L(
        "A high-end architecture and engineering studio in L'Aquila. Precise, considered work - so I gave them an identity to match: a geometric mark, a deep navy, a lot of quiet space.",
        "Uno studio di architettura e ingegneria di alto livello a L'Aquila. Un lavoro preciso e ragionato: gli ho dato un’identità all’altezza, fatta di un marchio geometrico, un blu notte profondo e tanto respiro.",
        "Špičkové architektonické a inženýrské studio v L'Aquile. Přesná, promyšlená práce - dal jsem jim tomu odpovídající identitu: geometrická značka, hluboká modrá, spousta klidného prostoru.",
      ),
      L(
        'Business cards, letterhead, a folded opening invitation, project and social visuals: one clear system, every piece from the same careful hand.',
        'Biglietti, carta intestata, un invito per l’inaugurazione, visual per progetti e social: un sistema unico, ogni pezzo uscito dalla stessa mano.',
        'Vizitky, hlavičkový papír, pozvánka na otevření, vizuály pro projekty i sítě: jeden systém, každý kus ze stejné ruky.',
      ),
    ],
    gallery: [
      { src: '/work/berkana-stationery.jpg', alt: L(
        'Berkana letterhead, cards and folder on a neutral surface',
        'Carta intestata, biglietti e cartellina Berkana su una superficie neutra',
        'Hlavičkový papír, vizitky a desky Berkana na neutrálním podkladu',
      ) },
      { src: '/work/berkana-map.jpg', alt: L(
        'A 3D territory map locating Berkana condo developments across Abruzzo',
        'Una mappa 3D del territorio che localizza i complessi residenziali Berkana in Abruzzo',
        '3D mapa území s umístěním rezidenčních projektů Berkana po celém Abruzzu',
      ) },
      { src: '/work/berkana-cards3.jpg', alt: L(
        'Berkana business cards, navy and cream, held against a teal backdrop',
        'Biglietti da visita Berkana, blu notte e crema, su uno sfondo verde acqua',
        'Vizitky Berkana, tmavě modrá a krémová, na petrolejovém pozadí',
      ) },
      { src: '/work/berkana-rsvp.jpg', alt: L(
        'Berkana opening invitation with a duotone-blue architecture photo',
        'Invito per l’inaugurazione Berkana con una foto di architettura in duotone blu',
        'Pozvánka na otevření Berkana s architektonickou fotkou v modrém duotonu',
      ) },
    ],
  },
  {
    id: 'edilfer',
    group: 'identity',
    category: L('Rebrand', 'Rebrand', 'Rebrand'),
    title: 'Corti Edil-Fer',
    tools: ['Illustrator', 'Photoshop', 'React'],
    blurb: L(
      'A full rebrand for a construction firm - snail and all.',
      'Un rebrand completo per un’impresa edile - lumaca compresa.',
      'Kompletní rebrand pro stavební firmu - i se šnekem.',
    ),
    role: L('Brand identity · Mascot · Web design · Build', 'Brand identity · Mascotte · Web design · Sviluppo', 'Vizuální identita · Maskot · Webdesign · Vývoj'),
    cover: '/work/edilfer-cards.jpg',
    coverAlt: L(
      'Corti Edil-Fer business cards, green and white with the snail mark',
      'Biglietti da visita Corti Edil-Fer, verde e bianco con la lumaca',
      'Vizitky Corti Edil-Fer, zelenobílé se značkou šneka',
    ),
    description: [
      L(
        'A building firm - and building is the one job where rushing shows. So the mascot is a snail, unhurried and exact, curled into a mark that is both the C of Corti and the e of Edil-Fer.',
        'Un’impresa edile - e nell’edilizia la fretta si vede. Così la mascotte è una lumaca, lenta e precisa, raccolta in un marchio che è insieme la C di Corti e la e di Edil-Fer.',
        'Stavební firma - a na stavbě je spěch vidět. Maskotem je proto šnek, pomalý a přesný, stočený do značky, která je zároveň C od Corti i e od Edil-Fer.',
      ),
      L(
        'A green-and-navy system built to survive a site: emblem, full lockup, the parent Edil-Fer cut, the snail alone. The same system runs the website, cortiedilfer.it, designed and built end to end.',
        'Un sistema verde e blu notte pensato per il cantiere: emblema, logo completo, la versione Edil-Fer, la lumaca da sola. Lo stesso sistema regge il sito, cortiedilfer.it, progettato e sviluppato da cima a fondo.',
        'Zeleno-modrý systém pro stavbu: emblém, celé logo, verze Edil-Fer, samotný šnek. Stejný systém pohání i web, cortiedilfer.it, navržený a postavený od začátku do konce.',
      ),
    ],
    gallery: [
      { src: '/work/edilfer-logo.jpg', alt: L(
        'The Corti Edil-Fer primary lockup: blue Corti, green Edil-Fer and the snail mark',
        'Il logo principale Corti Edil-Fer: Corti in blu, Edil-Fer in verde e la lumaca',
        'Hlavní logo Corti Edil-Fer: modré Corti, zelené Edil-Fer a značka šneka',
      ) },
      { src: '/work/edilfer-web.jpg', alt: L(
        'The Corti Edil-Fer website on three phones: homepage, the paints page and the menu',
        'Il sito Corti Edil-Fer su tre telefoni: homepage, la pagina delle vernici e il menu',
        'Web Corti Edil-Fer na třech telefonech: homepage, stránka s barvami a menu',
      ) },
      { src: '/work/edilfer-cards.jpg', alt: L(
        'Corti Edil-Fer business cards, a white front and a green back with the snail',
        'Biglietti da visita Corti Edil-Fer, fronte bianco e retro verde con la lumaca',
        'Vizitky Corti Edil-Fer, bílá přední strana a zelená zadní se šnekem',
      ) },
      { src: '/work/edilfer-suite.jpg', alt: L(
        'The logo suite: lockup, emblem, Edil-Fer wordmark and the snail mascot',
        'La famiglia del logo: versione completa, emblema, logotipo Edil-Fer e la mascotte lumaca',
        'Rodina loga: kompletní verze, emblém, logotyp Edil-Fer a maskot šneka',
      ) },
    ],
    links: [
      { label: L('Live site', 'Sito online', 'Živý web'), cta: 'cortiedilfer.it', href: 'https://www.cortiedilfer.it' },
    ],
  },
  {
    id: 'fregno',
    group: 'identity',
    category: L('Poster identity', 'Identità & manifesti', 'Identita & plakáty'),
    title: 'Fregno',
    tools: ['Illustrator', 'InDesign'],
    blurb: L(
      'A teaser identity for a music venue that is not open yet.',
      'Un’identità teaser per un locale musicale non ancora aperto.',
      'Teaser identita pro hudební klub, který ještě neotevřel.',
    ),
    role: L('Identity · Poster system · Type', 'Identità · Sistema di manifesti · Lettering', 'Identita · Plakátový systém · Písmo'),
    cover: '/work/fregno-wall.jpg',
    coverAlt: L(
      'Three Fregno posters wheatpasted on a concrete wall',
      'Tre manifesti Fregno affissi su un muro di cemento',
      'Tři plakáty Fregno vylepené na betonové zdi',
    ),
    description: [
      L(
        'A music venue that has not opened yet, so the job was pure curiosity: a run of posters that say a lot with almost nothing - a night, a place, a wall of loud type.',
        'Un locale che deve ancora aprire, quindi il compito era uno solo: curiosità. Una serie di manifesti che dicono molto con quasi niente - una serata, un luogo, un muro di lettere urlate.',
        'Klub, který ještě neotevřel, takže úkol byl jediný: zvědavost. Série plakátů, které řeknou hodně skoro ničím - noc, místo, zeď hlasitého písma.',
      ),
      L(
        'One elastic system, many faces: acid green on teal, on cobalt, on black. Made to spread across walls and feeds.',
        'Un sistema elastico, tante facce: verde acido su verde acqua, su cobalto, su nero. Fatto per spargersi tra muri e feed.',
        'Jeden pružný systém, spousta tváří: kyselá zelená na petrolejové, na kobaltové, na černé. Udělaný, aby se šířil po zdech i ve feedech.',
      ),
    ],
    gallery: [
      { src: '/work/fregno-wall.jpg', alt: L(
        'Three Fregno posters wheatpasted together on a wall',
        'Tre manifesti Fregno affissi insieme su un muro',
        'Tři plakáty Fregno vylepené vedle sebe na zdi',
      ) },
      { src: '/work/fregno-teal.jpg', alt: L(
        'Fregno poster, acid green on teal: Ogni venerdi un party in centro',
        'Manifesto Fregno, verde acido su verde acqua: Ogni venerdì un party in centro',
        'Plakát Fregno, kyselá zelená na petrolejové: Ogni venerdì un party in centro',
      ) },
      { src: '/work/fregno-blue.jpg', alt: L(
        'Fregno poster in the cobalt-blue colourway',
        'Manifesto Fregno nella variante blu cobalto',
        'Plakát Fregno v kobaltově modré variantě',
      ) },
      { src: '/work/fregno-black.jpg', alt: L(
        'Fregno poster: genre list in lavender on black',
        'Manifesto Fregno: lista di generi in lavanda su nero',
        'Plakát Fregno: seznam žánrů v levandulové na černé',
      ) },
    ],
  },
  {
    id: 'manuale',
    group: 'editorial',
    category: L('Book cover', 'Copertina', 'Obálka knihy'),
    title: 'Il manuale maniacale',
    tools: ['Illustrator', 'InDesign'],
    blurb: L(
      'The cover for a diary I made to help people quit biting their nails.',
      'La copertina di un diario che ho creato per aiutare a smettere di mangiarsi le unghie.',
      'Obálka deníku, který jsem vytvořil, aby lidem pomohl přestat si okusovat nehty.',
    ),
    role: L('Concept · Illustration · Type', 'Concept · Illustrazione · Lettering', 'Koncept · Ilustrace · Písmo'),
    cover: '/work/manuale-poster.jpg',
    coverAlt: L(
      'The Il manuale maniacale cover: the orange m drawn as two bitten fingernails on pink',
      'La copertina di Il manuale maniacale: la m arancione come due unghie mangiate su rosa',
      'Obálka Il manuale maniacale: oranžové m jako dva okousané nehty na růžové',
    ),
    description: [
      L(
        'The cover for a diary made to help people stop biting their nails. The idea had to carry the page, so the title letter does the work: the m is a pair of fingers, nails bitten to the quick.',
        'La copertina di un diario per aiutare a smettere di mangiarsi le unghie. L’idea doveva reggere la pagina, così a lavorare è la lettera del titolo: la m sono due dita, con le unghie mangiate fino alla carne.',
        'Obálka deníku, který má pomoct přestat si okusovat nehty. Nápad musel unést stránku, tak pracuje písmeno z názvu: m jsou dva prsty s nehty okousanými až do masa.',
      ),
      L(
        'Flat colour, one clean display face, a single visual pun - the kind of cover that makes you pick it up, and maybe put your fingers down.',
        'Colore piatto, un solo carattere display, un’unica trovata visiva - la copertina che ti fa prendere il libro, e magari toglierti le dita dalla bocca.',
        'Plochá barva, jeden display font, jediná vizuální hříčka - obálka, po které knihu vezmeš do ruky a možná dáš prsty pryč od pusy.',
      ),
    ],
    gallery: [
      { src: '/work/manuale-poster.jpg', alt: L(
        'The Il manuale maniacale cover: the orange m as two bitten fingernails on pink',
        'La copertina di Il manuale maniacale: la m arancione come due unghie mangiate su rosa',
        'Obálka Il manuale maniacale: oranžové m jako dva okousané nehty na růžové',
      ) },
      { src: '/work/manuale-detail.jpg', alt: L(
        'Detail: the m drawn as two fingers with bitten nails',
        'Dettaglio: la m disegnata come due dita con le unghie mangiate',
        'Detail: m nakreslené jako dva prsty s okousanými nehty',
      ) },
      { src: '/work/manuale.jpg', alt: L(
        'Il manuale maniacale, the cover as a printed booklet',
        'Il manuale maniacale, la copertina come libretto stampato',
        'Il manuale maniacale, obálka jako vytištěná brožura',
      ) },
    ],
  },
  {
    id: 'covers',
    group: 'editorial',
    category: L('Cover art', 'Cover', 'Obaly'),
    title: L('Album covers', 'Copertine', 'Obaly alb'),
    tools: ['Photoshop', 'Illustrator'],
    blurb: L(
      'Sleeves that sound like the record before you press play.',
      'Copertine che suonano come il disco prima ancora di premere play.',
      'Obaly, které znějí jako deska ještě předtím, než pustíš play.',
    ),
    role: L('Art direction · Artwork · Type', 'Art direction · Artwork · Lettering', 'Art direction · Artwork · Písmo'),
    cover: '/work/album-vinyl-chiedi.jpg',
    coverAlt: L(
      'Chiedi Di Me sleeve with the record pulled out, the cover art on the label',
      'Copertina di Chiedi Di Me con il disco sfilato, l’artwork sull’etichetta',
      'Obal Chiedi Di Me s vytaženou deskou, cover art na labelu',
    ),
    description: [
      L(
        'Covers for Zero75, Donci Kong and Kid Kontrasto. Every record gets its own world: the charcoal face of "William Blake", the teal duotone of "Chiedi Di Me", the lantern in "Luce", the gold blackletter of "Non e Musica Soltanto".',
        'Copertine per Zero75, Donci Kong e Kid Kontrasto. Ogni disco ha il suo mondo: il volto a carboncino di "William Blake", il duotone verde acqua di "Chiedi Di Me", la lanterna di "Luce", il blackletter dorato di "Non è Musica Soltanto".',
        'Obaly pro Zero75, Donci Kong a Kid Kontrasto. Každá deska má svůj svět: uhlová tvář "William Blake", tyrkysový duoton "Chiedi Di Me", lucerna v "Luce", zlatý blackletter "Non è Musica Soltanto".',
      ),
      L(
        'Different artists, different moods - one job: make the sleeve sound like the music before you press play.',
        'Artisti diversi, atmosfere diverse - un solo compito: far suonare la copertina come la musica prima di premere play.',
        'Různí umělci, různé nálady - jeden úkol: rozeznít obal jako hudbu ještě předtím, než pustíš play.',
      ),
    ],
    gallery: [
      { src: '/work/album-vinyl-blake.jpg', alt: L(
        'Zero75 - William Blake, sleeve and record',
        'Zero75 - William Blake, copertina e disco',
        'Zero75 - William Blake, obal a deska',
      ) },
      { src: '/work/album-vinyl-chiedi.jpg', alt: L(
        'Zero75 ft. Sean Poly - Chiedi Di Me, sleeve and record',
        'Zero75 ft. Sean Poly - Chiedi Di Me, copertina e disco',
        'Zero75 ft. Sean Poly - Chiedi Di Me, obal a deska',
      ) },
      { src: '/work/album-vinyl-luce.jpg', alt: L(
        'Donci Kong - Luce, sleeve and record',
        'Donci Kong - Luce, copertina e disco',
        'Donci Kong - Luce, obal a deska',
      ) },
      { src: '/work/album-vinyl-kid.jpg', alt: L(
        'Kid Kontrasto - Non e Musica Soltanto, sleeve and record',
        'Kid Kontrasto - Non è Musica Soltanto, copertina e disco',
        'Kid Kontrasto - Non è Musica Soltanto, obal a deska',
      ) },
    ],
  },
]

/* Resolve a project's trilingual fields to plain strings for `lang`. */
export function localizeProject(project, lang) {
  return {
    ...project,
    category: pick(project.category, lang),
    title: pick(project.title, lang),
    blurb: pick(project.blurb, lang),
    role: pick(project.role, lang),
    coverAlt: pick(project.coverAlt, lang),
    description: project.description.map((p) => pick(p, lang)),
    gallery: project.gallery.map((g) => ({ ...g, alt: pick(g.alt, lang) })),
    links: project.links?.map((l) => ({ ...l, label: pick(l.label, lang), cta: pick(l.cta, lang) })),
  }
}

export function localizeProjects(lang) {
  return PROJECTS.map((p) => localizeProject(p, lang))
}
