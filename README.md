# Silent Resonance — Movie Promo Site

A single-page promotional site for *Silent Resonance*, a film by Cesar Cage,
with an embedded Eventbrite reservation widget. Plain HTML/CSS/JS — deployable
to Vercel as a static site.

## Files

- `index.html` — page structure (hero, story, trailer, stills, reserve)
- `styles.css` — dark cinematic styling matching the poster palette
- `script.js` — footer year + Eventbrite widget loader
- `poster-1.png` — one-sheet poster
- `poster-2.png` — teaser poster (used in hero)
- `bts-1.png` — behind-the-scenes still
- `vercel.json` — static site config

## Before deploying

1. **Eventbrite** — open `script.js` and set `EVENTBRITE_URL` to your public
   Eventbrite event URL (e.g. `"https://www.eventbrite.com/e/123456789012"`).
   The widget will render in the "Reserve Your Seat" section.
2. **Trailer** — replace the trailer placeholder in `index.html` with your
   YouTube/Vimeo embed when available.
3. **Runtime/rating** — update the TBA facts in the Story section.

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the folder via the Vercel dashboard (Framework Preset: **Other**).