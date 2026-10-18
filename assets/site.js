/* =====================================================================
   TACTILE CURATION — interactive layer
   - every work gets its own colour; the page's light shifts to it as you scroll
   - a field of coloured light that drifts, follows the cursor and leaves a trail
   - click or tap anywhere to send out a ripple of light
   - holographic foil on the big title wherever the cursor passes
   - a tracking reticle that "locks on" to each section (desktop only)
   - image previews when hovering project titles (data-preview="media/…")
   - sections fade in as you scroll; numbers "decode" when they become active
   - progress line at the top, current-section readout bottom-left
   - click any image to see it full size
   ===================================================================== */
(function () {
  if (window.__tcInit) return;
  window.__tcInit = true;

  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  root.classList.add('tc-js');

  /* lime, magenta, electric blue, marigold, turquoise, violet, vermilion */
  var PALETTE = ['#c9ff2e', '#ff3ea5', '#4d7cff', '#ffb627', '#19e3c4', '#a45cff', '#ff4d3d'];

  var light, ctx, progress, hud, gaze, gazeLabel, preview, previewImg, previewLabel;
  var mouse = { x: -999, y: -999, on: false }, pos = { x: -999, y: -999 };
  var lockedBlock = null, revealObs, currentObs;
  var accent = hexToRgb(PALETTE[0]), target = hexToRgb(PALETTE[0]);

  function hexToRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a + ')'; }
  function pad(n, l) { n = String(Math.max(0, Math.round(n))); while (n.length < l) n = '0' + n; return n; }

  function make(tag, cls, html) {
    var d = doc.createElement(tag);
    d.className = cls;
    if (html) d.innerHTML = html;
    doc.body.appendChild(d);
    return d;
  }

  function buildChrome() {
    if (progress || !doc.body) return;
    light = make('canvas', 'tc-light');
    ctx = light.getContext('2d');
    sizeLight();
    progress = make('div', 'tc-progress');
    hud = make('div', 'tc-hud');
    if (fine) {
      gaze = make('div', 'tc-gaze is-hidden', '<span class="tc-gaze-label"></span>');
      gazeLabel = gaze.firstChild;
      preview = make('div', 'tc-preview', '<div class="tc-preview-img"></div><div class="tc-preview-label"></div>');
      previewImg = preview.children[0];
      previewLabel = preview.children[1];
    }
  }

  function titleOf(block) {
    var t = block.querySelector('.category, .category-link');
    return t ? t.textContent.replace(/[↗→]/g, '').trim() : '';
  }
  function indexOf(block) {
    var i = block.querySelector('.index');
    return i ? (i.getAttribute('data-final') || i.textContent).trim() : '';
  }
  function colorOf(block) { return (block && block.__tcColor) || PALETTE[0]; }

  /* --- "decode" effect on section numbers --- */
  var glyphs = '0123456789#/\\<>_=+';
  function scramble(node) {
    if (reduce || node.__tcBusy) return;
    var final = node.getAttribute('data-final') || node.textContent;
    node.setAttribute('data-final', final);
    node.__tcBusy = true;
    var frame = 0, total = 14;
    (function step() {
      frame++;
      var out = '';
      for (var i = 0; i < final.length; i++) {
        var c = final[i];
        out += (c === '.' || frame / total > (i + 1) / final.length) ? c : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      node.textContent = frame >= total ? final : out;
      if (frame < total) requestAnimationFrame(step); else node.__tcBusy = false;
    })();
  }

  function setCurrent(block) {
    var c = colorOf(block);
    root.style.setProperty('--tc-accent', c);
    target = hexToRgb(c);
  }

  /* --- wire up any new .tc content (runs again after Cargo swaps pages) --- */
  function scan() {
    buildChrome();
    var tc = doc.querySelector('.tc');
    root.classList.toggle('tc-active', !!tc);
    if (!tc) return;

    if (!revealObs && 'IntersectionObserver' in window) {
      revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); revealObs.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

      currentObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) { e.target.classList.remove('is-current'); return; }
          doc.querySelectorAll('.tc .is-current').forEach(function (b) { b.classList.remove('is-current'); });
          e.target.classList.add('is-current');
          setCurrent(e.target);
          var idx = indexOf(e.target), all = e.target.closest('.tc').querySelectorAll('.portfolio-block').length;
          if (hud) hud.innerHTML = '<b>' + idx + '</b> / ' + pad(all, 2) + ' &nbsp;—&nbsp; ' + titleOf(e.target);
          var n = e.target.querySelector('.index');
          if (n) scramble(n);
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
    }

    /* give each section its colour (sub-pages inherit the work's colour from their index number) */
    doc.querySelectorAll('.tc').forEach(function (wrap) {
      var blocks = wrap.querySelectorAll('.portfolio-block');
      blocks.forEach(function (b, i) {
        var pick = b.getAttribute('data-color');
        if (!pick) {
          var num = parseInt(indexOf(b), 10);
          pick = PALETTE[((isNaN(num) ? i + 1 : num) - 1) % PALETTE.length];
        }
        b.__tcColor = pick;
        b.style.setProperty('--tc-accent', pick);
      });
      /* sub-page header takes the colour of its work */
      var meta = wrap.querySelector('.subpage-meta');
      if (meta && blocks[0]) setCurrent(blocks[0]);
    });

    doc.querySelectorAll('.tc .portfolio-block, .tc .media-container, .tc .media-grid').forEach(function (b) {
      if (b.__tcSeen) return;
      b.__tcSeen = true;
      if (revealObs) revealObs.observe(b); else b.classList.add('is-in');
      if (currentObs && b.classList.contains('portfolio-block')) currentObs.observe(b);
    });
    onScroll();
  }

  /* --- scroll progress --- */
  var scrollFrac = 0;
  function onScroll() {
    var max = (doc.documentElement.scrollHeight - window.innerHeight) || 1;
    scrollFrac = Math.min(1, window.scrollY / max);
    root.style.setProperty('--tc-progress', scrollFrac.toFixed(4));
    if (window.scrollY < 120) {
      var first = [].filter.call(doc.querySelectorAll('.tc .portfolio-block'), function (b) { return b.offsetParent !== null; })[0];
      if (first) setCurrent(first);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ======================= the light field ======================= */
  var SCALE = 0.25, W = 0, H = 0, trail = [], ripples = [], t0 = performance.now();
  var blobs = [
    { x: 0.18, y: 0.22, a: 0.10, s: 0.00011, r: 0.55, o: 0.19, k: 0, p: 0.35 },
    { x: 0.85, y: 0.35, a: 0.12, s: 0.00008, r: 0.50, o: 0.16, k: 1, p: 0.55 },
    { x: 0.55, y: 0.92, a: 0.14, s: 0.00006, r: 0.60, o: 0.15, k: 2, p: 0.25 },
    { x: 0.05, y: 0.80, a: 0.08, s: 0.00009, r: 0.40, o: 0.12, k: 3, p: 0.45 }
  ];
  blobs.forEach(function (b) { b.c = hexToRgb(PALETTE[b.k]); });

  function sizeLight() {
    if (!light) return;
    W = Math.max(1, Math.ceil(window.innerWidth * SCALE));
    H = Math.max(1, Math.ceil(window.innerHeight * SCALE));
    light.width = W; light.height = H;
  }
  window.addEventListener('resize', sizeLight);

  function glow(x, y, r, c, a) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(c, a));
    g.addColorStop(1, rgba(c, 0));
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  function lerpC(c, to, k) { c[0] += (to[0] - c[0]) * k; c[1] += (to[1] - c[1]) * k; c[2] += (to[2] - c[2]) * k; }

  function drawLight(now) {
    if (!ctx || !root.classList.contains('tc-active')) return;
    var t = reduce ? 0 : now - t0, m = Math.min(W, H);
    lerpC(accent, target, 0.04);

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    /* drifting pools of light: the first follows the current work's colour,
       the others take its neighbours on the palette */
    var curI = Math.max(0, PALETTE.indexOf(root.style.getPropertyValue('--tc-accent').trim()));
    blobs.forEach(function (b, i) {
      lerpC(b.c, i === 0 ? target : hexToRgb(PALETTE[(curI + b.k * 2) % PALETTE.length]), 0.02);
      var x = (b.x + Math.sin(t * b.s + i * 2) * b.a) * W;
      var y = (b.y + Math.cos(t * b.s * 1.3 + i) * b.a - (scrollFrac - 0.5) * b.p) * H;
      glow(x, y, b.r * m * 1.6, b.c, b.o);
    });

    /* the visitor's own light */
    if (mouse.on) {
      glow(pos.x * SCALE, pos.y * SCALE, m * 0.5, accent, 0.22);
      glow(pos.x * SCALE, pos.y * SCALE, m * 0.12, [255, 255, 255], 0.10);
    }

    /* trail */
    for (var i = trail.length - 1; i >= 0; i--) {
      var p = trail[i];
      p.life -= 0.018;
      if (p.life <= 0) { trail.splice(i, 1); continue; }
      glow(p.x * SCALE, p.y * SCALE, m * 0.07 * (0.6 + p.life), p.c, 0.22 * p.life);
    }

    /* ripples of light from clicks / taps */
    ctx.globalCompositeOperation = 'lighter';
    for (var j = ripples.length - 1; j >= 0; j--) {
      var r = ripples[j];
      r.life -= reduce ? 0.06 : 0.012;
      if (r.life <= 0) { ripples.splice(j, 1); continue; }
      var rad = (1 - r.life) * m * 1.4 + 2;
      ctx.lineWidth = 1.5 + r.life * 3;
      ctx.strokeStyle = rgba(r.c, 0.75 * r.life);
      ctx.beginPath();
      ctx.arc(r.x * SCALE, r.y * SCALE, rad, 0, Math.PI * 2);
      ctx.stroke();
      glow(r.x * SCALE, r.y * SCALE, rad * 0.9, r.c, 0.18 * r.life * r.life);
    }
  }

  function ripple(x, y, block) {
    var c = hexToRgb(block ? colorOf(block) : PALETTE[Math.floor(Math.random() * PALETTE.length)]);
    ripples.push({ x: x, y: y, c: c, life: 1 });
    if (ripples.length > 8) ripples.shift();
  }

  doc.addEventListener('pointerdown', function (e) {
    if (!root.classList.contains('tc-active')) return;
    ripple(e.clientX, e.clientY, e.target.closest && e.target.closest('.tc .portfolio-block'));
  }, { passive: true });

  /* --- cursor, reticle, foil title, hover previews (desktop only) --- */
  var lastTrail = 0;
  if (fine) {
    doc.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
      if (pos.x < -900) { pos.x = mouse.x; pos.y = mouse.y; }
      if (gaze) gaze.classList.remove('is-hidden');

      var now = performance.now();
      if (!reduce && now - lastTrail > 30) {
        lastTrail = now;
        trail.push({ x: e.clientX, y: e.clientY, life: 1, c: accent.slice() });
        if (trail.length > 60) trail.shift();
      }

      /* holographic foil on titles near the cursor */
      doc.querySelectorAll('.tc .portfolio-title, .tc .subpage-title').forEach(function (h) {
        var r = h.getBoundingClientRect();
        h.style.setProperty('--tc-tx', (e.clientX - r.left) + 'px');
        h.style.setProperty('--tc-ty', (e.clientY - r.top) + 'px');
        h.style.setProperty('--tc-hx', ((e.clientX / window.innerWidth) * 100).toFixed(1) + '%');
      });
    }, { passive: true });

    doc.addEventListener('mouseleave', function () {
      mouse.on = false;
      if (gaze) gaze.classList.add('is-hidden');
    });

    doc.addEventListener('mouseover', function (e) {
      if (!e.target.closest) return;
      var block = e.target.closest('.tc .portfolio-block');
      if (block !== lockedBlock) {
        lockedBlock = block;
        if (gaze) gaze.style.setProperty('--c', block ? colorOf(block) : '');
        if (block) { var n = block.querySelector('.index'); if (n) scramble(n); }
      }
      var link = e.target.closest('.tc .category-link');
      if (link && preview) {
        var src = link.getAttribute('data-preview');
        var b = link.closest('.portfolio-block');
        preview.style.setProperty('--c', colorOf(b));
        preview.classList.toggle('is-empty', !src);
        previewImg.style.backgroundImage = src ? 'url("' + src + '")' : '';
        previewLabel.innerHTML = '<b>' + (b ? indexOf(b) : '') + '</b> // ' + link.textContent.replace(/[↗→]/g, '').split(':')[0].trim();
        preview.classList.add('is-on');
      } else if (preview) {
        preview.classList.remove('is-on');
      }
    });
  }

  (function loop(now) {
    var ease = reduce ? 1 : 0.2;
    pos.x += (mouse.x - pos.x) * ease;
    pos.y += (mouse.y - pos.y) * ease;
    if (gaze) {
      gaze.style.transform = 'translate(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px)';
      gaze.classList.toggle('is-locked', !!lockedBlock);
      gazeLabel.textContent = lockedBlock
        ? 'SUBJECT ' + indexOf(lockedBlock) + ' · DETECTED'
        : 'TRACKING ' + pad(mouse.x, 4) + ',' + pad(mouse.y, 4);
    }
    if (preview) {
      var w = 300, x = mouse.x + 28, y = mouse.y + 24;
      if (x + w > window.innerWidth - 12) x = mouse.x - w - 28;
      if (y + 240 > window.innerHeight - 12) y = mouse.y - 260;
      preview.style.left = x + 'px';
      preview.style.top = y + 'px';
    }
    drawLight(now || 0);
    requestAnimationFrame(loop);
  })();

  /* --- run now, and again whenever Cargo loads a new page --- */
  var t;
  function queue() { clearTimeout(t); t = setTimeout(scan, 60); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', scan); else scan();
  new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.target.closest && m.target.closest('.tc-hud, .tc-preview, .tc-gaze, .index')) continue;
      for (var j = 0; j < m.addedNodes.length; j++) {
        if (m.addedNodes[j].nodeType === 1) { queue(); return; }
      }
    }
  }).observe(doc.documentElement, { childList: true, subtree: true });
})();

