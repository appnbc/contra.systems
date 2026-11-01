// =====================================================================
// Builds every HTML page of contra.systems from build/content.mjs.
// Usage:  node build/build.mjs
//
// Each page is written once per language, fully translated:
//   English  /index.html        /kynd/index.html  ...
//   Spanish  /es/index.html     /es/kynd/index.html ...
//   Italian  /it/index.html     /it/kynd/index.html ...
// Every page also carries the other languages as a small JSON dictionary,
// so assets/site.js can switch language instantly without a reload.
// =====================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ui, specLabels, home, projects, EMAIL, SITE_URL } from './content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MEDIA = path.join(ROOT, 'media');
const LANGS = ['en', 'es', 'it'];
const LOCALE = { en: 'en_US', es: 'es_ES', it: 'it_IT' };

// ---------- guard: no ampersands in any visible copy ----------
(function checkAmpersands(node, trail) {
  if (typeof node === 'string') {
    if (node.includes('&') && !/^(mailto:|https?:)/.test(node)) throw new Error(`Ampersand found in copy at ${trail}: ${node.slice(0, 80)}`);
    return;
  }
  if (node && typeof node === 'object') for (const k of Object.keys(node)) checkAmpersands(node[k], `${trail}.${k}`);
})({ ui, specLabels, home, projects }, 'content');

// ---------- image / video dimensions ----------
const VIDEO = {
  'otg-spot-walkthrough.mp4': [320, 136],
  'otg-spot-vision.mp4': [320, 180],
  'otg-spot-code.mp4': [320, 208],
  'agent-rehearsal.mp4': [320, 180],
};
function dims(file) {
  if (VIDEO[file]) return VIDEO[file];
  const b = fs.readFileSync(path.join(MEDIA, file));
  if (b[0] === 0x89 && b[1] === 0x50) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1], len = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  throw new Error(`Cannot read dimensions of ${file}`);
}
const isVideo = (f) => f.endsWith('.mp4');

// ---------- helpers ----------
const escAttr = (s) => String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const langDir = (l) => (l === 'en' ? '' : `${l}/`);
const pagePath = (l, slug) => `${langDir(l)}${slug ? `${slug}/` : ''}index.html`;   // relative to site root

class Page {
  constructor(lang, slug) {
    this.lang = lang;
    this.slug = slug;                                        // '' for home
    const depth = (lang === 'en' ? 0 : 1) + (slug ? 1 : 0);
    this.root = '../'.repeat(depth);                          // back to the site root
    this.dict = { en: {}, es: {}, it: {} };
    this.keys = new Map();
    this.n = 0;
  }
  key(t) {
    const sig = JSON.stringify([t.en, t.es, t.it]);
    if (this.keys.has(sig)) return this.keys.get(sig);
    const k = 't' + (++this.n).toString(36);
    this.keys.set(sig, k);
    for (const l of LANGS) this.dict[l][k] = t[l];
    return k;
  }
  s(t) { return t[this.lang]; }                               // text in this page's language
  // translatable element contents
  t(t) { return `data-i18n="${this.key(t)}"`; }
  // translatable attributes: [['alt', triple], ...]
  a(pairs) {
    const map = pairs.map(([name, t]) => `${name}:${this.key({ en: strip(t.en), es: strip(t.es), it: strip(t.it) })}`).join(';');
    const plain = pairs.map(([name, t]) => `${name}="${escAttr(strip(t[this.lang]))}"`).join(' ');
    return `data-i18n-attr="${map}" ${plain}`;
  }
  m(file) { return `${this.root}media/${file}`; }
  // link to this same page in another language
  alt(l) { return `${this.root}${pagePath(l, this.slug)}`; }
}

const withNum = (t, n) => ({ en: `${t.en} ${n}`, es: `${t.es} ${n}`, it: `${t.it} ${n}` });

