/* =====================================================================
   TACTILE CURATION — interaction layer
   - Day / Night theme (saved; follows the system until chosen)
   - EN / ES / IT: each language has its own page; switching swaps text
     in place and moves the address bar to the matching page
   - woven-grid hero: a small generative artwork that answers the pointer
   - section rail, active navigation, footer signature of visited sections
   - index previews on hover and keyboard focus (and in view on touch)
   - keyboard: J/K or Up/Down sections, Left/Right figures, T theme,
     L language, Esc or Backspace back to the index from a project page
   - accessible lightbox (never enlarges an image beyond its own size)
   ===================================================================== */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;
  var LANGS = ['en', 'es', 'it'];
  var ACCENTS = ['teal', 'pink', 'yellow'];
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
        ['ink', 'mat', 'teal', 'pink', 'yellow', 'border-color'].forEach(function (k) { p[k] = hex(cs.getPropertyValue('--' + k)); });
        return p;
      }
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
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = rgba(p.mat, 1);
        ctx.fillRect(0, 0, W, H);

        /* light moving across a reflective surface */
        var lx = W * (0.32 + 0.22 * Math.sin(t * 0.00006)), ly = H * (0.42 + 0.2 * Math.cos(t * 0.00005));
        var g = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(W, H) * 0.65);
        var acc = p[ACCENTS[section % 3]];
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
          if (j === accentRow) { ctx.lineWidth = 1.4; ctx.strokeStyle = rgba(p.pink, 0.75); }
          else { ctx.lineWidth = weftW[j] > 0.35 ? 1.25 : 1; ctx.strokeStyle = rgba(ink, weftW[j]); }
          ctx.stroke();
        }
        for (i = 0; i < cols; i++) {
          idx = i * rows;
          ctx.beginPath();
          ctx.moveTo(X[idx], Y[idx]);
          for (j = 1; j < rows; j++) ctx.lineTo(X[idx + j], Y[idx + j]);
          if (i === accentCol) { ctx.lineWidth = 1.4; ctx.strokeStyle = rgba(p.teal, 0.85); }
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

        /* threads near the pointer take on the teal light */
        if (ptr.e > 0.02) {
          var R = 95;
          for (var band = 0; band < 3; band++) {
            var lo = band / 3, hi = (band + 1) / 3, path = new Path2D(), any = false;
            for (i = 0; i < cols - 1; i++) {
              for (j = 0; j < rows - 1; j++) {
                idx = i * rows + j;
                var w1 = near((X[idx] + X[idx + rows]) / 2, (Y[idx] + Y[idx + rows]) / 2, R);
                if (w1 > lo && w1 <= hi) { path.moveTo(X[idx], Y[idx]); path.lineTo(X[idx + rows], Y[idx + rows]); any = true; }
                var w2 = near((X[idx] + X[idx + 1]) / 2, (Y[idx] + Y[idx + 1]) / 2, R);
                if (w2 > lo && w2 <= hi) { path.moveTo(X[idx], Y[idx]); path.lineTo(X[idx + 1], Y[idx + 1]); any = true; }
              }
            }
            if (any) { ctx.lineWidth = 1.1; ctx.strokeStyle = rgba(p.teal, 0.25 + hi * 0.6); ctx.stroke(path); }
          }
        }

        /* lit intersections: small squares, the site's signature mark */
        for (var k = 0; k < lit.length; k++) {
          var L = lit[k];
          if (L.i >= cols || L.j >= rows) continue;
          idx = L.i * rows + L.j;
          var col = p[ACCENTS[(k % 5 < 3 ? section : section + 1 + (k % 2)) % 3]];
          var glow = reduce ? 0.8 : 0.55 + 0.4 * Math.sin(t * 0.0011 + L.ph);
          ctx.fillStyle = rgba(col, glow);
          ctx.fillRect(X[idx] - 2.5, Y[idx] - 2.5, 5, 5);
        }
        if (ptr.e > 0.02) {
          for (i = 0; i < cols; i++) {
            for (j = 0; j < rows; j++) {
              idx = i * rows + j;
              var n = near(X[idx], Y[idx], 70);
              if (n > 0.15) { ctx.fillStyle = rgba(p.teal, n); ctx.fillRect(X[idx] - 2, Y[idx] - 2, 4, 4); }
            }
          }
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
            var c = ACCENTS[(section + pulses.length) % 3];
            pulses.push({ j: j, x: ptr.x, dir: 1, t0: now - t0, c: c }, { j: j, x: ptr.x, dir: -1, t0: now - t0, c: c });
            if (pulses.length > 8) pulses.splice(0, 2);
          }
        });
        fig.addEventListener('pointerleave', function () { ptr.on = false; });
      }

      return {
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
     Sections: rail, navigation, signature, index states
     ================================================================ */
  var steps = qsa('[data-step]');
  var rail = doc.querySelector('.rail'), sig = doc.querySelector('.sig');
  var railCells = [], sigCells = [];
  steps.forEach(function () {
    if (rail) railCells.push(rail.appendChild(doc.createElement('i')));
    if (sig) sigCells.push(sig.appendChild(doc.createElement('i')));
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
      c.className = seen[k] ? 'c' + (k % 3) : '';
      if (k === n) c.classList.add('is-now');
    });
    var href = navMap[sectionKey(el)];
    navLinks.forEach(function (a) {
      if (href && a.getAttribute('href') === href) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    if (weave) weave.setSection(n);
  }

  if ('IntersectionObserver' in window && steps.length) {
    var currentObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) markCurrent(en.target); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    steps.forEach(function (s) { currentObs.observe(s); });
  }

  /* index: hovering or focusing a project title activates its block */
  qsa('.category-link').forEach(function (link) {
    var block = link.closest('.block');
    if (!block) return;
    var on = function () { block.classList.add('is-active'); };
    var off = function () { block.classList.remove('is-active'); };
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

    if (lbOpen) {
      if (k === 'ArrowRight') { e.preventDefault(); lb.go(1); }
      else if (k === 'ArrowLeft') { e.preventDefault(); lb.go(-1); }
      else if (k === 't' || k === 'T') toggleTheme();
      else if (k === 'l' || k === 'L') cycleLang();
      return; /* Escape is handled by the dialog's cancel event */
    }

    if (k === 't' || k === 'T') { e.preventDefault(); toggleTheme(); return; }
    if (k === 'l' || k === 'L') { e.preventDefault(); cycleLang(); return; }

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