/* ---------- full-size image viewer + missing-image notice ---------- */
(function () {
  var doc = document, box;
  function open(img) {
    if (!box) {
      box = doc.createElement('div');
      box.className = 'tc-lightbox';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-label', 'Full-size image');
      box.innerHTML = '<img alt=""><p></p>';
      box.addEventListener('click', close);
      doc.body.appendChild(box);
    }
    var fig = img.closest('figure'), cap = fig && fig.querySelector('figcaption');
    box.firstChild.src = img.currentSrc || img.src;
    box.firstChild.alt = img.alt;
    box.lastChild.textContent = cap ? cap.textContent : img.alt;
    box.classList.add('is-open');
  }
  function close() { if (box) box.classList.remove('is-open'); }
  doc.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('.tc figure img');
    if (img) open(img);
  });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* if an image file is missing, show its filename instead of a broken icon */
  doc.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || !img.closest('.tc') || img.__tcMissing) return;
    img.__tcMissing = true;
    var name = decodeURIComponent((img.getAttribute('src') || '').split('/').pop());
    var ph = doc.createElement('div');
    ph.className = 'media-placeholder';
    ph.textContent = '[ missing image: media/' + name + ' ]';
    if (img.classList.contains('mark')) { img.style.display = 'none'; return; }
    if (img.classList.contains('headshot')) ph.style.height = '200px';
    img.replaceWith(ph);
  }, true);
})();