function figure(pg, fig, n, kind) {
  const [w, h] = dims(fig.src);
  const src = pg.m(fig.src);
  const media = isVideo(fig.src)
    ? `<video src="${src}" poster="${pg.m(fig.src.replace('.mp4', '.jpg'))}" width="${w}" height="${h}" muted loop playsinline autoplay preload="metadata" ${pg.a([['aria-label', fig.cap]])}></video>`
    : `<img src="${src}" width="${w}" height="${h}" ${kind === 'hero' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${pg.a([['alt', fig.cap]])}>`;
  return `
      <figure class="fig fig--${kind}" data-fig="${n}">
        <button type="button" class="fig-open" data-full="${src}" ${pg.a([['aria-label', withNum(ui.openFig, n)]])}>
          <span class="mat">${media}</span>
        </button>
        <figcaption class="caption"><span class="fig-no">Fig ${n}.</span> <span ${pg.t(fig.cap)}>${pg.s(fig.cap)}</span></figcaption>
      </figure>`;
}

function specTable(pg, specs) {
  if (!specs || !specs.length) return '';
  const rows = specs.map(([label, value]) => `
          <div class="spec-row"><dt ${pg.t(specLabels[label])}>${pg.s(specLabels[label])}</dt><dd ${pg.t(value)}>${pg.s(value)}</dd></div>`).join('');
  return `
        <dl class="spec">${rows}
        </dl>`;
}

function head(pg, { title, description }) {
  const alternates = LANGS.map((l) => `  <link rel="alternate" hreflang="${l}" href="${SITE_URL}${pagePath(l, pg.slug)}">`).join('\n');
  const altData = LANGS.map((l) => `data-alt-${l}="${pg.alt(l)}"`).join(' ');
  return `<!doctype html>
<html lang="${pg.lang}" data-theme="day" ${altData}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title ${pg.t(title)}>${strip(pg.s(title))}</title>
  <meta name="description" ${pg.a([['content', description]])}>
  <link rel="canonical" href="${SITE_URL}${pagePath(pg.lang, pg.slug)}">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${pagePath('en', pg.slug)}">
  <meta property="og:title" content="${escAttr(strip(pg.s(title)))}">
  <meta property="og:description" content="${escAttr(strip(pg.s(description)))}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}${pagePath(pg.lang, pg.slug)}">
  <meta property="og:locale" content="${LOCALE[pg.lang]}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#F7F6F2">
  <link rel="icon" href="${pg.m('quetzal.png')}">
  <script>
    /* before first paint: apply the saved theme. On arrival from another site
       at an English (default) address, open the visitor's saved language;
       an explicit /es/ or /it/ address is always respected. */
    (function () {
      var d = document.documentElement, t, l;
      try { t = localStorage.getItem('tc-theme'); l = localStorage.getItem('tc-lang'); } catch (e) {}
      if (t !== 'day' && t !== 'night') t = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
      d.setAttribute('data-theme', t);
      var internal = false;
      try { internal = !!document.referrer && new URL(document.referrer).origin === location.origin && location.protocol !== 'file:'; } catch (e) {}
      var target = l && l !== d.lang && d.getAttribute('data-alt-' + l);
      if (target && !internal && d.lang === 'en') location.replace(target + location.hash);
    })();
  </script>
  <link rel="stylesheet" href="${pg.root}assets/style.css">
</head>
<body class="${pg.slug ? 'is-project' : 'is-home'}">
<a class="skip-link" href="#main" ${pg.t(ui.skip)}>${pg.s(ui.skip)}</a>
`;
}

