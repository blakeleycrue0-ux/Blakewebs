(() => {
  'use strict';

  const html = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 860;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, n) => a + (b - a) * n;

  /* ================= Word split (hero, preserves nested tags like <em>) ================= */
  function splitWords(el) {
    let wordIndex = 0;
    function wrapText(text) {
      const frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach(part => {
        if (part === '') return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const outer = document.createElement('span');
        outer.className = 'word';
        const inner = document.createElement('span');
        inner.className = 'word-inner';
        inner.style.setProperty('--i', wordIndex++);
        inner.textContent = part;
        outer.appendChild(inner);
        frag.appendChild(outer);
      });
      return frag;
    }
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) return wrapText(node.textContent);
      if (node.nodeType === Node.ELEMENT_NODE) {
        const clone = node.cloneNode(false);
        Array.from(node.childNodes).forEach(child => clone.appendChild(processNode(child)));
        const frag = document.createDocumentFragment();
        frag.appendChild(clone);
        return frag;
      }
      return document.createDocumentFragment();
    }
    const children = Array.from(el.childNodes);
    el.textContent = '';
    children.forEach(child => el.appendChild(processNode(child)));
  }
  document.querySelectorAll('[data-split-words]').forEach(splitWords);

  /* ================= Loader ================= */
  const loader = document.getElementById('loader');
  const loaderFill = loader.querySelector('.loader-bar-fill');
  const loaderPct = loader.querySelector('.loader-pct');

  function finishLoad() {
    body.classList.remove('is-loading');
    loader.classList.add('is-hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => body.classList.add('is-loaded'));
    });
    setTimeout(() => { loader.style.display = 'none'; }, 1600);
  }

  if (reduceMotion) {
    loaderFill.style.width = '100%';
    loaderPct.textContent = '100%';
    setTimeout(finishLoad, 200);
  } else {
    let progress = 0;
    const target = { v: 0 };
    const tick = () => {
      progress = clamp(progress + (target.v > progress ? (target.v - progress) * 0.12 + 0.6 : 0), 0, 100);
      loaderFill.style.width = progress + '%';
      loaderPct.textContent = Math.round(progress) + '%';
      if (progress < 99.3) requestAnimationFrame(tick);
      else {
        loaderFill.style.width = '100%';
        loaderPct.textContent = '100%';
        setTimeout(finishLoad, 280);
      }
    };
    target.v = 70;
    requestAnimationFrame(tick);
    window.addEventListener('load', () => { target.v = 100; }, { once: true });
    setTimeout(() => { target.v = 100; }, 1800);
  }

  /* =================
     Smooth scroll with inertia.
     Content stays in normal document flow (real window.scrollY) so that
     IntersectionObserver, scrollIntoView and position:fixed keep working
     natively — only the wheel gesture is intercepted and eased toward a
     lerped target, instead of decoupling paint from scroll via a fixed
     transformed layer (which breaks viewport-intersection geometry).
     ================= */
  let scrollTarget = window.scrollY;
  let scrollCurrent = window.scrollY;
  let scrollVelocity = 0;
  let lastY = window.scrollY;
  const customScroll = !isTouch && !reduceMotion;

  function maxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  if (customScroll) {
    window.addEventListener('wheel', (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      scrollTarget = clamp(scrollTarget + e.deltaY, 0, maxScroll());
    }, { passive: false });

    window.addEventListener('scroll', () => {
      if (Math.abs(window.scrollY - scrollCurrent) > 2) {
        scrollTarget = window.scrollY;
        scrollCurrent = window.scrollY;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      scrollTarget = clamp(scrollTarget, 0, maxScroll());
    });
  }

  /* ================= Header ================= */
  const header = document.querySelector('[data-header]');

  /* ================= Mobile menu ================= */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  let menuOpen = false;
  function setMenu(open) {
    menuOpen = open;
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', () => setMenu(!menuOpen));
    mobileNav.querySelectorAll('[data-menu-link]').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) setMenu(false);
    });
  }

  /* ================= Marquee (declared here, ticked in main loop) ================= */
  const marqueeTrack = document.querySelector('[data-marquee-track]');
  let marqueeX = 0;
  let marqueeGroupWidth = 0;
  function measureMarquee() {
    if (marqueeTrack) marqueeGroupWidth = marqueeTrack.children[0].offsetWidth;
  }
  measureMarquee();
  window.addEventListener('resize', measureMarquee);

  /* ================= Parallax blobs ================= */
  const blobs = document.querySelectorAll('.blob');

  function mainTick() {
    if (customScroll) {
      scrollCurrent = lerp(scrollCurrent, scrollTarget, 0.09);
      if (Math.abs(scrollTarget - scrollCurrent) < 0.05) scrollCurrent = scrollTarget;
      if (Math.abs(window.scrollY - scrollCurrent) > 0.4) window.scrollTo(0, scrollCurrent);
    }
    scrollVelocity = window.scrollY - lastY;
    lastY = window.scrollY;

    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    if (!isTouch && !reduceMotion) {
      blobs.forEach((blob, i) => {
        const speed = i === 0 ? 0.08 : -0.06;
        blob.style.translate = `0 ${window.scrollY * speed}px`;
      });
    }

    if (marqueeTrack && !reduceMotion) {
      const base = 0.6;
      const boost = clamp(Math.abs(scrollVelocity) * 0.5, 0, 4);
      marqueeX -= (base + boost);
      if (marqueeGroupWidth && marqueeX <= -marqueeGroupWidth) marqueeX += marqueeGroupWidth;
      marqueeTrack.style.transform = `translate3d(${marqueeX}px,0,0)`;
    }

    requestAnimationFrame(mainTick);
  }
  requestAnimationFrame(mainTick);

  /* ================= Anchor smooth navigation ================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = clamp(target.getBoundingClientRect().top + window.scrollY - 84, 0, maxScroll());
      if (customScroll) {
        scrollTarget = y;
      } else {
        window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ================= Custom cursor ================= */
  if (!isTouch) {
    body.classList.add('has-custom-cursor');
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    function ringTick() {
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(ringTick);
    }
    requestAnimationFrame(ringTick);

    document.querySelectorAll('[data-cursor], .pack-card, .feature-card').forEach(el => {
      el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });
  }

  /* ================= Scroll reveals (IntersectionObserver) ================= */
  const revealTargets = document.querySelectorAll('[data-reveal-clip], [data-reveal-fade], .divider');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ================= SVG line draw ================= */
  document.querySelectorAll('[data-draw-line]').forEach(svg => {
    const shapes = svg.querySelectorAll('path, line');
    shapes.forEach(shape => {
      let len = 1000;
      try { len = shape.getTotalLength(); } catch (err) { /* not rendered yet (e.g. hidden on mobile) */ }
      shape.style.strokeDasharray = len;
      shape.style.strokeDashoffset = len;
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          shapes.forEach(shape => { shape.style.strokeDashoffset = '0'; });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    obs.observe(svg);
  });

  /* ================= Count-up ================= */
  document.querySelectorAll('[data-countup]').forEach(el => {
    const targetVal = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        if (reduceMotion) { el.textContent = targetVal; return; }
        const start = performance.now();
        function step(now) {
          const p = clamp((now - start) / duration, 0, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(targetVal * eased);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    obs.observe(el);
  });

  /* ================= Magnetic buttons ================= */
  if (!isTouch) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      let bounds;
      btn.addEventListener('mouseenter', () => { bounds = btn.getBoundingClientRect(); });
      btn.addEventListener('mousemove', (e) => {
        if (!bounds) bounds = btn.getBoundingClientRect();
        const relX = e.clientX - bounds.left - bounds.width / 2;
        const relY = e.clientY - bounds.top - bounds.height / 2;
        btn.style.transform = `translate(${relX * 0.28}px, ${relY * 0.38}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ================= 3D tilt + glow on cards ================= */
  if (!isTouch) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      let bounds;
      card.addEventListener('mouseenter', () => { bounds = card.getBoundingClientRect(); });
      card.addEventListener('mousemove', (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const px = (e.clientX - bounds.left) / bounds.width;
        const py = (e.clientY - bounds.top) / bounds.height;
        const rotY = (px - 0.5) * 14;
        const rotX = (0.5 - py) * 14;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ================= Hero canvas particles ================= */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const count = isTouch ? 26 : 52;
    let pointer = { x: null, y: null };

    function resizeCanvas() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }
    function initParticles() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    }
    resizeCanvas();
    initParticles();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) * window.devicePixelRatio;
      pointer.y = (e.clientY - rect.top) * window.devicePixelRatio;
    });

    const maxDist = 130 * window.devicePixelRatio;
    function drawParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (pointer.x !== null) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist * 1.4 && d > 0) {
            p.x += (dx / d) * 0.15;
            p.y += (dy / d) * 0.15;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124,92,255,0.55)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.16 * (1 - d / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    requestAnimationFrame(drawParticles);
  }

})();
