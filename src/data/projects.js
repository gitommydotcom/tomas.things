/*
 * Real work, grouped into macro sections (see `group`). `cover` is the
 * card image; galleries open full-size in the lightbox. Links render as
 * "Label: CTA" rows in the detail view.
 *
 * User-facing copy is trilingual: any localizable field is an
 * L(en, it, cz) object. `localizeProjects(lang)` resolves a whole project
 * to plain strings for that language; proper nouns (titles, product
 * names, urls) stay as plain strings and pass through untouched.
 */
const L = (en, it, cz) => ({ en, it, cz })

const isL = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'en' in v
const pick = (v, lang) => (isL(v) ? v[lang] ?? v.en : v)

// group ids only; the labels live in the i18n UI dictionary (work.groups)
export const GROUPS = [
  { id: 'digital' },
  { id: 'identity' },
  { id: 'editorial' },
]

export const PROJECTS = [
  {
    id: 'belgrado',
    index: '01',
    group: 'digital',
    category: L('Web app', 'Web app', 'Webová aplikace'),
    title: 'Belgrado & Gargano',
    blurb: L(
      'An interactive travel dossier: a day-by-day plan, maps and a shared packing list.',
      'Un dossier di viaggio interattivo: piano giorno per giorno, mappe e una lista bagagli condivisa.',
      'Interaktivní cestovní dossier: plán den po dni, mapy a sdílený seznam na balení.',
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
        'Belgrado & Gargano is a template as much as a trip. It plans a full week split between a city and the sea, but the structure is built to be re-run for any destination: a boarding-pass header, a day-by-day itinerary you open one day at a time, beach and parking cards, a phrasebook, and interactive maps that pin every spot.',
        'Belgrado & Gargano è un template tanto quanto un viaggio. Pianifica una settimana intera divisa tra città e mare, ma la struttura è pensata per essere riusata per qualsiasi meta: un’intestazione a carta d’imbarco, un itinerario giorno per giorno che apri un giorno alla volta, schede spiagge e parcheggi, un frasario e mappe interattive che segnano ogni luogo.',
        'Belgrado & Gargano je stejně tak šablona jako výlet. Naplánuje celý týden rozdělený mezi město a moře, ale struktura je udělaná tak, aby se dala spustit znovu pro jakoukoli destinaci: hlavička jako palubní lístek, itinerář den po dni, který otevíráš vždy po jednom dni, karty pláží a parkování, konverzační příručka a interaktivní mapy, které připnou každé místo.',
      ),
      L(
        'Under the warm, magazine-like surface it is a fairly deep system - dozens of moving parts across days, places, transport, budgets, packing and checklists, all editable and all kept in sync. Two people share it live through the cloud, ticking things off on both phones at once, with an offline fallback when the signal drops. Change the variables and the same dossier plans the next trip. (Shown here with the personal details swapped out.)',
        'Sotto la superficie calda e da rivista c’è un sistema piuttosto profondo - decine di elementi tra giorni, luoghi, trasporti, budget, bagagli e checklist, tutti modificabili e sempre sincronizzati. Due persone lo condividono dal vivo tramite il cloud, spuntando le cose su entrambi i telefoni insieme, con un fallback offline quando manca il segnale. Cambi le variabili e lo stesso dossier pianifica il viaggio successivo. (Qui mostrato con i dati personali sostituiti.)',
        'Pod teplým, magazínovým povrchem je to poměrně hluboký systém - desítky pohyblivých částí napříč dny, místy, dopravou, rozpočty, balením a seznamy, všechno editovatelné a stále synchronizované. Dva lidé ho sdílejí naživo přes cloud a odškrtávají věci na obou telefonech zároveň, s offline zálohou, když vypadne signál. Změníš proměnné a stejný dossier naplánuje další cestu. (Zde s vyměněnými osobními údaji.)',
      ),
    ],
    gallery: [
      { src: '/work/belgrado-browser.jpg', alt: L(
        'The Belgrado & Gargano dossier in a browser: the boarding-pass ticket and trip title',
        'Il dossier Belgrado & Gargano nel browser: il biglietto a carta d’imbarco e il titolo del viaggio',
        'Dossier Belgrado & Gargano v prohlížeči: lístek jako palubní vstupenka a název cesty',
      ) },
      { src: '/work/belgrado-peschici.jpg', alt: L(
        'Peschici view: a teal seaside hero with travel facts',
        'Vista Peschici: un’immagine di mare turchese con le info di viaggio',
        'Pohled na Peschici: tyrkysová mořská scéna s cestovními údaji',
      ) },
      { src: '/work/belgrado-valigia.jpg', alt: L(
        'Packing view: an amber hero with per-person checklists',
        'Vista bagagli: un’immagine ambra con checklist per ogni persona',
        'Sekce balení: jantarová scéna se seznamy pro každou osobu',
      ) },
      { src: '/work/belgrado-see.jpg', alt: L(
        'Belgrade day plan with cards for what to see',
        'Piano della giornata a Belgrado con schede su cosa vedere',
        'Denní plán Bělehradu s kartami, co vidět',
      ) },
    ],
  },
  {
    id: 'pandino',
    index: '02',
    group: 'digital',
    category: L('App', 'App', 'Aplikace'),
    title: 'Pandino',
    blurb: L(
      'A Tesla-style companion app for a 2007 Fiat Panda.',
      'Un’app companion in stile Tesla per una Fiat Panda del 2007.',
      'Doprovodná aplikace ve stylu Tesly pro Fiat Panda z roku 2007.',
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
        'Modern cars get a slick app. My 2007 Fiat Panda got Pandino. It keeps every deadline a car quietly piles up - insurance, road tax, the yearly inspection, the timing belt - in one calm dashboard that tells you what is due and exactly what to do about it.',
        'Le auto moderne hanno un’app curata. La mia Fiat Panda del 2007 ha Pandino. Tiene insieme ogni scadenza che un’auto accumula in silenzio - assicurazione, bollo, revisione annuale, cinghia di distribuzione - in un’unica dashboard tranquilla che ti dice cosa scade e cosa fare esattamente.',
        'Moderní auta mají uhlazenou appku. Můj Fiat Panda z roku 2007 dostal Pandino. Drží pohromadě každou lhůtu, kterou auto tiše nasbírá - pojištění, silniční daň, roční technickou, rozvodový řemen - v jedné klidné nástěnce, která ti řekne, co je na řadě a co přesně s tím.',
      ),
      L(
        'The car sits in the middle as a 3D model you can spin: tap a wheel, the hood or the body and it opens the right card. Everything lives on your device, offline. Built for one very specific car, designed so anyone could use it for theirs.',
        'L’auto sta al centro come modello 3D che puoi ruotare: tocca una ruota, il cofano o la carrozzeria e si apre la scheda giusta. Tutto vive sul tuo dispositivo, offline. Costruita per un’auto molto specifica, progettata perché chiunque possa usarla per la propria.',
        'Auto je uprostřed jako 3D model, kterým můžeš otáčet: ťukni na kolo, kapotu nebo karoserii a otevře se správná karta. Všechno běží ve tvém zařízení, offline. Postavené pro jedno konkrétní auto, navržené tak, aby ho pro to svoje mohl použít kdokoli.',
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
        'Pandino su mobile: auto 3D sopra le caselle di stato',
        'Pandino na mobilu: 3D auto nad stavovými dlaždicemi',
      ) },
    ],
  },
  {
    id: 'move',
    index: '03',
    group: 'digital',
    category: L('Product', 'Prodotto', 'Produkt'),
    title: 'Move',
    blurb: L(
      'A social planner that turns a roster of clients into a month of posts.',
      'Un planner social che trasforma un portfolio di clienti in un mese di post.',
      'Plánovač sociálních sítí, který z portfolia klientů udělá měsíc příspěvků.',
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
        'Move is the tool I built for the part of the job nobody enjoys: planning a month of social content for a whole roster of clients. Each client keeps a living profile - who they are, how they talk, what they sell, which platforms - and Move turns that into a finished editorial plan in one pass: dates, formats, objectives, captions, visual directions, hashtags and SEO notes, all ready to edit.',
        'Move è lo strumento che ho costruito per la parte del lavoro che non piace a nessuno: pianificare un mese di contenuti social per un intero portfolio di clienti. Ogni cliente ha un profilo vivo - chi è, come parla, cosa vende, su quali piattaforme - e Move lo trasforma in un piano editoriale finito in un colpo solo: date, formati, obiettivi, caption, direzioni visive, hashtag e note SEO, tutto pronto da modificare.',
        'Move je nástroj, který jsem postavil pro tu část práce, co nikoho nebaví: naplánovat měsíc obsahu na sociální sítě pro celé portfolio klientů. Každý klient má živý profil - kdo je, jak mluví, co prodává, na jakých platformách - a Move z toho na jeden zátah udělá hotový redakční plán: termíny, formáty, cíle, popisky, vizuální směr, hashtagy a SEO poznámky, všechno připravené k úpravě.',
      ),
      L(
        'It is built to actually run an agency week. A dashboard flags which clients are overdue and draws an activity sparkline for each one; the generator drafts a whole month at a time; and everything syncs to the cloud so it follows you between devices, with an offline-first fallback when the signal drops. Less staring at an empty calendar, more shipping.',
        'È fatto per far girare davvero la settimana di un’agenzia. Una dashboard segnala quali clienti sono in ritardo e disegna una sparkline di attività per ognuno; il generatore prepara un mese intero alla volta; e tutto si sincronizza nel cloud, così ti segue tra i dispositivi, con un fallback offline-first quando manca il segnale. Meno tempo a fissare un calendario vuoto, più cose spedite.',
        'Je postavený tak, aby opravdu utáhl agenturní týden. Nástěnka označí, kteří klienti mají zpoždění, a pro každého vykreslí sparkline aktivity; generátor připraví rovnou celý měsíc; a všechno se synchronizuje do cloudu, takže tě to sleduje mezi zařízeními, s offline-first zálohou, když vypadne signál. Míň zírání do prázdného kalendáře, víc hotového.',
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
    ],
    links: [
      { label: L('Live tool', 'Strumento live', 'Živý nástroj'), cta: L('Open Move', 'Apri Move', 'Otevřít Move'), href: 'https://move-editorial-planner.netlify.app' },
    ],
  },
  {
    id: 'berkana',
    index: '04',
    group: 'identity',
    category: L('Brand identity', 'Brand identity', 'Vizuální identita'),
    title: 'studio Berkana',
    blurb: L(
      'Identity and communication for a high-end architecture studio.',
      'Identità e comunicazione per uno studio di architettura di alto livello.',
      'Identita a komunikace pro špičkové architektonické studio.',
    ),
    role: L('Brand identity · Art direction · Print', 'Brand identity · Art direction · Stampa', 'Vizuální identita · Art direction · Tisk'),
    cover: '/work/berkana-stationery-thumb.jpg',
    coverAlt: L(
      'studio Berkana stationery: navy and cream letterhead and cards',
      'Cancelleria studio Berkana: carta intestata e biglietti blu notte e crema',
      'Papírnictví studia Berkana: hlavičkový papír a vizitky v tmavě modré a krémové',
    ),
    description: [
      L(
        "Studio Berkana is a high-end architecture and engineering practice in L'Aquila. They do precise, considered work, and their communication needed to match. I gave them an identity that says it plainly - a geometric mark, a deep navy, a lot of quiet space - and carried it across everything the studio hands a client.",
        "Studio Berkana è uno studio di architettura e ingegneria di alto livello a L'Aquila. Fanno un lavoro preciso e ragionato, e la loro comunicazione doveva essere all’altezza. Ho dato loro un’identità che lo dice con chiarezza - un marchio geometrico, un blu notte profondo, tanto spazio silenzioso - e l’ho portata su tutto ciò che lo studio consegna a un cliente.",
        "Studio Berkana je špičkové architektonické a inženýrské studio v L'Aquile. Dělají přesnou, promyšlenou práci a jejich komunikace jí měla odpovídat. Dal jsem jim identitu, která to říká jasně - geometrická značka, hluboká tmavě modrá, spousta tichého prostoru - a přenesl ji na všechno, co studio předává klientovi.",
      ),
      L(
        'Business cards, letterhead, a folded invitation for the new-office opening, plus the project and social visuals: one clear system, so every piece looks like it came from the same careful hand.',
        'Biglietti da visita, carta intestata, un invito pieghevole per l’inaugurazione della nuova sede, più i visual per i progetti e i social: un unico sistema chiaro, così ogni pezzo sembra uscito dalla stessa mano attenta.',
        'Vizitky, hlavičkový papír, skládané pozvání na otevření nové kanceláře a k tomu vizuály pro projekty i sociální sítě: jeden jasný systém, aby každý kus vypadal, že vyšel ze stejné pečlivé ruky.',
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
        'Biglietti da visita Berkana, blu notte e crema, tenuti su uno sfondo verde acqua',
        'Vizitky Berkana, tmavě modrá a krémová, držené na petrolejovém pozadí',
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
    index: '05',
    group: 'identity',
    category: L('Rebrand', 'Rebrand', 'Rebrand'),
    title: 'Corti Edil-Fer',
    blurb: L(
      'A full rebrand for a construction firm - snail and all.',
      'Un rebrand completo per un’impresa edile - lumaca compresa.',
      'Kompletní rebrand pro stavební firmu - i se šnekem.',
    ),
    role: L('Brand identity · Mascot · Web design · Build', 'Brand identity · Mascotte · Web design · Sviluppo', 'Vizuální identita · Maskot · Webdesign · Vývoj'),
    cover: '/work/edilfer-cards.jpg',
    coverAlt: L(
      'Corti Edil-Fer business cards, green and white with the snail mark',
      'Biglietti da visita Corti Edil-Fer, verde e bianco con il marchio a lumaca',
      'Vizitky Corti Edil-Fer, zelenobílé se značkou šneka',
    ),
    description: [
      L(
        'Corti Edil-Fer is a building firm, and building is the one job where rushing shows. So the rebrand leans into it: a snail as the mascot, unhurried and exact, curled into a mark that doubles as the C of Corti and the e of Edil-Fer.',
        'Corti Edil-Fer è un’impresa edile, e l’edilizia è uno di quei lavori in cui la fretta si vede. Così il rebrand ci gioca sopra: una lumaca come mascotte, lenta e precisa, arrotolata in un marchio che è insieme la C di Corti e la e di Edil-Fer.',
        'Corti Edil-Fer je stavební firma a stavařina je jedna z těch prací, kde je spěch vidět. Rebrand na tom staví: šnek jako maskot, beze spěchu a přesný, stočený do značky, která je zároveň C od Corti i e od Edil-Fer.',
      ),
      L(
        'A green-and-navy system built to survive a construction site: one bold emblem for stamps and signage, the full Corti Edil-Fer lockup for paperwork, the parent Edil-Fer cut, and the snail on its own for everything small. Loud where it needs to be, legible everywhere.',
        'Un sistema verde e blu notte fatto per sopravvivere a un cantiere: un emblema deciso per timbri e insegne, il logo completo Corti Edil-Fer per i documenti, la versione della casa madre Edil-Fer e la lumaca da sola per tutto ciò che è piccolo. Forte dove serve, leggibile ovunque.',
        'Zeleno-modrý systém udělaný tak, aby přežil stavbu: jeden výrazný emblém na razítka a cedule, celé logo Corti Edil-Fer na dokumenty, verze mateřské značky Edil-Fer a samotný šnek na všechno malé. Hlasitý, kde je potřeba, čitelný všude.',
      ),
      L(
        'The same system runs the website, cortiedilfer.it - designed and built end to end, so the brand you meet on a business card is the brand you meet online.',
        'Lo stesso sistema regge il sito, cortiedilfer.it - progettato e sviluppato dall’inizio alla fine, così il brand che incontri su un biglietto da visita è lo stesso che incontri online.',
        'Stejný systém pohání i web, cortiedilfer.it - navržený a postavený od začátku do konce, takže značka, kterou potkáš na vizitce, je ta samá, kterou potkáš online.',
      ),
    ],
    gallery: [
      { src: '/work/edilfer-logo.jpg', alt: L(
        'The Corti Edil-Fer primary lockup: blue Corti, green Edil-Fer and the snail mark',
        'Il logo principale Corti Edil-Fer: Corti blu, Edil-Fer verde e il marchio a lumaca',
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
        'La suite del logo: logo completo, emblema, wordmark Edil-Fer e la mascotte lumaca',
        'Sada loga: kompletní logo, emblém, wordmark Edil-Fer a maskot šneka',
      ) },
    ],
    links: [
      { label: L('Live site', 'Sito live', 'Živý web'), cta: 'cortiedilfer.it', href: 'https://www.cortiedilfer.it' },
    ],
  },
  {
    id: 'fregno',
    index: '06',
    group: 'identity',
    category: L('Identity', 'Identità', 'Identita'),
    title: 'Fregno',
    blurb: L(
      'A teaser identity for a music venue that is not open yet.',
      'Un’identità teaser per un locale musicale non ancora aperto.',
      'Teaser identita pro hudební klub, který ještě neotevřel.',
    ),
    role: L('Identity · Poster system · Type', 'Identità · Sistema di poster · Type', 'Identita · Plakátový systém · Písmo'),
    cover: '/work/fregno-wall.jpg',
    coverAlt: L(
      'Three Fregno posters wheatpasted on a concrete wall',
      'Tre manifesti Fregno affissi su un muro di cemento',
      'Tři plakáty Fregno vylepené na betonové zdi',
    ),
    description: [
      L(
        'Fregno is a music venue in the making. Before the doors open, the job was to build curiosity - so the identity arrived as a run of posters that say a lot with almost nothing: a night, a place, a wall of loud type in colours that keep changing.',
        'Fregno è un locale musicale in divenire. Prima dell’apertura, il compito era creare curiosità - così l’identità è arrivata come una serie di manifesti che dicono molto con quasi niente: una serata, un luogo, un muro di caratteri gridati in colori che cambiano di continuo.',
        'Fregno je hudební klub, který teprve vzniká. Než se otevřou dveře, úkolem bylo vzbudit zvědavost - identita proto přišla jako série plakátů, které řeknou hodně skoro ničím: jedna noc, jedno místo, zeď hlasitého písma v barvách, které se pořád mění.',
      ),
      L(
        'One elastic system, many faces - acid green on teal, on cobalt, on black - made to spread across walls and feeds and leave you asking what it is.',
        'Un sistema elastico, tante facce - verde acido su verde acqua, su cobalto, su nero - fatto per diffondersi su muri e feed e lasciarti a chiederti cosa sia.',
        'Jeden pružný systém, spousta tváří - kyselá zelená na petrolejové, na kobaltové, na černé - udělaný tak, aby se šířil po zdech i ve feedech a nechal tě ptát se, co to je.',
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
    index: '07',
    group: 'editorial',
    category: L('Editorial', 'Editoria', 'Editorial'),
    title: 'Il manuale maniacale',
    blurb: L(
      'The cover for a diary I made to help people quit biting their nails.',
      'La copertina di un diario che ho creato per aiutare a smettere di mangiarsi le unghie.',
      'Obálka deníku, který jsem vytvořil, aby lidem pomohl přestat si okusovat nehty.',
    ),
    role: L('Concept · Illustration · Type', 'Concept · Illustrazione · Type', 'Koncept · Ilustrace · Písmo'),
    cover: '/work/manuale-detail.jpg',
    coverAlt: L(
      'Detail of Il manuale maniacale: the m drawn as two bitten fingernails',
      'Dettaglio di Il manuale maniacale: la m disegnata come due unghie mangiate',
      'Detail Il manuale maniacale: písmeno m nakreslené jako dva okousané nehty',
    ),
    description: [
      L(
        'The cover for "Il manuale maniacale", a diary I made to help people stop biting their nails - a small daily companion for a habit that is hard to break. The idea had to carry the whole page, so the title letter does the work: the m is a pair of fingers, nails bitten to the quick. You get the joke, and the point, before you read a word.',
        'La copertina di "Il manuale maniacale", un diario che ho creato per aiutare a smettere di mangiarsi le unghie - un piccolo compagno quotidiano per un’abitudine difficile da rompere. L’idea doveva reggere l’intera pagina, così è la lettera del titolo a fare il lavoro: la m è una coppia di dita, con le unghie mangiate fino alla carne. Capisci la battuta, e il punto, prima di leggere una parola.',
        'Obálka knihy "Il manuale maniacale", deníku, který jsem udělal, aby lidem pomohl přestat si okusovat nehty - malý každodenní společník pro zlozvyk, který se těžko láme. Nápad musel unést celou stránku, takže práci odvede písmeno z názvu: m jsou dva prsty s nehty okousanými až do masa. Vtip i pointu pochopíš dřív, než přečteš jediné slovo.',
      ),
      L(
        'Flat colour, one clean display face, a single visual pun - the kind of cover that makes you pick the thing up, and maybe put your fingers down.',
        'Colore piatto, un solo carattere display pulito, un unico gioco visivo - il tipo di copertina che ti fa prendere in mano il libro, e magari mettere giù le dita.',
        'Plochá barva, jeden čistý display font, jediná vizuální slovní hříčka - přesně ta obálka, po které knihu vezmeš do ruky a možná dáš prsty pryč od pusy.',
      ),
    ],
    gallery: [
      { src: '/work/manuale.jpg', alt: L(
        'Il manuale maniacale, the cover as a printed booklet',
        'Il manuale maniacale, la copertina come libretto stampato',
        'Il manuale maniacale, obálka jako vytištěná brožura',
      ) },
      { src: '/work/manuale-detail.jpg', alt: L(
        'Detail: the m drawn as two fingers with bitten nails',
        'Dettaglio: la m disegnata come due dita con le unghie mangiate',
        'Detail: m nakreslené jako dva prsty s okousanými nehty',
      ) },
    ],
  },
  {
    id: 'covers',
    index: '08',
    group: 'editorial',
    category: L('Cover art', 'Cover', 'Obaly'),
    title: L('Album covers', 'Copertine', 'Obaly alb'),
    blurb: L(
      'Sleeves that sound like the record before you press play.',
      'Copertine che suonano come il disco prima ancora di premere play.',
      'Obaly, které znějí jako deska ještě předtím, než pustíš play.',
    ),
    role: L('Art direction · Artwork · Type', 'Art direction · Artwork · Type', 'Art direction · Artwork · Písmo'),
    cover: '/work/album-vinyl-chiedi.jpg',
    coverAlt: L(
      'Chiedi Di Me sleeve with the record pulled out, the cover art on the label',
      'Copertina di Chiedi Di Me con il disco estratto, l’artwork sull’etichetta',
      'Obal Chiedi Di Me s vytaženou deskou, cover art na labelu',
    ),
    description: [
      L(
        'Covers for Zero75, Donci Kong and Kid Kontrasto. Every record gets its own room: the unresolved charcoal face of "William Blake", the teal duotone of "Chiedi Di Me", the lantern against the dark in "Luce", the gold blackletter of "Non e Musica Soltanto".',
        'Copertine per Zero75, Donci Kong e Kid Kontrasto. Ogni disco ha la sua stanza: il volto carbone e irrisolto di "William Blake", il duotone verde acqua di "Chiedi Di Me", la lanterna contro il buio di "Luce", il blackletter dorato di "Non è Musica Soltanto".',
        'Obaly pro Zero75, Donci Kong a Kid Kontrasto. Každá deska má svůj vlastní prostor: nedořešená uhlová tvář "William Blake", tyrkysový duoton "Chiedi Di Me", lucerna proti tmě v "Luce", zlatý blackletter "Non è Musica Soltanto".',
      ),
      L(
        'Different artists, different moods - the same job: make the sleeve sound like the music before you press play.',
        'Artisti diversi, atmosfere diverse - lo stesso compito: far suonare la copertina come la musica prima di premere play.',
        'Různí umělci, různé nálady - stejný úkol: rozeznít obal jako hudbu ještě předtím, než pustíš play.',
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
