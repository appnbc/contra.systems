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

// wrap direction arrows so they can move on hover; drop the ▶ glyph (an icon replaces it)
const ARROWS = [[/ →$/, ' <span class="arrow-r" aria-hidden="true">→</span>'], [/^← /, '<span class="arrow-l" aria-hidden="true">←</span> '], [/ ↗$/, ' <span class="arrow-ne" aria-hidden="true">↗</span>'], [/^▶ /, '']];
const arrowize = (t) => {
  const out = {};
  for (const l of LANGS) out[l] = ARROWS.reduce((s, [re, r]) => s.replace(re, r), t[l]);
  return out;
};
// Prismatic theme icons: simple geometry and SVG gradients whose stops take
// the prism colours from CSS (muted by Day, more luminous by Night).
const SUN = `<svg class="ico ico-sun" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><defs>`
  + `<radialGradient id="ico-sun-core" cx="38%" cy="36%" r="72%"><stop offset="0" class="st-yellow"/><stop offset=".55" class="st-amber"/><stop offset="1" class="st-coral"/></radialGradient>`
  + `<linearGradient id="ico-sun-rays" x1="1" y1="1" x2="15" y2="15" gradientUnits="userSpaceOnUse"><stop offset="0" class="st-amber"/><stop offset=".5" class="st-coral"/><stop offset="1" class="st-violet"/></linearGradient>`
  + `</defs><circle cx="8" cy="8" r="3.2" fill="url(#ico-sun-core)"/><path class="glass" d="M6.2 7.3 8 6.1l1.8 1.2"/>`
  + `<circle class="rim" cx="8" cy="8" r="4.4" stroke="url(#ico-sun-rays)" opacity=".4"/>`
  + `<path class="rays" stroke="url(#ico-sun-rays)" d="M8 .7v1.9M8 13.4v1.9M.7 8h1.9M13.4 8h1.9M3.1 3.1l.95.95M11.95 11.95l.95.95M3.1 12.9l.95-.95M11.95 4.05l.95-.95"/></svg>`;
const MOON = `<svg class="ico ico-moon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><defs>`
  + `<linearGradient id="ico-moon-g" x1="2.5" y1="3" x2="11" y2="15" gradientUnits="userSpaceOnUse"><stop offset="0" class="st-cyan"/><stop offset=".3" class="st-blue"/><stop offset=".55" class="st-violet"/><stop offset=".8" class="st-rose"/><stop offset="1" class="st-amber"/></linearGradient>`
  + `<mask id="ico-moon-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16"><rect width="16" height="16" fill="#fff"/><circle cx="10.9" cy="5.6" r="4.9" fill="#000"/></mask>`
  + `</defs><g mask="url(#ico-moon-cut)"><circle cx="7.4" cy="8.6" r="6" fill="url(#ico-moon-g)"/><circle class="glass" cx="7.4" cy="8.6" r="4.5"/></g>`
  + `<path class="glint" d="M13.3 1.5l.42 1.08 1.08.42-1.08.42-.42 1.08-.42-1.08-1.08-.42 1.08-.42z"/></svg>`;
const PLAY = '<span class="watch-icon" aria-hidden="true"><svg viewBox="0 0 9 10"><path d="M0 0l9 5-9 5z"/></svg></span>';
const kickerOf = (slug) => projects.find((p) => p.slug === slug).kicker;

const withNum = (t, n) => ({ en: `${t.en} ${n}`, es: `${t.es} ${n}`, it: `${t.it} ${n}` });

function figure(pg, fig, n, kind) {
  const [w, h] = dims(fig.src);
  const src = pg.m(fig.src);
  const media = isVideo(fig.src)
    ? `<video src="${src}" poster="${pg.m(fig.src.replace('.mp4', '.jpg'))}" width="${w}" height="${h}" muted loop playsinline autoplay preload="metadata" ${pg.a([['aria-label', fig.cap]])}></video>`
    : `<img src="${src}" width="${w}" height="${h}" ${kind === 'hero' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${pg.a([['alt', fig.cap]])}>`;
  return `
      <figure class="fig fig--${kind}${isVideo(fig.src) ? ' fig--video' : ''}" data-fig="${n}">
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
<html lang="${pg.lang}" data-lang="${pg.lang}" data-theme="day"${pg.section ? ` data-active="${pg.section}"` : ''} ${altData}>
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
<body class="${pg.slug ? 'is-project' : 'is-home'}"${pg.section ? ` data-section="${pg.section}"` : ''}>
<a class="skip-link" href="#main" ${pg.t(ui.skip)}>${pg.s(ui.skip)}</a>
<div class="atmos" aria-hidden="true"><i class="atmos-day"></i><i class="atmos-night"></i></div>
`;
}

