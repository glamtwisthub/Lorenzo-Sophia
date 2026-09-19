# Lorenzo & Giulia

A lightweight wedding website for Lorenzo and Giulia: invitation, story, schedule and venue, gallery, and a client-side RSVP.

The site is static HTML, CSS, and a small amount of vanilla JavaScript. There is no build step, no npm app, no database, and no accounts. RSVP replies stay in the browser (`localStorage`).

## Preview locally

From this folder:

```bash
python3 -m http.server 8742 --bind 127.0.0.1
```

Then open http://127.0.0.1:8742/

Any other uncommon port is fine. Do not use 3000, 5173, or 8080 if you can avoid them.

## Pages

| File | Page |
|------|------|
| `index.html` | Invito (home) |
| `storia.html` | Our story |
| `programma.html` | Schedule and venue |
| `galleria.html` | Gallery |
| `conferma.html` | RSVP |

## Design source

The repo was adapted from a Designer’s Canvas export named like `Derrick Hannah wedding app.zip`. That zip is **not** a finished website. It contained:

- `Wedding App.dc.html` and `Wedding App v2.dc.html` — English Derrick & Hannah prototypes (cream/olive, Cormorant Garamond)
- `Wedding App v3.dc.html` — Italian Lorenzo & Giulia editorial layout (Bodoni Moda + Jost, black rules, magazine masthead)
- placeholder `image-slot.js` / `support.js` runtime files
- cropped UI screenshots of story and gallery frames

This site follows **v3**: Italian copy, L&G masthead, Song of Songs 6:3, Villa Il Garofalo in Fiesole, two-step RSVP.

## Dates

The prototype said Saturday 7 June **2025** (already past). This site uses **Saturday 5 June 2027** (the nearest Saturday to 7 June in 2027) and an RSVP deadline of **30 April 2027**.

## Photos

The couple’s photographs are in `img/`, resized (longest side at most 1800px) and re-encoded as stripped JPEGs. Cover, story, venue frames, and a fourteen-image gallery use all eighteen pictures.

`Via del Garofalo 12` and `lorenzo.giulia@esempio.it` come from the prototype. Treat them as placeholders until the couple confirms a real address and inbox.
