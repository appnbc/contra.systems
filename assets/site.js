/* =====================================================================
   TACTILE CURATION — interaction layer
   - Day / Night theme (saved; follows the system until chosen)
   - EN / ES / IT: each language has its own page; switching swaps text
     in place and moves the address bar to the matching page
   - woven-grid hero: a small generative artwork that answers the pointer;
     a click releases a spectral wave and six multilingual greetings
   - section colours: <html data-active> follows the section in view, so
     the rail, navigation and other indicators take on its prism colour
   - section rail, active navigation, footer signature of visited sections
   - index previews on hover and keyboard focus (and in view on touch)
   - keyboard: 1 Day/Night, 2 EN → ES → IT, J/K or Up/Down sections,
     Left/Right figures, Esc or Backspace back to the index from a project page
   - accessible lightbox (never enlarges an image beyond its own size)
   ===================================================================== */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;
  var LANGS = ['en', 'es', 'it'];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isProject = doc.body.classList.contains('is-project');

  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var dict = { en: {}, es: {}, it: {}, ui: {} };
  try { dict = JSON.parse(doc.getElementById('i18n').textContent); } catch (e) {}
  function uiText(key) { var t = dict.ui[key]; return t ? (t[lang] || t.en) : ''; }

  /* ================================================================
     Language
     ================================================================ */

  /* Pin media and language-link URLs to absolute addresses first: once the
     address bar moves to /es/ or /it/, relative paths would resolve one
     folder deeper. Page links stay relative on purpose, so they follow
     the visitor into the chosen language. */
  ['src', 'poster', 'data-full'].forEach(function (name) {
    qsa('[' + name + ']').forEach(function (el) {
      try { el.setAttribute(name, new URL(el.getAttribute(name), doc.baseURI).href); } catch (e) {}
    });
  });
  var langLinks = qsa('a[data-set-lang]');
  langLinks.forEach(function (a) { a.setAttribute('href', a.href); });

  var textNodes = qsa('[data-i18n]');
  textNodes.forEach(function (n) { n.__orig = n.innerHTML; });

  var attrNodes = qsa('[data-i18n-attr]').map(function (n) {
    var pairs = n.getAttribute('data-i18n-attr').split(';').map(function (p) {
      var i = p.indexOf(':'), name = p.slice(0, i);
      return { name: name, key: p.slice(i + 1), orig: n.getAttribute(name) };
    });
    return { node: n, pairs: pairs };
  });

  var lang = LANGS.indexOf(root.lang) > -1 ? root.lang : 'en';
  var langTimer;

  function setLang(l, persist) {
    if (LANGS.indexOf(l) < 0) l = 'en';
    var changed = l !== lang;
    lang = l;
    var table = dict[l] || {};
    if (changed) {
      textNodes.forEach(function (n) {
        var v = table[n.getAttribute('data-i18n')];
        if (v == null) v = n.__orig;
        if (n.innerHTML !== v) n.innerHTML = v;
      });
      attrNodes.forEach(function (a) {
        a.pairs.forEach(function (p) {
          var v = table[p.key];
          a.node.setAttribute(p.name, v == null ? p.orig : v);
        });
      });
      root.lang = l;
      root.setAttribute('data-lang', l);
      if (!reduce) {
        root.classList.remove('lang-swap'); void root.offsetWidth; root.classList.add('lang-swap');
        clearTimeout(langTimer); langTimer = setTimeout(function () { root.classList.remove('lang-swap'); }, 360);
      }
      if (weave) weave.retheme();
      var link = langLinks.filter(function (a) { return a.getAttribute('data-set-lang') === l; })[0];
      if (link) { try { history.replaceState(null, '', link.href + location.hash); } catch (e) {} }
    }
    langLinks.forEach(function (a) {
      if (a.getAttribute('data-set-lang') === l) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    if (persist) store('tc-lang', l);
    if (lb.dialog && lb.dialog.open) lb.render();
  }

  function cycleLang() { setLang(LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length], true); }

  /* ================================================================
     Theme
     ================================================================ */
  var themeMeta = doc.querySelector('meta[name="theme-color"]');
  var themeTimer;
  function setTheme(t, persist, animate) {
    if (t !== 'day' && t !== 'night') t = 'day';
    if (animate && !reduce && root.getAttribute('data-theme') !== t) {
      root.classList.add('theme-anim');
      clearTimeout(themeTimer);
      themeTimer = setTimeout(function () { root.classList.remove('theme-anim'); }, 480);
    }
    root.setAttribute('data-theme', t);
    qsa('[data-set-theme]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-theme') === t)); });
    if (themeMeta) themeMeta.setAttribute('content', t === 'night' ? '#111110' : '#F7F6F2');
    if (persist) store('tc-theme', t);
    if (weave) weave.retheme();
  }
  function toggleTheme() { setTheme(root.getAttribute('data-theme') === 'night' ? 'day' : 'night', true, true); }

  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystem = function (e) { if (!read('tc-theme')) setTheme(e.matches ? 'night' : 'day', false, true); };
  if (systemDark.addEventListener) systemDark.addEventListener('change', onSystem);
  else if (systemDark.addListener) systemDark.addListener(onSystem);

  doc.addEventListener('click', function (e) {
    var l = e.target.closest('[data-set-lang]');
    if (l && !(e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1)) {
      e.preventDefault();   /* swap in place; the link itself still works without JavaScript */
      setLang(l.getAttribute('data-set-lang'), true);
      return;
    }
    var t = e.target.closest('[data-set-theme]');
    if (t) setTheme(t.getAttribute('data-set-theme'), true, true);
  });

  /* ================================================================
     Woven-grid hero
     Warp and weft threads cross over and under one another; a few
     intersections glow in the accent colours. The pointer gently
     displaces nearby threads, lights intersections and sends a short
     signal along the closest thread. Static when motion is reduced.
     ================================================================ */
  var weave = null;
  var weaveFig = doc.querySelector('.weave');
  if (weaveFig && weaveFig.querySelector('canvas') && weaveFig.querySelector('canvas').getContext) {
    weave = (function (fig) {
      var canvas = fig.querySelector('canvas'), ctx = canvas.getContext('2d');
      var simple = !finePointer;
      var W = 0, H = 0, dpr = 1, sp = 20, cols = 0, rows = 0, ox = 0, oy = 0;
      var X = new Float32Array(0), Y = new Float32Array(0);
      var pal = null, target = null;
      var ptr = { x: -1e4, y: -1e4, sx: -1e4, sy: -1e4, on: false, e: 0 };
      var pulses = [], lastPulse = 0;
      var lit = [], section = 0, running = false, visible = true, raf = 0, t0 = performance.now();
      /* the full prism, in the order the sections run through it */
      var SPEC = ['prism-coral', 'prism-orange', 'prism-amber', 'prism-chartreuse', 'prism-teal', 'prism-cyan',
        'prism-blue', 'prism-indigo', 'prism-violet', 'prism-magenta', 'prism-rose'];
      var NS = SPEC.length;
      var LANG_OFF = { en: 4, es: 0, it: 8 };
      var waves = [], WLIFE = 1150, WSPEED = 0.56, wrap = fig.parentNode;
      var traces = [], TLIFE = 2600;

      function hex(c) {
        c = c.trim();
        if (c.charAt(0) === '#') {
          if (c.length === 4) c = '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
          var n = parseInt(c.slice(1), 16);
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
        }
        var m = c.match(/[\d.]+/g);
        return m ? [+m[0], +m[1], +m[2]] : [128, 128, 128];
      }
      function readPalette() {
        var cs = getComputedStyle(root), p = {};
        ['ink', 'mat', 'border-color', 'la', 'lb', 'prism-yellow'].concat(SPEC).forEach(function (k) { p[k] = hex(cs.getPropertyValue('--' + k)); });
        return p;
      }
      /* the spectrum, rotated so each language starts from its own colour */
      function spec(i) { return pal[SPEC[(((i + LANG_OFF[lang]) % NS) + NS) % NS]]; }
      function rgba(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a.toFixed(3) + ')'; }
      function mix(dst, src, k) { for (var key in src) for (var i = 0; i < 3; i++) dst[key][i] += (src[key][i] - dst[key][i]) * k; }

      /* deterministic randomness so the composition is the same on every visit */
      function prng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

      var weftW = [], warpW = [], accentRow = -1, accentCol = -1;
      function seedLit() {
        var rnd = prng(11), n = simple ? 8 : 13;
        /* woven bands: groups of threads share a weight, like stripes in cloth */
        var weights = [0.16, 0.24, 0.32, 0.48], w = 1;
        weftW = []; warpW = [];
        for (var a = 0; a < rows; a++) { if (a % 3 === 0) w = weights[Math.floor(rnd() * 4)]; weftW.push(w); }
        for (var b = 0; b < cols; b++) { if (b % 4 === 0) w = weights[Math.floor(rnd() * 4)] + 0.06; warpW.push(w); }
        accentRow = Math.round(rows * 0.62); accentCol = Math.round(cols * 0.3);
        lit = [];
        for (var k = 0; k < n; k++) {
          lit.push({ i: 1 + Math.floor(rnd() * (cols - 2)), j: 1 + Math.floor(rnd() * (rows - 2)), k: k, ph: rnd() * Math.PI * 2 });
        }
      }

      function layout() {
        var r = canvas.getBoundingClientRect();
        W = Math.max(1, r.width); H = Math.max(1, r.height);
        dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        sp = simple ? 24 : 19;
        cols = Math.ceil(W / sp) + 3; rows = Math.ceil(H / sp) + 3;
        ox = (W - (cols - 1) * sp) / 2; oy = (H - (rows - 1) * sp) / 2;
        X = new Float32Array(cols * rows); Y = new Float32Array(cols * rows);
        seedLit();
      }

      function compute(t) {
        var amp = reduce ? 0 : 1.6, sig = 58, push = 11 * ptr.e;
        for (var i = 0; i < cols; i++) {
          for (var j = 0; j < rows; j++) {
            var bx = ox + i * sp, by = oy + j * sp;
            var over = ((i + j) & 1) ? 0.7 : -0.7;
            var x = bx + over + amp * Math.sin(j * 0.55 + t * 0.00045 + i * 0.12);
            var y = by - over + amp * Math.sin(i * 0.5 + t * 0.00038 + j * 0.15);
            if (push > 0.01) {
              var dx = x - ptr.sx, dy = y - ptr.sy, d2 = dx * dx + dy * dy;
              if (d2 < 9 * sig * sig) {
                var d = Math.sqrt(d2) || 1, f = push * Math.exp(-d2 / (2 * sig * sig));
                x += dx / d * f; y += dy / d * f;
              }
            }
            /* a wave front lifts the threads as it passes */
            for (var w = 0; w < waves.length; w++) {
              var W0 = waves[w], age = t - W0.t0;
              if (age < 0 || age > WLIFE) continue;
              var wx = x - W0.x, wy = y - W0.y, wd = Math.sqrt(wx * wx + wy * wy) || 1;
              var off = wd - age * WSPEED, lift = (reduce ? 0 : 7) * (1 - age / WLIFE) * Math.exp(-off * off / 648);
              x += wx / wd * lift; y += wy / wd * lift;
            }
            X[i * rows + j] = x; Y[i * rows + j] = y;
          }
        }
      }

      function near(x, y, r) {
        if (ptr.e < 0.02) return 0;
        var dx = x - ptr.sx, dy = y - ptr.sy, d = Math.sqrt(dx * dx + dy * dy);
        return d > r ? 0 : (1 - d / r) * ptr.e;
      }

      function draw(t) {
        var p = pal, ink = p.ink, i, j, idx;
        /* clear every device pixel first: the edge rows are only partly
           covered by a fractional-size fill and would keep the last frame */
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = rgba(p.mat, 1);
        ctx.fillRect(0, 0, Math.ceil(W), Math.ceil(H));

        /* light moving across a reflective surface */
        var tl = reduce ? 0 : t;   /* with reduced motion the light holds still */
        var lx = W * (0.32 + 0.22 * Math.sin(tl * 0.00006)), ly = H * (0.42 + 0.2 * Math.cos(tl * 0.00005));
        var g = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(W, H) * 0.65);
        var acc = p.la;
        g.addColorStop(0, rgba(acc, 0.16)); g.addColorStop(1, rgba(acc, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

        /* a sparser diagonal lattice behind, for depth */
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(ink, 0.06);
        ctx.beginPath();
        var step = sp * 2.6, shift = reduce ? 0 : (t * 0.004) % step;
        for (var s = -H; s < W + H; s += step) {
          ctx.moveTo(s + shift, 0); ctx.lineTo(s + shift - H * 0.58, H);
          ctx.moveTo(s - shift, 0); ctx.lineTo(s - shift + H * 0.58, H);
        }
        ctx.stroke();

        compute(t);

        /* weft (horizontal) then warp (vertical) threads, in woven bands of weight;
           one warp thread carries teal and one weft thread carries pink */
        for (j = 0; j < rows; j++) {
          ctx.beginPath();
          ctx.moveTo(X[j], Y[j]);
          for (i = 1; i < cols; i++) { idx = i * rows + j; ctx.lineTo(X[idx], Y[idx]); }
          if (j === accentRow) { ctx.lineWidth = 1.4; ctx.strokeStyle = rgba(p.lb, 0.8); }
          else { ctx.lineWidth = weftW[j] > 0.35 ? 1.25 : 1; ctx.strokeStyle = rgba(ink, weftW[j]); }
          ctx.stroke();
        }
        for (i = 0; i < cols; i++) {
          idx = i * rows;
          ctx.beginPath();
          ctx.moveTo(X[idx], Y[idx]);
          for (j = 1; j < rows; j++) ctx.lineTo(X[idx + j], Y[idx + j]);
          if (i === accentCol) { ctx.lineWidth = 1.4; ctx.strokeStyle = rgba(p.la, 0.85); }
          else { ctx.lineWidth = warpW[i] > 0.45 ? 1.25 : 1; ctx.strokeStyle = rgba(ink, warpW[i]); }
          ctx.stroke();
        }
        ctx.lineWidth = 1;

        /* where the weft passes over: cut the warp with a halo, redraw the weft on top */
        var halo = new Path2D(), top = new Path2D();
        for (i = 1; i < cols - 1; i++) {
          for (j = 0; j < rows; j++) {
            if ((i + j) & 1) continue;
            var a = (i - 1) * rows + j, b = i * rows + j, c = (i + 1) * rows + j;
            var x1 = (X[a] + X[b]) / 2, y1 = (Y[a] + Y[b]) / 2, x2 = (X[b] + X[c]) / 2, y2 = (Y[b] + Y[c]) / 2;
            var hx1 = X[b] + (x1 - X[b]) * 0.55, hy1 = Y[b] + (y1 - Y[b]) * 0.55, hx2 = X[b] + (x2 - X[b]) * 0.55, hy2 = Y[b] + (y2 - Y[b]) * 0.55;
            halo.moveTo(hx1, hy1); halo.lineTo(hx2, hy2);
            top.moveTo(x1, y1); top.lineTo(X[b], Y[b]); top.lineTo(x2, y2);
          }
        }
        ctx.lineWidth = 3.4; ctx.strokeStyle = rgba(p.mat, 1); ctx.stroke(halo);
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(ink, 0.3); ctx.stroke(top);

        /* soft falloff at the edges, as if the cloth curves away from the light */
        var v = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
        v.addColorStop(0, rgba(p.mat, 0)); v.addColorStop(1, rgba(p.mat, 0.55));
        ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);

        /* threads near the pointer catch light: colour shifts around the pointer
           through the spectrum, like light bending through a material */
        if (ptr.e > 0.02) {
          var R = 100, buckets = [];
          for (var q0 = 0; q0 < 16; q0++) buckets.push(null);
          var addSeg = function (ax, ay, bx2, by2) {
            var mx = (ax + bx2) / 2, my = (ay + by2) / 2, wgt = near(mx, my, R);
            if (wgt < 0.06) return;
            var hb = Math.floor(((Math.atan2(my - ptr.sy, mx - ptr.sx) + Math.PI) / (2 * Math.PI)) * 8) % 8;
            var key = hb * 2 + (wgt > 0.5 ? 1 : 0);
            if (!buckets[key]) buckets[key] = new Path2D();
            buckets[key].moveTo(ax, ay); buckets[key].lineTo(bx2, by2);
          };
          for (i = 0; i < cols - 1; i++) {
            for (j = 0; j < rows - 1; j++) {
              idx = i * rows + j;
              addSeg(X[idx], Y[idx], X[idx + rows], Y[idx + rows]);
              addSeg(X[idx], Y[idx], X[idx + 1], Y[idx + 1]);
            }
          }
          ctx.lineWidth = 1.15;
          for (var q1 = 0; q1 < 16; q1++) {
            if (!buckets[q1]) continue;
            ctx.strokeStyle = rgba(spec(Math.round((q1 >> 1) * NS / 8)), (q1 & 1 ? 0.85 : 0.4) * Math.min(1, ptr.e * 1.2));
            ctx.stroke(buckets[q1]);
          }
        }

        /* waves of light from a click or key press */
        for (var wv = waves.length - 1; wv >= 0; wv--) {
          var Wv = waves[wv], wage = t - Wv.t0;
          if (wage > WLIFE) { waves.splice(wv, 1); continue; }
          if (wage < 0) continue;
          var wr = wage * WSPEED, fade = 1 - wage / WLIFE, ease = fade * fade * (3 - 2 * fade), shift = Math.floor(wage / 150);
          /* ripple rings */
          ctx.lineWidth = 1.3;
          ctx.strokeStyle = rgba(spec(shift), 0.6 * ease);
          ctx.beginPath(); ctx.arc(Wv.x, Wv.y, wr, 0, Math.PI * 2); ctx.stroke();
          ctx.strokeStyle = rgba(spec(shift + 3), 0.28 * ease);
          ctx.beginPath(); ctx.arc(Wv.x, Wv.y, wr * 0.62, 0, Math.PI * 2); ctx.stroke();
          /* threads on the wave front light up in concentric bands of the spectrum */
          var wb = [], band = 30;
          for (i = 0; i < cols - 1; i++) {
            for (j = 0; j < rows - 1; j++) {
              idx = i * rows + j;
              for (var s2 = 0; s2 < 2; s2++) {
                var n2 = s2 ? idx + 1 : idx + rows;
                var mx2 = (X[idx] + X[n2]) / 2 - Wv.x, my2 = (Y[idx] + Y[n2]) / 2 - Wv.y, dm = Math.sqrt(mx2 * mx2 + my2 * my2);
                if (Math.abs(dm - wr) > band) continue;
                var ci = (Math.floor(dm / 38) + shift) % NS;
                if (!wb[ci]) wb[ci] = new Path2D();
                wb[ci].moveTo(X[idx], Y[idx]); wb[ci].lineTo(X[n2], Y[n2]);
              }
            }
          }
          ctx.lineWidth = 1.5;
          for (var c2 = 0; c2 < NS; c2++) if (wb[c2]) { ctx.strokeStyle = rgba(spec(c2), 0.85 * ease); ctx.stroke(wb[c2]); }
          /* intersections illuminate in sequence as the front reaches them */
          for (i = 0; i < cols; i++) {
            for (j = 0; j < rows; j++) {
              idx = i * rows + j;
              var ix = X[idx] - Wv.x, iy = Y[idx] - Wv.y, di = Math.sqrt(ix * ix + iy * iy), gap = Math.abs(di - wr);
              if (gap > 16) continue;
              ctx.fillStyle = rgba(spec(Math.floor(di / 38) + shift), ease * (1 - gap / 16));
              ctx.fillRect(X[idx] - 2.5, Y[idx] - 2.5, 5, 5);
            }
          }
          /* the point of touch */
          if (wage < 320) { ctx.fillStyle = rgba(p.la, 1 - wage / 320); ctx.fillRect(Wv.x - 3, Wv.y - 3, 6, 6); }
        }

        /* lit intersections: small squares, the site's signature mark */
        for (var k = 0; k < lit.length; k++) {
          var L = lit[k];
          if (L.i >= cols || L.j >= rows) continue;
          idx = L.i * rows + L.j;
          /* mostly the language pair and the section accent, with a few spectral notes */
          var col = k % 4 === 0 ? spec(k * 3) : k % 4 === 1 ? p.la : k % 4 === 2 ? p.lb : spec(section + k);
          var glow = reduce ? 0.8 : 0.55 + 0.4 * Math.sin(t * 0.0011 + L.ph);
          ctx.fillStyle = rgba(col, glow);
          ctx.fillRect(X[idx] - 2.5, Y[idx] - 2.5, 5, 5);
        }
        if (ptr.e > 0.02) {
          for (i = 0; i < cols; i++) {
            for (j = 0; j < rows; j++) {
              idx = i * rows + j;
              var n = near(X[idx], Y[idx], 70);
              if (n > 0.15) {
                var hb2 = Math.floor(((Math.atan2(Y[idx] - ptr.sy, X[idx] - ptr.sx) + Math.PI) / (2 * Math.PI)) * 8) % 8;
                ctx.fillStyle = rgba(spec(Math.round(hb2 * NS / 8)), n); ctx.fillRect(X[idx] - 2, Y[idx] - 2, 4, 4);
              }
            }
          }
        }

        /* a greeting's punctuation lights the threads at its crossing; once the
           words fade the grid keeps a very faint spectral trace for a moment */
        for (var tr = traces.length - 1; tr >= 0; tr--) {
          var T = traces[tr], tage = t - T.t0;
          if (tage > TLIFE) { traces.splice(tr, 1); continue; }
          if (tage < 0 || T.i < 2 || T.j < 2 || T.i > cols - 3 || T.j > rows - 3) continue;
          var tin = Math.min(1, tage / 180), tout = 1 - tage / TLIFE, ta = 0.9 * tin * tout * tout;
          var tc = p[T.c] || p.la;
          ctx.lineWidth = 1.5;
          for (var arm = -2; arm < 2; arm++) {
            var fall = arm < 0 ? (3 + arm) / 3 : (2 - arm) / 3;   /* brightest at the crossing */
            ctx.strokeStyle = rgba(tc, ta * fall);
            var h1 = (T.i + arm) * rows + T.j, h2 = (T.i + arm + 1) * rows + T.j;
            var v1 = T.i * rows + T.j + arm, v2 = T.i * rows + T.j + arm + 1;
            ctx.beginPath();
            ctx.moveTo(X[h1], Y[h1]); ctx.lineTo(X[h2], Y[h2]);
            ctx.moveTo(X[v1], Y[v1]); ctx.lineTo(X[v2], Y[v2]);
            ctx.stroke();
          }
          idx = T.i * rows + T.j;
          ctx.fillStyle = rgba(tc, Math.min(1, ta * 1.2));
          ctx.fillRect(X[idx] - 2.5, Y[idx] - 2.5, 5, 5);
        }

        /* signals travelling along a thread */
        for (var q = pulses.length - 1; q >= 0; q--) {
          var P = pulses[q], age = t - P.t0, life = 1500;
          if (age > life || P.j >= rows) { pulses.splice(q, 1); continue; }
          var head = P.x + P.dir * age * 0.32, tail = head - P.dir * 42;
          ctx.beginPath();
          var started = false;
          for (i = 0; i < cols; i++) {
            idx = i * rows + P.j;
            var xx = X[idx], lo2 = Math.min(head, tail), hi2 = Math.max(head, tail);
            if (xx < lo2 || xx > hi2) continue;
            if (!started) { ctx.moveTo(xx, Y[idx]); started = true; } else ctx.lineTo(xx, Y[idx]);
          }
          if (started) { ctx.lineWidth = 1.8; ctx.strokeStyle = rgba(p[P.c], 0.9 * (1 - age / life)); ctx.stroke(); }
        }
      }

      function frame(now) {
        raf = 0;
        if (target) mix(pal, target, 0.08);
        ptr.sx += (ptr.x - ptr.sx) * 0.18; ptr.sy += (ptr.y - ptr.sy) * 0.18;
        ptr.e += ((ptr.on ? 1 : 0) - ptr.e) * 0.06;
        draw(now - t0);
        if (running && visible && !doc.hidden) raf = requestAnimationFrame(frame);
      }
      function kick() { if (!raf && (running ? visible && !doc.hidden : true)) raf = requestAnimationFrame(frame); }

      pal = readPalette(); target = readPalette();
      layout();
      fig.classList.add('is-live');
      running = !reduce;
      kick();

      if ('ResizeObserver' in window) new ResizeObserver(function () { layout(); kick(); }).observe(canvas);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) kick(); }).observe(fig);
      }
      doc.addEventListener('visibilitychange', function () { if (!doc.hidden) kick(); });

      if (finePointer && !reduce) {
        fig.addEventListener('pointermove', function (e) {
          var r = canvas.getBoundingClientRect();
          ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
          if (!ptr.on) { ptr.sx = ptr.x; ptr.sy = ptr.y; }
          ptr.on = true;
          var now = performance.now();
          if (now - lastPulse > 650) {
            lastPulse = now;
            var j = Math.max(0, Math.min(rows - 1, Math.round((ptr.y - oy) / sp)));
            var c = pulses.length % 4 ? 'la' : 'lb';
            pulses.push({ j: j, x: ptr.x, dir: 1, t0: now - t0, c: c }, { j: j, x: ptr.x, dir: -1, t0: now - t0, c: c });
            if (pulses.length > 8) pulses.splice(0, 2);
          }
        });
        fig.addEventListener('pointerleave', function () { ptr.on = false; });
      }

      /* the signature moment: a wave of light from the point of touch */
      function addWave(x, y) {
        var now = performance.now() - t0;
        if (reduce) {
          /* no motion: show a single still frame of the wave, then settle back */
          waves = [{ x: x, y: y, t0: now - 420 }];
          kick();
          setTimeout(function () { waves = []; kick(); }, 900);
        } else {
          waves.push({ x: x, y: y, t0: now });
          if (waves.length > 4) waves.shift();
          kick();
        }
        if (wrap && wrap.classList) wrap.classList.add('has-played');
        greet(x, y);
      }

      /* ---- six multilingual greetings ----
         Shown in all three languages whatever the page language. Words and
         punctuation are separate spans so the punctuation takes its own colour.
         The first group emerges near the point of touch, the second farther out;
         each settles on a grid crossing, stays inside the artwork, and the
         layer is cleared when they have faded. A new click restarts it. */
      var GREETINGS = [
        { cls: 'hello', lang: 'en', parts: ['Hello', '!'], punct: 'prism-cyan' },
        { cls: 'hola', lang: 'es', parts: ['¡', 'Hola', '!'], punct: 'prism-amber' },
        { cls: 'ciao', lang: 'it', parts: ['Ciao', '!'], punct: 'prism-violet' },
        { cls: 'welcome', lang: 'en', parts: ['Welcome', '!'], punct: 'prism-rose' },
        { cls: 'bienvenidos', lang: 'es', parts: ['¡', 'Bienvenidos', '!'], punct: 'prism-yellow' },
        { cls: 'benvenuti', lang: 'it', parts: ['Benvenuti', '!'], punct: 'prism-coral' }
      ];
      var layer = fig.querySelector('.greet');
      var status = wrap && wrap.querySelector ? wrap.querySelector('.greet-status') : null;
      var greetTimer = 0, greetCount = 0, lastSaid = 0;

      function greet(x, y) {
        if (!layer || W < 40 || H < 40) return;
        clearTimeout(greetTimer);
        layer.textContent = '';   /* repeated clicks restart rather than accumulate */
        greetCount++;
        var gs = Math.max(13, Math.min(26, W * 0.042));
        layer.style.setProperty('--gs', gs.toFixed(1) + 'px');
        var pad = 12, placed = [], now = performance.now() - t0;
        var turn = greetCount * 0.9 + (x / W) * 1.3;   /* vary the composition between clicks */
        GREETINGS.forEach(function (g, n) {
          var el = doc.createElement('span');
          el.className = 'gw gw--' + g.cls;
          el.lang = g.lang;
          g.parts.forEach(function (part) {
            var s = doc.createElement('span');
            s.textContent = part;
            if (part === '!' || part === '¡') s.className = 'gp';
            el.appendChild(s);
          });
          layer.appendChild(el);
          var w = el.offsetWidth, h = el.offsetHeight;
          var group = n < 3 ? 0 : 1, k = n % 3;
          var r = Math.min(W, H) * (group ? 0.37 : 0.2);
          var best = null;
          for (var tries = 0; tries < 18; tries++) {
            var ang = turn + group * Math.PI / 3 + k * (2 * Math.PI / 3) + (tries ? (tries % 2 ? 1 : -1) * Math.ceil(tries / 2) * 0.33 : 0);
            var rr = r * (tries > 9 ? 1.25 : 1);
            var gi = Math.round((x + Math.cos(ang) * rr - ox) / sp), gj = Math.round((y + Math.sin(ang) * rr - oy) / sp);
            var ax = ox + gi * sp, ay = oy + gj * sp;
            /* the word sits just above-right of its crossing, clamped inside the artwork */
            var bx = Math.max(pad, Math.min(W - w - pad, ax - w * 0.2));
            var by = Math.max(pad, Math.min(H - h - pad, ay - h * 0.85));
            var box = { x: bx, y: by, w: w, h: h, gi: gi, gj: gj };
            var hit = placed.some(function (o) {
              return !(box.x + box.w + 8 < o.x || o.x + o.w + 8 < box.x || box.y + box.h + 4 < o.y || o.y + o.h + 4 < box.y);
            });
            if (!best) best = box;
            if (!hit) { best = box; break; }
          }
          placed.push(best);
          var dirx = best.x + w / 2 - x, diry = best.y + h / 2 - y, dl = Math.sqrt(dirx * dirx + diry * diry) || 1;
          var delay = reduce ? 0 : (group ? 520 : 110) + k * 90;
          el.style.setProperty('--x', best.x.toFixed(1) + 'px');
          el.style.setProperty('--y', best.y.toFixed(1) + 'px');
          el.style.setProperty('--dx', (dirx / dl * 5).toFixed(1) + 'px');
          el.style.setProperty('--dy', (diry / dl * 5 - 2).toFixed(1) + 'px');
          el.style.setProperty('--d', delay + 'ms');
          if (!reduce) {
            var ci = Math.max(0, Math.min(cols - 1, best.gi)), cj = Math.max(0, Math.min(rows - 1, best.gj));
            traces.push({ i: ci, j: cj, c: g.punct, t0: now + delay + 300 });
            if (traces.length > 12) traces.splice(0, traces.length - 12);
          }
        });
        kick();
        greetTimer = setTimeout(function () { layer.textContent = ''; }, reduce ? 2100 : 2300);
        /* the words are also announced, at most once every few seconds */
        if (status && Date.now() - lastSaid > 4000) {
          lastSaid = Date.now();
          status.textContent = '';
          setTimeout(function () { status.textContent = 'Hello! ¡Hola! Ciao! Welcome! ¡Bienvenidos! Benvenuti!'; }, 60);
        }
      }

      fig.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return;
        var r = canvas.getBoundingClientRect();
        addWave(e.clientX - r.left, e.clientY - r.top);
      });
      /* keyboard (and assistive-technology clicks, which carry no pointer position) */
      fig.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        addWave(ptr.on ? ptr.x : W / 2, ptr.on ? ptr.y : H / 2);
      });
      fig.addEventListener('click', function (e) { if (e.detail === 0) addWave(W / 2, H / 2); });

      return {
        waves: function () { return waves.length; },
        retheme: function () {
          target = readPalette();
          if (reduce) { pal = readPalette(); }
          kick();
          if (!running) setTimeout(kick, 60);
        },
        setSection: function (n) {
          if (n === section) return;
          section = n;
          kick();
        }
      };
    })(weaveFig);
  }

  /* ================================================================
     Cursor halo: a fine ring and point that follow the system cursor
     (which stays visible), respond to what is under it and pulse on
     click. Fine pointers only; off with reduced motion; never takes input.
     ================================================================ */
  if (finePointer && !reduce) {
    var cur = doc.createElement('div');
    cur.className = 'cursor';
    cur.setAttribute('aria-hidden', 'true');
    cur.innerHTML = '<span class="cursor-ring"></span><span class="cursor-dot"></span>';
    doc.body.appendChild(cur);
    var cx = -100, cy = -100, tx = -100, ty = -100, craf = 0, lastTarget = null;
    var cursorLoop = function () {
      cx += (tx - cx) * 0.5; cy += (ty - cy) * 0.5;
      cur.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      craf = (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.2) ? requestAnimationFrame(cursorLoop) : 0;
    };
    var cursorState = function (el) {
      if (el === lastTarget || !el || !el.closest) return;
      lastTarget = el;
      var hero = el.closest('.weave');
      var title = !hero && el.closest('.category-link');
      var ext = !hero && !title && el.closest('a[target="_blank"], a[href^="mailto:"]');
      var link = !hero && !title && !ext && el.closest('a, button, [role="button"], .fig-open');
      var text = !hero && !title && !ext && !link && el.closest('p, li, dd, dt, h1, h2, figcaption');
      cur.classList.toggle('is-hero', !!hero);
      cur.classList.toggle('is-title', !!title);
      /* over a project title the halo takes that project's colour */
      if (title) cur.style.setProperty('--hover-accent', getComputedStyle(title).getPropertyValue('--section-accent').trim());
      cur.classList.toggle('is-external', !!ext);
      cur.classList.toggle('is-link', !!link);
      cur.classList.toggle('is-text', !!text);
    };
    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      if (!cur.classList.contains('is-on')) { cx = tx; cy = ty; cur.classList.add('is-on'); }
      cursorState(e.target);
      if (!craf) craf = requestAnimationFrame(cursorLoop);
    }, { passive: true });
    doc.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      cur.classList.add('is-down');
      var inHero = e.target.closest && e.target.closest('.weave');
      var pulse = doc.createElement('span');
      pulse.className = inHero ? 'pulse is-hero' : 'pulse';
      pulse.style.left = e.clientX + 'px'; pulse.style.top = e.clientY + 'px';
      doc.body.appendChild(pulse);
      pulse.addEventListener('animationend', function () { pulse.remove(); });
    }, { passive: true });
    doc.addEventListener('pointerup', function () { cur.classList.remove('is-down'); }, { passive: true });
    doc.documentElement.addEventListener('mouseleave', function () { cur.classList.remove('is-on'); });
  }

  /* ================================================================
     Sections: rail, navigation, signature, index states
     ================================================================ */
  var steps = qsa('[data-step]');
  var rail = doc.querySelector('.rail'), sig = doc.querySelector('.sig');
  var railCells = [], sigCells = [];
  /* a step's colour identity: its own section, or the project page's */
  function sectionOf(el) { return el.getAttribute('data-section') || doc.body.getAttribute('data-section') || ''; }
  steps.forEach(function (s) {
    var cell;
    if (rail) { cell = rail.appendChild(doc.createElement('i')); if (sectionOf(s)) cell.setAttribute('data-section', sectionOf(s)); railCells.push(cell); }
    if (sig) { cell = sig.appendChild(doc.createElement('i')); if (sectionOf(s)) cell.setAttribute('data-section', sectionOf(s)); sigCells.push(cell); }
  });

  var navMap = { statement: '#statement', works: '#works', systems: '#systems', ludology: '#systems', publications: '#publications' };
  var navLinks = qsa('.quick-nav a');

  function sectionKey(el) {
    if (!el.id) return '';
    return el.id.indexOf('work-') === 0 ? 'works' : el.id;
  }

  var seen = [];
  function markCurrent(el) {
    var n = steps.indexOf(el);
    if (n < 0) return;
    steps.forEach(function (s) { s.classList.toggle('is-current', s === el); });
    seen[n] = true;
    railCells.forEach(function (c, k) {
      c.classList.toggle('is-now', k === n);
      c.classList.toggle('is-seen', !!seen[k] && k !== n);
    });
    sigCells.forEach(function (c, k) {
      c.classList.toggle('is-seen', !!seen[k]);
      c.classList.toggle('is-now', k === n);
    });
    /* the page-wide indicators take on this section's colour; CSS blends
       the previous colour into it before settling */
    var sec = sectionOf(el);
    if (sec) root.setAttribute('data-active', sec);
    var href = navMap[sectionKey(el)];
    navLinks.forEach(function (a) {
      if (href && a.getAttribute('href') === href) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    if (weave) weave.setSection(n);
  }

  if ('IntersectionObserver' in window && steps.length) {
    var currentObs = new IntersectionObserver(function (entries) {
      var atEnd = window.innerHeight + window.scrollY >= root.scrollHeight - 4;
      entries.forEach(function (en) { if (en.isIntersecting && !(atEnd && en.target !== steps[steps.length - 1])) markCurrent(en.target); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    steps.forEach(function (s) { currentObs.observe(s); });
    /* the last section may be too short to reach the reading line: at the very
       bottom of the page it becomes current, so the coda can close the visit */
    var endRaf = 0;
    window.addEventListener('scroll', function () {
      if (endRaf) return;
      endRaf = requestAnimationFrame(function () {
        endRaf = 0;
        if (window.innerHeight + window.scrollY >= root.scrollHeight - 4) markCurrent(steps[steps.length - 1]);
      });
    }, { passive: true });
  }

  /* index: hovering or focusing a project title activates its block, and its
     marker on the rail lights in the project's colour (an exhibition map) */
  qsa('.category-link').forEach(function (link) {
    var block = link.closest('.block');
    if (!block) return;
    var cell = railCells[steps.indexOf(block)];
    var on = function () { block.classList.add('is-active'); if (cell) cell.classList.add('is-peek'); };
    var off = function () { block.classList.remove('is-active'); if (cell) cell.classList.remove('is-peek'); };
    link.addEventListener('focus', on);
    link.addEventListener('blur', off);
    if (finePointer) {
      link.addEventListener('mouseenter', on);
      link.addEventListener('mouseleave', function () { if (doc.activeElement !== link) off(); });
    }
  });

  /* ================================================================
     Lightbox
     ================================================================ */
  var figs = qsa('.fig');
  var lb = { dialog: null, i: 0, trigger: null, closing: 0 };

  lb.build = function () {
    var d = doc.createElement('dialog');
    d.className = 'lightbox';
    d.innerHTML =
      '<div class="lb-bar"><span class="lb-count"></span>' +
      '<div class="lb-controls"><button type="button" class="lb-prev"></button>' +
      '<button type="button" class="lb-next"></button>' +
      '<button type="button" class="lb-close"></button></div></div>' +
      '<div class="lb-stage"></div><p class="lb-caption"></p>';
    doc.body.appendChild(d);
    d.querySelector('.lb-prev').addEventListener('click', function () { lb.go(-1); });
    d.querySelector('.lb-next').addEventListener('click', function () { lb.go(1); });
    d.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.classList.contains('lb-stage')) lb.close();
    });
    d.addEventListener('cancel', function (e) { e.preventDefault(); lb.close(); });   /* Esc: fade out */
    d.addEventListener('close', function () {
      d.classList.remove('is-shown');
      root.classList.remove('lb-lock');
      d.querySelector('.lb-stage').innerHTML = '';
      if (lb.trigger) lb.trigger.focus();
    });
    d.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = qsa('button:not([hidden])', d), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    lb.dialog = d;
  };

  lb.render = function () {
    var d = lb.dialog, fig = figs[lb.i];
    var btn = fig.querySelector('.fig-open'), src = btn.getAttribute('data-full');
    var cap = fig.querySelector('figcaption');
    var stage = d.querySelector('.lb-stage'), media;
    var current = stage.firstElementChild;
    if (!current || current.getAttribute('src') !== src) {
      if (/\.mp4$/i.test(src)) {
        media = doc.createElement('video');
        media.src = src;
        media.muted = true; media.loop = true; media.playsInline = true; media.controls = true;
        if (!reduce) media.autoplay = true;
      } else {
        media = doc.createElement('img');
        media.src = src;
        media.decoding = 'async';
      }
      stage.innerHTML = '';
      stage.appendChild(media);
    } else {
      media = current;
    }
    var label = cap ? cap.textContent.trim() : '';
    if (media.tagName === 'IMG') media.alt = label; else media.setAttribute('aria-label', label);
    d.querySelector('.lb-caption').innerHTML = cap ? cap.innerHTML : '';
    d.querySelector('.lb-count').innerHTML = '<b>Fig ' + fig.getAttribute('data-fig') + '</b> — ' + (lb.i + 1) + ' / ' + figs.length;
    d.querySelector('.lb-prev').textContent = '← ' + uiText('prev');
    d.querySelector('.lb-next').textContent = uiText('next') + ' →';
    d.querySelector('.lb-close').textContent = uiText('close') + ' ×';
    d.setAttribute('aria-label', uiText('viewer'));
    var multiple = figs.length > 1;
    d.querySelector('.lb-prev').hidden = !multiple;
    d.querySelector('.lb-next').hidden = !multiple;
  };

  lb.open = function (i, trigger) {
    if (!lb.dialog) lb.build();
    clearTimeout(lb.closing);
    lb.i = i; lb.trigger = trigger;
    lb.render();
    root.classList.add('lb-lock');
    if (!lb.dialog.open) {
      if (typeof lb.dialog.showModal === 'function') lb.dialog.showModal(); else lb.dialog.setAttribute('open', '');
    }
    requestAnimationFrame(function () { lb.dialog.classList.add('is-shown'); });
    lb.dialog.querySelector('.lb-close').focus();
  };

  lb.close = function () {
    var d = lb.dialog;
    if (!d || !d.open) return;
    d.classList.remove('is-shown');
    clearTimeout(lb.closing);
    lb.closing = setTimeout(function () { if (d.open) d.close(); }, reduce ? 0 : 200);
  };

  lb.go = function (dir) {
    lb.i = (lb.i + dir + figs.length) % figs.length;
    lb.trigger = figs[lb.i].querySelector('.fig-open');
    lb.render();
  };

  figs.forEach(function (fig, i) {
    var btn = fig.querySelector('.fig-open');
    if (btn) btn.addEventListener('click', function () { lb.open(i, btn); });
  });

  /* ================================================================
     Keyboard
     ================================================================ */
  var stepTimer, lastStep = null, lastStepAt = 0;

  function step(dir) {
    if (!steps.length) return;
    var edge = 28, target = null, i;
    /* a press while the previous smooth scroll is still running continues from its target */
    if (lastStep && Date.now() - lastStepAt < 900) {
      target = steps[steps.indexOf(lastStep) + dir] || null;
    } else if (dir > 0) {
      for (i = 0; i < steps.length; i++) if (steps[i].getBoundingClientRect().top > edge + 6) { target = steps[i]; break; }
    } else {
      for (i = steps.length - 1; i >= 0; i--) if (steps[i].getBoundingClientRect().top < edge - 6) { target = steps[i]; break; }
    }
    if (!target) return;
    lastStep = target; lastStepAt = Date.now();
    target.classList.add('is-in');
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
    markCurrent(target);
    clearTimeout(stepTimer);
  }

  /* the keycap beside the control answers the key press */
  var keycapTimer = {};
  function pressKeycap(k) {
    qsa('.keycap[data-key="' + k + '"]').forEach(function (cap) {
      cap.classList.add('is-pressed');
      clearTimeout(keycapTimer[k]);
      keycapTimer[k] = setTimeout(function () { cap.classList.remove('is-pressed'); }, 160);
    });
  }

  function isTyping(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  function arrowsMayStep(el) {
    return !el || el === doc.body || el === doc.documentElement || el.id === 'main' ||
      el.hasAttribute('data-step') || el.classList.contains('fig-open');
  }

  doc.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    var active = doc.activeElement;
    if (isTyping(active)) return;
    var lbOpen = lb.dialog && lb.dialog.open;
    var k = e.key;

    /* numeric shortcuts, from the number row or the keypad (NumLock on):
       1 Day / Night, 2 EN → ES → IT. Ignored while held down. */
    if ((k === '1' || k === '2') && !e.repeat) {
      e.preventDefault();
      if (k === '1') toggleTheme(); else cycleLang();
      pressKeycap(k);
      return;
    }

    if (lbOpen) {
      if (k === 'ArrowRight') { e.preventDefault(); lb.go(1); }
      else if (k === 'ArrowLeft') { e.preventDefault(); lb.go(-1); }
      return; /* Escape is handled by the dialog's cancel event */
    }

    if ((k === 'Escape' || k === 'Backspace') && isProject) {
      var back = doc.querySelector('.back-link');
      if (back) { e.preventDefault(); window.location.href = back.href; }
      return;
    }

    if ((k === 'ArrowRight' || k === 'ArrowLeft') && active && active.classList.contains('fig-open')) {
      var buttons = qsa('.fig-open'), at = buttons.indexOf(active);
      var next = buttons[(at + (k === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length];
      e.preventDefault();
      next.focus({ preventScroll: true });
      next.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
      return;
    }

    if (k === 'j' || k === 'J') { e.preventDefault(); step(1); return; }
    if (k === 'k' || k === 'K') { e.preventDefault(); step(-1); return; }
    if ((k === 'ArrowDown' || k === 'ArrowUp') && arrowsMayStep(active)) {
      e.preventDefault();
      step(k === 'ArrowDown' ? 1 : -1);
    }
  });

  /* ================================================================
     Copy email
     ================================================================ */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }
  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = doc.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      doc.body.appendChild(ta); ta.select();
      try { doc.execCommand('copy') ? resolve() : reject(); } catch (err) { reject(err); }
      doc.body.removeChild(ta);
    });
  }
  qsa('.copy-email').forEach(function (btn) {
    var badge = btn.parentNode.querySelector('.copy-badge'), timer;
    btn.addEventListener('click', function () {
      var show = function (text, ms) {
        badge.textContent = text;
        badge.classList.add('is-on');
        clearTimeout(timer);
        timer = setTimeout(function () {
          badge.classList.remove('is-on');
          setTimeout(function () { badge.textContent = ''; }, 250);
        }, ms);
      };
      copyText(btn.getAttribute('data-email')).then(
        function () { show(uiText('copied'), 1800); },
        function () { show(btn.getAttribute('data-email'), 6000); } /* copying blocked: show the address instead */
      );
    });
  });

  /* ================================================================
     Reveal on scroll
     ================================================================ */
  var revealables = qsa('.block, .hero, .gallery-block');
  if ('IntersectionObserver' in window && !reduce) {
    var vh = window.innerHeight;
    revealables.forEach(function (el) { if (el.getBoundingClientRect().top < vh) el.classList.add('is-in'); });
    root.classList.add('js');
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); reveal.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    revealables.forEach(function (el) { if (!el.classList.contains('is-in')) reveal.observe(el); });
  }

  /* ================================================================
     Media: honour reduced motion; show a note if a file is missing
     ================================================================ */
  if (reduce) qsa('.mat video').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });

  doc.addEventListener('error', function (e) {
    var el = e.target;
    if (!el || (el.tagName !== 'IMG' && el.tagName !== 'VIDEO') || !el.closest('.mat') || el.__missing) return;
    el.__missing = true;
    var note = doc.createElement('span');
    note.className = 'missing';
    note.textContent = '[ missing: ' + decodeURIComponent((el.getAttribute('src') || '').split('/').pop()) + ' ]';
    el.replaceWith(note);
  }, true);

  /* ================================================================
     Start
     ================================================================ */
  setTheme(root.getAttribute('data-theme'), false, false);
  setLang(lang, false);
})();