function topbar(pg) {
  const homeHref = pg.slug ? '../index.html' : '#main';
  const brand = `<a class="brand" href="${homeHref}"><img class="mark" src="${pg.m('quetzal.png')}" width="158" height="244" alt=""><span>Brian Contreras</span></a>`;
  const langs = LANGS.map((l) => `<a href="${pg.alt(l)}" data-set-lang="${l}" hreflang="${l}" lang="${l}" aria-keyshortcuts="2"${l === pg.lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  const nav = pg.slug ? '' : `
    <nav class="quick-nav" ${pg.a([['aria-label', ui.sectionsNav]])}>
      ${ui.nav.map((n) => `<a href="${n.href}" data-section="${n.section}" ${pg.t(n.label)}>${pg.s(n.label)}</a>`).join('\n      ')}
    </nav>`;
  // a small keycap beside each control shows its numeric shortcut
  const keycap = (k) => `<kbd class="keycap" data-key="${k}" aria-hidden="true" ${pg.a([['title', withNum(ui.shortcut, k)]])}>${k}</kbd>`;
  return `
<div class="rail" aria-hidden="true"></div>
<header class="topbar">
  <div class="topbar-row">
    ${brand}${nav}
    <div class="utils">
      <div class="ctl"><div class="seg seg--lang" role="group" ${pg.a([['aria-label', ui.langGroup]])}>${langs}</div>${keycap(2)}</div>
      <div class="ctl"><div class="seg seg--theme" role="group" ${pg.a([['aria-label', ui.themeGroup]])}><button type="button" data-set-theme="day" aria-pressed="true" aria-keyshortcuts="1">${SUN}<span ${pg.t(ui.day)}>${pg.s(ui.day)}</span></button><button type="button" data-set-theme="night" aria-pressed="false" aria-keyshortcuts="1">${MOON}<span ${pg.t(ui.night)}>${pg.s(ui.night)}</span></button></div>${keycap(1)}</div>
    </div>
  </div>
</header>
`;
}

function footer(pg) {
  const back = pg.slug ? `
    <a class="u" href="../index.html" ${pg.t(arrowize(ui.backAll))}>${pg.s(arrowize(ui.backAll))}</a>` : '';
  return `
<footer class="site-footer">
  <div class="footer-row">
    <span>Brian Contreras, 2026</span>${back}
    <a class="u" href="mailto:${EMAIL}" ${pg.t(ui.touch)}>${pg.s(ui.touch)}</a>
    <span class="copy-wrap">
      <button type="button" class="copy-email" data-email="${EMAIL}"><span ${pg.t(ui.copy)}>${pg.s(ui.copy)}</span></button>
      <span class="copy-badge" role="status" aria-live="polite"></span>
    </span>
  </div>
  <div class="footer-sub">
    <div class="sig" aria-hidden="true"></div>
  </div>
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
  // every block carries its section number as its colour identity (data-section)
  const block = (index, id, labelHtml, content, extraMeta = '', cls = '') => `
  <section class="block${cls ? ` ${cls}` : ''}"${id ? ` id="${id}"` : ''} data-section="${index}" data-step>
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
  const voice = (t) => t ? `
      <p class="work-voice" ${pg.t(t)}>${pg.s(t)}</p>` : '';

  let html = head(pg, { title: home.title, description: home.description });
  html += topbar(pg);
  html += `
<main id="main" tabindex="-1">
  <section class="hero-intro">
    <div class="hero-text">
      <h1 class="headline" ${pg.t(home.headline)}>${pg.s(home.headline)}</h1>
      <p class="descriptor" ${pg.t(home.descriptor)}>${pg.s(home.descriptor)}</p>
      <p class="descriptor-support" ${pg.t(home.descriptorSupport)}>${pg.s(home.descriptorSupport)}</p>
    </div>
    <div class="weave-wrap">
      <figure class="weave" role="button" tabindex="0" ${pg.a([['aria-label', ui.weaveLabel]])}><canvas aria-hidden="true"></canvas><div class="greet" aria-hidden="true"></div></figure>
      <p class="weave-hint" aria-hidden="true"><i></i><span ${pg.t(ui.weaveHint)}>${pg.s(ui.weaveHint)}</span></p>
      <p class="sr-only greet-status" role="status"></p>
    </div>
  </section>
`;
  const st = home.statement;
  const practices = `
      <ul class="practices" ${pg.a([['aria-label', ui.practices]])}>${st.practices.map((x) => `
        <li><h3 ${pg.t(x.title)}>${pg.s(x.title)}</h3><p ${pg.t(x.text)}>${pg.s(x.text)}</p></li>`).join('')}
      </ul>`;
  html += block('01', 'statement', label(st.label), `
      <div class="prose-serif">${st.body.map(p).join('')}
      </div>` + practices,
    `\n      <img class="headshot" src="${pg.m('headshot.png')}" width="158" height="243" loading="lazy" decoding="async" ${pg.a([['alt', st.headshotAlt]])}>`);

  html += `\n  <div id="works">`;
  for (const w of home.works) {
    const titleLink = `<h2 class="label"><a class="category-link" href="${w.slug}/index.html"><span ${pg.t(w.title)}>${pg.s(w.title)}</span> <span class="arrow-ne" aria-hidden="true">↗</span></a></h2>
      <div class="peek" aria-hidden="true"><div class="peek-inner"><span class="mat"><img src="${pg.m(w.preview)}" loading="lazy" decoding="async" alt=""></span><span class="peek-label" ${pg.t(kickerOf(w.slug))}>${pg.s(kickerOf(w.slug))}</span></div></div>`;
    html += block(w.index, `work-${w.index}`, titleLink,
      voice(w.voice) + specTable(pg, w.specs) + p(w.body) + `
      <a class="cta u" href="${w.slug}/index.html" ${pg.t(arrowize(w.cta))}>${pg.s(arrowize(w.cta))}</a>`);
  }
  html += `  </div>\n`;

  const sy = home.systems;
  // each term is shown in all three languages; the one being read is set darker
  const terms = `
      <ul class="marginalia" ${pg.a([['aria-label', ui.terms]])}>${sy.terms.map(([en, es, it]) => `
        <li><span lang="en">${en}</span><span class="sl" aria-hidden="true">/</span><span lang="es">${es}</span><span class="sl" aria-hidden="true">/</span><span lang="it">${it}</span></li>`).join('')}
      </ul>`;
  html += block('08', 'systems', label(sy.label), p(sy.body) + terms + `
      <div class="gallery gallery--inline">${sy.figs.map((f, i) => figure(pg, f, i + 1, 'card')).join('')}
      </div>`);
  html += block('09', 'ludology', label(home.ludology.label), p(home.ludology.body));

  const pub = home.publications;
  const items = pub.items.map((it) => `
        <li>
          <span class="pub-kind" ${pg.t(it.kind)}>${pg.s(it.kind)}</span>
          <span class="pub-text"><span ${pg.t(it.text)}>${pg.s(it.text)}</span>${it.href ? ` <a class="doc-link u" href="${it.href}" ${pg.t(arrowize(it.link))}>${pg.s(arrowize(it.link))}</a>` : ''}</span>
        </li>`).join('');
  html += block('10', 'publications', label(pub.label), p(pub.intro) + `
      <ol class="pubs">${items}
      </ol>`);
  // the closing answers the opening greeting: a spectral line across all eleven
  // section colours, ending on the rose of the coda, and a trilingual thanks
  const signal = `
      <div class="coda-signal">
        <span class="line" aria-hidden="true"></span><span class="mark-end" aria-hidden="true"></span>
        <p class="coda-thanks"><span lang="en">Thank you<span class="gp p1">!</span></span><span lang="es"><span class="gp p2">¡</span>Gracias<span class="gp p2">!</span></span><span lang="it">Grazie<span class="gp p3">!</span></span></p>
      </div>`;
  html += block('11', 'coda', label(home.coda.label), `
      <div class="prose-serif">${p(home.coda.body)}
      </div>` + signal);
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
  pg.section = pr.index;   // the project page inherits its homepage section colour
  const title = { en: `${strip(pr.title.en)} — Brian Contreras`, es: `${strip(pr.title.es)} — Brian Contreras`, it: `${strip(pr.title.it)} — Brian Contreras` };
  let html = head(pg, { title, description: pr.description });
  html += topbar(pg);
  html += `
<main id="main" tabindex="-1">
  <header class="subpage-header" data-step>
    <a href="../index.html#work-${pr.index}" class="back-link u" ${pg.t(arrowize(ui.back))}>${pg.s(arrowize(ui.back))}</a>
    <p class="subpage-meta"><span ${pg.t(ui.indexWord)}>${pg.s(ui.indexWord)}</span> <span class="num">${pr.index}</span> // <span ${pg.t(pr.kicker)}>${pg.s(pr.kicker)}</span></p>
    <h1 class="subpage-title" ${pg.t(pr.title)}>${pg.s(pr.title)}</h1>${pr.video ? `
    <a class="watch" href="${pr.video.href}" target="_blank" rel="noopener">${PLAY}<span ${pg.t(arrowize(pr.video.label))}>${pg.s(arrowize(pr.video.label))}</span></a>` : ''}
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
    <div class="block-content">${s.voice ? `
      <p class="work-voice" ${pg.t(s.voice)}>${pg.s(s.voice)}</p>` : ''}${specTable(pg, s.specs)}${s.body ? `
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
