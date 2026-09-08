/* Shoukat Ali Piracha — portfolio interactions
   Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Sticky header shadow ────────────────────────── */
  var header = $('#siteHeader');
  var onScroll = function () {
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile navigation ───────────────────────────── */
  var navToggle = $('#navToggle');
  var siteNav = $('#siteNav');

  var setNav = function (open) {
    navToggle.setAttribute('aria-expanded', String(open));
    siteNav.classList.toggle('is-open', open);
  };

  navToggle.addEventListener('click', function () {
    setNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  siteNav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setNav(false);
      navToggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 780) setNav(false);
  });

  /* ── Hero role cycler ────────────────────────────── */
  var cycler = $('#cycler');
  if (cycler && !reduceMotion) {
    var words = cycler.dataset.words.split('|');
    var i = 0;
    setInterval(function () {
      cycler.classList.add('is-out');
      setTimeout(function () {
        i = (i + 1) % words.length;
        cycler.textContent = words[i];
        cycler.classList.remove('is-out');
      }, 300);
    }, 2800);
  }

  /* ── Lens filter ─────────────────────────────────── */
  var lensBtns = $$('.lens-btn');
  var taggable = $$('[data-tags]');
  var lensHint = $('#lensHint');

  var HINTS = {
    all:       "Everything is shown. Pick a focus to see what's most relevant.",
    ops:       'Highlighting operations and finance work — Kassam, Runwei, and budget ownership.',
    gtm:       'Highlighting go-to-market work — creator sourcing, outreach, and partnership pipelines.',
    analytics: 'Highlighting analysis work — survey data, KPI reporting, and econometric research.',
    projects:  'Highlighting independent and team-built projects.'
  };

  var applyLens = function (lens) {
    taggable.forEach(function (el) {
      var match = lens === 'all' || el.dataset.tags.split(/\s+/).indexOf(lens) > -1;
      el.classList.toggle('is-dimmed', !match);
    });
    lensBtns.forEach(function (b) {
      var on = b.dataset.lens === lens;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    lensHint.textContent = HINTS[lens] || HINTS.all;
  };

  lensBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { applyLens(btn.dataset.lens); });
  });

  /* Arrow-key navigation across the lens group */
  var lensGroup = $('.lens-options');
  if (lensGroup) {
    lensGroup.addEventListener('keydown', function (e) {
      var idx = lensBtns.indexOf(document.activeElement);
      if (idx < 0) return;
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % lensBtns.length;
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   next = (idx - 1 + lensBtns.length) % lensBtns.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End')  next = lensBtns.length - 1;
      if (next === null) return;
      e.preventDefault();
      lensBtns[next].focus();
    });
  }

  /* ── Metric disclosures ──────────────────────────── */
  $$('.metric-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      $('#' + btn.getAttribute('aria-controls')).hidden = open;
    });
  });

  /* ── Experience accordion ────────────────────────── */
  $$('.role-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var role = btn.closest('.role');
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      role.classList.toggle('is-open', !open);
    });
  });

  /* ── Skill → experience map ──────────────────────── */
  var chips = $$('button.chip[data-skill]');
  var skillStatus = $('#skillStatus');

  var clearSkill = function () {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
    $$('.is-linked-match').forEach(function (el) { el.classList.remove('is-linked-match'); });
    skillStatus.textContent = '';
  };

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var wasOn = chip.getAttribute('aria-pressed') === 'true';
      clearSkill();
      if (wasOn) return;

      chip.setAttribute('aria-pressed', 'true');
      var key = chip.dataset.skill;
      var hits = $$('[data-skills~="' + key + '"]');
      hits.forEach(function (el) { el.classList.add('is-linked-match'); });

      var names = hits.map(function (el) {
        var t = el.querySelector('.role-co, .project-title');
        return t ? t.childNodes[0].textContent.trim() : '';
      }).filter(Boolean);

      skillStatus.textContent = names.length
        ? chip.textContent.trim() + ' — used at ' + names.join(', ') + '.'
        : '';

      if (hits.length && window.innerWidth <= 780) {
        hits[0].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
  });

  /* ── 544K scale visualisation ────────────────────── */
  var grid = $('#dotgrid');
  if (grid) {
    var frag = document.createDocumentFragment();
    for (var d = 0; d < 544; d++) frag.appendChild(document.createElement('i'));
    grid.appendChild(frag);
  }

  /* ── Scroll reveals + dot grid trigger ───────────── */
  var revealables = $$('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    revealables.forEach(function (el) { io.observe(el); });

    if (grid) {
      var gio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-on');
          gio.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      gio.observe(grid);
    }
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
    if (grid) grid.classList.add('is-on');
  }

  /* ── Scrollspy ───────────────────────────────────── */
  var navLinks = $$('.nav-list a');
  var sections = navLinks
    .map(function (a) { return $(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Video intro ─────────────────────────────────────
     The section ships hidden and only appears once the browser
     confirms the file is playable, so a missing or unsupported
     video never leaves a broken player on the page. */
  var introSection = $('#intro');
  var introVideo = $('#introVideo');

  if (introSection && introVideo) {
    var showIntro = function () {
      if (!introSection.hidden) return;
      introSection.hidden = false;
      /* The reveal observer already ran while this was hidden. */
      $$('.reveal', introSection).forEach(function (el) {
        el.classList.add('is-visible');
      });
    };
    introVideo.addEventListener('loadedmetadata', showIntro);
    introVideo.addEventListener('canplay', showIntro);
    if (introVideo.readyState >= 1) showIntro();
  }

  /* ── 30-second version dialog ────────────────────── */
  var dlg = $('#tldr');
  var opener = null;

  var openTldr = function (trigger) {
    opener = trigger;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  };

  var closeTldr = function () {
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
    if (opener) opener.focus();
  };

  $$('.js-open-tldr').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setNav(false);
      openTldr(btn);
    });
  });

  $('#tldrClose').addEventListener('click', closeTldr);
  $('#tldrBack').addEventListener('click', closeTldr);

  /* Click on the backdrop closes it */
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) closeTldr();
  });

  /* Native Esc close still needs focus returned */
  dlg.addEventListener('close', function () {
    if (opener) opener.focus();
  });
})();
