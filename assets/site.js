/* =====================================================================
   TACTILE CURATION — interaction layer
   - Day / Night theme (saved; follows the system until chosen)
   - EN / ES / IT language switch (saved; updates <html lang>)
   - keyboard: J/K or Up/Down step through sections, Left/Right move
     through figures, T theme, L language, Esc returns to the index
   - accessible lightbox (Enter/Space opens, arrows browse, Esc closes)
   - copy-email button, hover previews on the home index, gentle reveal
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
     Each language has its own static page (/, /es/, /it/). Switching
     swaps the text in place and moves the address bar to the matching
     page, so a reload or a shared link opens in the same language.
     ================================================================ */

  /* Pin media and language-link URLs to absolute addresses first: once the
     address bar moves to /es/ or /it/, relative paths would resolve one
     folder deeper. Page links stay relative on purpose, so they follow
     the visitor into the chosen language. */
  ['src', 'poster', 'data-full', 'data-preview'].forEach(function (name) {
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
      /* move the address bar to this page's version in that language */
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
  function setTheme(t, persist) {
    if (t !== 'day' && t !== 'night') t = 'day';
    root.setAttribute('data-theme', t);
    qsa('[data-set-theme]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-theme') === t)); });
    if (themeMeta) themeMeta.setAttribute('content', t === 'night' ? '#111110' : '#F7F6F2');
    if (persist) store('tc-theme', t);
  }
  function toggleTheme() { setTheme(root.getAttribute('data-theme') === 'night' ? 'day' : 'night', true); }

  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystem = function (e) { if (!read('tc-theme')) setTheme(e.matches ? 'night' : 'day', false); };
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
    if (t) { setTheme(t.getAttribute('data-set-theme'), true); }
  });

  /* ================================================================
     Lightbox
     ================================================================ */
  var figs = qsa('.fig');
  var lb = { dialog: null, i: 0, trigger: null };

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
    d.querySelector('.lb-close').addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.classList.contains('lb-stage')) d.close();
    });
    d.addEventListener('close', function () {
      root.classList.remove('lb-lock');
      d.querySelector('.lb-stage').innerHTML = '';
      if (lb.trigger) lb.trigger.focus();
    });
    /* keep Tab inside the viewer */
    d.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = qsa('button', d), first = f[0], last = f[f.length - 1];
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
    d.querySelector('.lb-count').textContent = 'Fig ' + fig.getAttribute('data-fig') + ' — ' + (lb.i + 1) + ' / ' + figs.length;
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
    lb.i = i; lb.trigger = trigger;
    lb.render();
    root.classList.add('lb-lock');
    if (typeof lb.dialog.showModal === 'function') lb.dialog.showModal(); else lb.dialog.setAttribute('open', '');
    lb.dialog.querySelector('.lb-close').focus();
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
  var steps = qsa('[data-step]');
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
    steps.forEach(function (s) { s.classList.remove('is-target'); });
    target.classList.add('is-target');
    clearTimeout(stepTimer);
    stepTimer = setTimeout(function () { target.classList.remove('is-target'); }, 1600);
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

  var backHref = (function () { var b = doc.querySelector('.back-link'); return b ? b.getAttribute('href') : null; })();

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
      return; /* Escape is handled by the dialog itself */
    }

    if (k === 't' || k === 'T') { e.preventDefault(); toggleTheme(); return; }
    if (k === 'l' || k === 'L') { e.preventDefault(); cycleLang(); return; }

    if (k === 'Escape' && isProject && backHref) { window.location.href = backHref; return; }

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
     Hover preview on the home index (desktop only)
     ================================================================ */
  if (finePointer && qsa('.category-link[data-preview]').length) {
    var pv = doc.createElement('div');
    pv.className = 'preview';
    pv.setAttribute('aria-hidden', 'true');
    pv.innerHTML = '<img alt=""><p></p>';
    doc.body.appendChild(pv);
    var pvImg = pv.firstChild, pvLabel = pv.lastChild;
    var mx = 0, my = 0;
    var place = function () {
      var w = 286, h = pv.offsetHeight || 230;
      var x = mx + 26, y = my + 22;
      if (x + w > window.innerWidth - 12) x = mx - w - 26;
      if (y + h > window.innerHeight - 12) y = window.innerHeight - h - 12;
      pv.style.left = Math.max(12, x) + 'px';
      pv.style.top = Math.max(12, y) + 'px';
    };
    doc.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (pv.classList.contains('is-on')) place();
    }, { passive: true });
    doc.addEventListener('mouseover', function (e) {
      var link = e.target.closest && e.target.closest('.category-link[data-preview]');
      if (!link) { pv.classList.remove('is-on'); return; }
      var block = link.closest('.block'), idx = block ? block.querySelector('.index') : null;
      pvImg.src = link.getAttribute('data-preview');
      pvLabel.textContent = (idx ? idx.textContent + ' // ' : '') + link.textContent.replace('↗', '').split(':')[0].trim();
      place();
      pv.classList.add('is-on');
    });
  }

  /* ================================================================
     Reveal on scroll + current section
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
  if ('IntersectionObserver' in window) {
    var current = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('is-current', en.isIntersecting); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    qsa('.block').forEach(function (b) { current.observe(b); });
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
  setTheme(root.getAttribute('data-theme'), false);
  setLang(lang, false);
})();
