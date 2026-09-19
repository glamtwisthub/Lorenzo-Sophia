# Lorenzo & Sophia

A lightweight wedding website for Lorenzo and Sophia: invitation, story, schedule and venue, gallery, and a client-side RSVP.

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
- `Wedding App v3.dc.html` — Italian Lorenzo & Sophia editorial layout (Bodoni Moda + Jost, black rules, magazine masthead)
- placeholder `image-slot.js` / `support.js` runtime files
- cropped UI screenshots of story and gallery frames

This site follows **v3**: Italian copy, L&S masthead, Song of Songs 6:3, Villa Il Garofalo in Fiesole, two-step RSVP.

## Dates

The prototype said Saturday 7 June **2025**. This site uses **Saturday 23 May 2026** (`sabato 23 maggio 2026`) and an RSVP deadline of **25 January 2026** (`25 gennaio 2026`).

## Photos

The couple’s photographs are in `img/`, resized (longest side at most 1800px) and re-encoded as stripped JPEGs. Cover, story, venue frames, and a fourteen-image gallery use all eighteen pictures.

Contact for the couple is `lozenzo.C96@gmail.com`. `Via del Garofalo 12` is still a prototype venue address unless they confirm otherwise.