function topbar(pg) {
  const homeHref = pg.slug ? '../index.html' : '#main';
  const brand = `<a class="brand" href="${homeHref}"><img class="mark" src="${pg.m('quetzal.png')}" width="158" height="244" alt=""><span>Brian Contreras</span></a>`;
  const langs = LANGS.map((l) => `<a href="${pg.alt(l)}" data-set-lang="${l}" hreflang="${l}" lang="${l}"${l === pg.lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('<span class="sep" aria-hidden="true">/</span>');
  const nav = pg.slug ? '' : `
    <nav class="quick-nav" ${pg.a([['aria-label', ui.sectionsNav]])}>
      ${ui.nav.map((n) => `<a href="${n.href}" ${pg.t(n.label)}>${pg.s(n.label)}</a>`).join('\n      ')}
    </nav>`;
  return `
<header class="topbar">
  <div class="topbar-row">
    ${brand}${nav}
    <div class="utils">
      <div class="seg" role="group" ${pg.a([['aria-label', ui.langGroup]])}>${langs}</div>
      <span class="divider" aria-hidden="true">|</span>
      <div class="seg" role="group" ${pg.a([['aria-label', ui.themeGroup]])}><button type="button" data-set-theme="day" aria-pressed="true" ${pg.t(ui.day)}>${pg.s(ui.day)}</button><span class="sep" aria-hidden="true">/</span><button type="button" data-set-theme="night" aria-pressed="false" ${pg.t(ui.night)}>${pg.s(ui.night)}</button></div>
    </div>
  </div>
</header>
`;
}

function footer(pg) {
  const back = pg.slug ? `
    <a href="../index.html" ${pg.t(ui.backAll)}>${pg.s(ui.backAll)}</a>` : '';
  const legend = pg.slug ? ui.legendProject : ui.legendHome;
  return `
<footer class="site-footer">
  <div class="footer-row">
    <span>Brian Contreras, 2026</span>${back}
    <a href="mailto:${EMAIL}" ${pg.t(ui.touch)}>${pg.s(ui.touch)}</a>
    <span class="copy-wrap">
      <button type="button" class="copy-email" data-email="${EMAIL}"><span ${pg.t(ui.copy)}>${pg.s(ui.copy)}</span></button>
      <span class="copy-badge" role="status" aria-live="polite"></span>
    </span>
  </div>
  <p class="kbd-legend" ${pg.t(legend)}>${pg.s(legend)}</p>
</footer>
`;
}

function tail(pg) {
  const uiStrings = {};
  for (const k of ['copied', 'viewer', 'prev', 'next', 'close']) uiStrings[k] = ui[k];
  const json = JSON.stringify({ en: pg.dict.en, es: pg.dict.es, it: pg.dict.it, ui: uiStrings }).replace(/</g, '\\u003c');
  return `
<script type="application/json" id="i18n">${json}</script>
<script src="${pg.root}assets/site.js" defer></script>
</body>
</html>
`;
}

function write(pg, html) {
  const out = path.join(ROOT, pagePath(pg.lang, pg.slug));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

// ---------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------
function buildHome(lang) {
  const pg = new Page(lang, '');
  const block = (index, id, labelHtml, content, extraMeta = '') => `
  <section class="block"${id ? ` id="${id}"` : ''} data-step>
    <div class="block-meta">
      <span class="index">${index}</span>
      ${labelHtml}${extraMeta}
    </div>
    <div class="block-content">${content}
    </div>
  </section>
`;
  const label = (t) => `<h2 class="label" ${pg.t(t)}>${pg.s(t)}</h2>`;
  const p = (t) => `
      <p ${pg.t(t)}>${pg.s(t)}</p>`;

  let html = head(pg, { title: home.title, description: home.description });
  html += topbar(pg);
  html += `
<main id="main" tabindex="-1">
  <h1 class="headline" ${pg.t(home.headline)}>${pg.s(home.headline)}</h1>
`;
  const st = home.statement;
  html += block('01', 'statement', label(st.label), p(st.body),
    `\n      <img class="headshot" src="${pg.m('headshot.png')}" width="158" height="243" loading="lazy" decoding="async" ${pg.a([['alt', st.headshotAlt]])}>`);

  html += `\n  <div id="works">`;
  for (const w of home.works) {
    const titleLink = `<h2 class="label"><a class="category-link" href="${w.slug}/index.html" data-preview="${pg.m(w.preview)}"><span ${pg.t(w.title)}>${pg.s(w.title)}</span> <span class="arrow" aria-hidden="true">↗</span></a></h2>`;
    html += block(w.index, `work-${w.index}`, titleLink,
      specTable(pg, w.specs) + p(w.body) + `
      <a class="cta" href="${w.slug}/index.html" ${pg.t(w.cta)}>${pg.s(w.cta)}</a>`);
  }
  html += `  </div>\n`;

  const sy = home.systems;
  html += block('08', 'systems', label(sy.label), p(sy.body) + `
      <div class="gallery gallery--inline">${sy.figs.map((f, i) => figure(pg, f, i + 1, 'card')).join('')}
      </div>`);
  html += block('09', 'ludology', label(home.ludology.label), p(home.ludology.body));

  const pub = home.publications;
  const items = pub.items.map((it) => `
        <li>
          <span class="pub-kind" ${pg.t(it.kind)}>${pg.s(it.kind)}</span>
          <span class="pub-text"><span ${pg.t(it.text)}>${pg.s(it.text)}</span>${it.href ? ` <a class="doc-link" href="${it.href}" ${pg.t(it.link)}>${pg.s(it.link)}</a>` : ''}</span>
        </li>`).join('');
  html += block('10', 'publications', label(pub.label), p(pub.intro) + `
      <ol class="pubs">${items}
      </ol>`);
  html += block('11', 'coda', label(home.coda.label), p(home.coda.body));
  html += `</main>\n`;
  html += footer(pg);
  html += tail(pg);
  write(pg, html);
}

// ---------------------------------------------------------------------
// PROJECT PAGES
// ---------------------------------------------------------------------
function buildProject(pr, lang) {
  const pg = new Page(lang, pr.slug);
  const title = { en: `${strip(pr.title.en)} — Brian Contreras`, es: `${strip(pr.title.es)} — Brian Contreras`, it: `${strip(pr.title.it)} — Brian Contreras` };
  let html = head(pg, { title, description: pr.description });
  html += topbar(pg);
  html += `
<main id="main" tabindex="-1">
  <header class="subpage-header" data-step>
    <a href="../index.html#work-${pr.index}" class="back-link" ${pg.t(ui.back)}>${pg.s(ui.back)}</a>
    <p class="subpage-meta"><span ${pg.t(ui.indexWord)}>${pg.s(ui.indexWord)}</span> ${pr.index} // <span ${pg.t(pr.kicker)}>${pg.s(pr.kicker)}</span></p>
    <h1 class="subpage-title" ${pg.t(pr.title)}>${pg.s(pr.title)}</h1>${pr.video ? `
    <a class="watch" href="${pr.video.href}" target="_blank" rel="noopener" ${pg.t(pr.video.label)}>${pg.s(pr.video.label)}</a>` : ''}
  </header>
  <div class="hero" data-step>${figure(pg, pr.hero, 1, 'hero')}
  </div>
`;
  for (const s of pr.sections) {
    html += `
  <section class="block" data-step>
    <div class="block-meta">
      <span class="index">${s.num}</span>
      <h2 class="label" ${pg.t(s.heading)}>${pg.s(s.heading)}</h2>
    </div>
    <div class="block-content">${specTable(pg, s.specs)}${s.body ? `
      <p ${pg.t(s.body)}>${pg.s(s.body)}</p>` : ''}
    </div>
  </section>
`;
  }
  html += `
  <section class="gallery-block" data-step aria-labelledby="gallery-heading">
    <h2 class="gallery-heading" id="gallery-heading" ${pg.t(ui.gallery)}>${pg.s(ui.gallery)}</h2>
    <div class="gallery">${pr.gallery.map((f, i) => figure(pg, f, i + 2, 'card')).join('')}
    </div>
  </section>
</main>
`;
  html += footer(pg);
  html += tail(pg);
  write(pg, html);
}

for (const lang of LANGS) {
  buildHome(lang);
  projects.forEach((pr) => buildProject(pr, lang));
}

// ---------- sitemap with language alternates ----------
const urls = ['', ...projects.map((p) => p.slug)].flatMap((slug) => LANGS.map((l) => {
  const links = LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${SITE_URL}${pagePath(x, slug)}"/>`).join('\n');
  return `  <url>\n    <loc>${SITE_URL}${pagePath(l, slug)}</loc>\n${links}\n  </url>`;
}));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);

// ---------- verify every referenced media file exists ----------
const used = new Set(['quetzal.png', 'headshot.png']);
home.works.forEach((w) => used.add(w.preview));
home.systems.figs.forEach((f) => used.add(f.src));
projects.forEach((p) => [p.hero, ...p.gallery].forEach((f) => { used.add(f.src); if (isVideo(f.src)) used.add(f.src.replace('.mp4', '.jpg')); }));
const missing = [...used].filter((f) => !fs.existsSync(path.join(MEDIA, f)));
const unused = fs.readdirSync(MEDIA).filter((f) => !used.has(f));
if (missing.length) { console.error('Missing media:', missing); process.exitCode = 1; }
if (unused.length) console.warn('Unused media files:', unused);
console.log(`Built ${LANGS.length * (projects.length + 1)} pages (${LANGS.join(', ')}) and sitemap.xml.`);
