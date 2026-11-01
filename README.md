# contra.systems

Portfolio of Brian Contreras. A static site with no dependencies.

## Editing

All copy (English, Spanish, Italian), captions and image choices live in
`build/content.mjs`. After editing it, regenerate the pages:

```
node build/build.mjs
```

This writes every page in three languages, plus `sitemap.xml`:

| | English | Spanish | Italian |
|---|---|---|---|
| Home | `/` | `/es/` | `/it/` |
| Project | `/kynd/` | `/es/kynd/` | `/it/kynd/` |

Don't edit the generated HTML by hand, because the next build overwrites it.
The EN/ES/IT switch swaps the text in place and moves the address bar to the
matching page. Visitors who arrive at an English address with a saved
Spanish or Italian preference are sent to that version, but `/es/` and
`/it/` addresses always open as linked. If the site moves to a custom
domain, update `SITE_URL` in `build/content.mjs` and rebuild. The build stops if any
copy contains an ampersand, and it warns about missing or unused files in
`media/`.

- `assets/style.css`: Day/Night themes and the prism colour system (CSS custom
  properties), layout, figures. Each section's colour is set once, in the
  `[data-section]` / `[data-active]` rules near the top; the home page blocks and
  the project pages carry the matching `data-section` number.
- `assets/site.js`: theme and language switching, keyboard navigation,
  lightbox, Copy Email, hover previews
- `media/`: images; looping clips are `.mp4` with a matching `.jpg` poster

## Keyboard

`J`/`K` or `↑`/`↓` step through sections · `←`/`→` move between figures ·
`Enter`/`Space` open a figure (or, on the hero, release the greeting) ·
`1` Day/Night · `2` EN → ES → IT (number row or keypad; shown as small keycaps
beside the controls on keyboard devices) ·
`Esc` closes the viewer, or (like `Backspace`) returns to the index from a
project page.
