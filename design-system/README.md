# Design System — Tomáš Matějček

Tutto il materiale grafico del sito in un unico posto: personaggi doodle,
colori, elementi grafici, font e linguaggio del movimento. Pronto da aprire,
stampare, portare in Illustrator o scaricare come GIF/video.

> **I translate ideas into things.**

## Cosa c'è dentro

| File | Cos'è | Come si usa |
|---|---|---|
| **`tomas-design-system.pdf`** | Il design system completo su 8 pagine A4: copertina, marchio, colore, tipografia, doodle, movimento, principi. | Aprilo, stampalo, condividilo. Pronto da consultare. |
| **`design-system.html`** | La stessa cosa in HTML (è la sorgente del PDF). | Aprilo nel browser. Per rigenerare il PDF vedi sotto. |
| **`tomas-design-system.svg`** | **Tavola vettoriale pronta per Illustrator.** Tutti i doodle, i colori (campioni), l'asterisco, il logotipo e i saggi tipografici come **vettori e testo modificabili**. | Apri in Illustrator / Affinity / Inkscape: `File → Apri`. Ogni elemento è selezionabile e scalabile senza perdita. |
| **`doodles-playground.html`** | **Playground animato.** Ogni doodle e personaggio si muove dal vivo; li scarichi in **SVG animato, GIF, WebM, PNG o SVG statico**. | Aprilo nel browser (doppio clic). Scegli sfondo e dimensione, poi clicca sul formato che vuoi. Funziona **offline**, tutto nel browser. |
| **`fonts/`** | I quattro pesi **Pepi** (.otf): Light, Light Italic, Medium, Black. | Installali nel sistema per usarli in Illustrator e per far apparire il font corretto in PDF/HTML. |

## Il design system in breve

### Colore *(valori esatti dai file EPS del brand)*
| Ruolo | Nome | Hex |
|---|---|---|
| Sfondo | Crema | `#F9F2E8` |
| Superfici | Surface | `#FFFCF5` |
| Testo / occhi | Ink | `#181616` |
| Marchio · "le cose" | Pink | `#DB4082` |
| Testo piccolo pink (AA) | Pink deep | `#B13366` |
| "Tradurre" · grafica | Azure | `#0F96D9` |
| Interazione (AA) | Azure deep | `#0A6DA3` |

Due colori vivi con lo stesso ruolo grammaticale: **il pink marca le cose,
l'azure marca l'atto di tradurle.**

### Tipografia
- **Pepi** — display, in quattro pesi (Light / Light Italic / Medium / Black).
- **Inter** — corpo del testo e micro-etichette.
- Regola: la parola-contrasto ("*ideas*") si distingue per **inclinazione e
  colore, mai per peso**.

### Doodle & personaggi
Un solo tratto disegnato a mano (pink, `stroke-width 7`, cap/join round) che fa
tanti mestieri — e con due occhi ink diventa una famiglia:

- **Asterisco** — il marchio (dal vettore EPS esatto).
- **Sottolineatura** — sotto "ideas".
- **Freccia idea→cosa** — il gesto del tradurre.
- **Viky** *(ahoj!)* — l'onda del footer.
- **Elvis** *(hi!)* — la squiggle che saluta accanto all'About.
- **Ringo** *(ciao!)* — la spirale sopra "Selected work".

### Movimento
- Respiro condiviso dei doodle: `1.5 s · sine.inOut · yoyo`.
- Reveal mascherati: `translateY 110% → 0`, ease `cubic-bezier(.16,1,.3,1)`, stagger ~120 ms.
- Rispetto totale di `prefers-reduced-motion`.

## Formati scaricabili dal playground
- **SVG animato** — vettoriale, leggerissimo, si muove ovunque (loop infinito).
- **GIF** — animazione classica, sullo sfondo scelto (crema / ink).
- **WebM** — video in movimento (qualità alta, sfondo pieno).
- **PNG** — fermo, **trasparente**.
- **SVG statico** — fermo, vettoriale, trasparente.

## Rigenerare il PDF (opzionale)
Il PDF è già incluso. Per ricrearlo dall'HTML con Chrome/Chromium:

```sh
chrome --headless --print-to-pdf=tomas-design-system.pdf \
       --no-pdf-header-footer design-system.html
```

---
*Le pose e i tempi dei doodle sono presi 1:1 dal codice del sito
(`src/components/Doodles.jsx`); i colori dai token in `src/index.css`.*
