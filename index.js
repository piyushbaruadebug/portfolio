import Lenis from 'lenis';

// ----------------------------------------------------
// CONSTANTS & STATE
// ----------------------------------------------------
let scrollEnabled = true;
let introReady = false;

window.scrollTo(0, 0);

// Initialize Lenis with graceful fallback
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    smoothWheel: true,
    syncTouch: false
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
} else {
  lenis = {
    raf: function() {},
    stop: function() {},
    start: function() {},
    scrollTo: function(target) {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target && target.scrollIntoView) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
}

// Scroll locking helper
function stopScroll() {
  scrollEnabled = false;
  lenis.stop();
  document.documentElement.style.position = 'relative';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.height = '100%';
}

function startScroll() {
  scrollEnabled = true;
  lenis.start();
  document.documentElement.style.removeProperty('position');
  document.documentElement.style.removeProperty('overflow');
  document.documentElement.style.removeProperty('height');
}

stopScroll();

// ----------------------------------------------------
// ADAPTIVE GRID SCALE-UP (>1920px)
// ----------------------------------------------------
function applyAdaptiveGrid() {
  const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
  const w = window.innerWidth;
  const widthReduction = ((baseWidth - w) / baseWidth) * 100;
  const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
  if (size > FONT_BASE) {
    document.documentElement.style.fontSize = size + 'px';
  } else {
    document.documentElement.style.removeProperty('font-size');
  }
}
applyAdaptiveGrid();
window.addEventListener('resize', applyAdaptiveGrid);

// ----------------------------------------------------
// SMOOTH SCROLL TO HELPER
// ----------------------------------------------------
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const targetTop = el.getBoundingClientRect().top + window.pageYOffset;
  lenis.scrollTo(targetTop, { duration: 1.2 });
}

// ----------------------------------------------------
// LIVE CLOCK UPDATER
// ----------------------------------------------------
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function updateClocks() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const meridiem = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const timeStr = hours + ':' + minutesStr + meridiem;

  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const dateStr = day + ' ' + month + ', ' + year;

  const headerClockTime = document.getElementById('header-clock-time');
  const headerClockDate = document.getElementById('header-clock-date');
  const navMenuTime = document.getElementById('nav-menu-time');

  if (headerClockTime) headerClockTime.textContent = timeStr;
  if (headerClockDate) headerClockDate.textContent = dateStr;
  if (navMenuTime) navMenuTime.textContent = timeStr;
}
updateClocks();
setInterval(updateClocks, 1000);

// ----------------------------------------------------
// ABOUT STATEMENT WORD SPLIT & REVEAL SETUP
// ----------------------------------------------------
const statementEl = document.getElementById('about-word-statement');
if (statementEl) {
  const primaryText = "I'm a passionate developer with a love for creating beautiful, functional web experiences — ";
  const mutedText = "specializing in building responsive websites, modern applications, and exploring cybersecurity at GNIT.";
  
  let wordIdx = 0;
  const primaryWords = primaryText.split(' ').filter(Boolean).map(function(word) {
    const span = '<span class="word-wrap"><span class="word-inner" style="--word-delay: ' + (wordIdx * 35) + 'ms;">' + word + '</span></span>';
    wordIdx++;
    return span;
  }).join(' ');

  const mutedWords = mutedText.split(' ').filter(Boolean).map(function(word) {
    const span = '<span class="word-wrap"><span class="word-inner about-muted-text" style="--word-delay: ' + (wordIdx * 35) + 'ms;">' + word + '</span></span>';
    wordIdx++;
    return span;
  }).join(' ');

  statementEl.innerHTML = primaryWords + ' ' + mutedWords;
}

// ----------------------------------------------------
// LIQUID REVEAL HERO CANVAS
// ----------------------------------------------------
const heroContainer = document.getElementById('hero-liquid-container');
const heroCanvas = document.getElementById('hero-liquid-canvas');

const afterImg = new Image();
afterImg.src = 'hero.jpg';

let afterImgLoaded = false;
afterImg.onload = function() {
  afterImgLoaded = true;
  rebuildCover();
};

const brushRadius = 75;
const decay = 0.016;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

let mainCtx = null;
const coverCanvas = document.createElement('canvas');
const coverCtx = coverCanvas.getContext('2d');
const brushCanvas = document.createElement('canvas');
const brushCtx = brushCanvas.getContext('2d');

let canvasWidth = 0;
let canvasHeight = 0;
let lastPoint = null;
let pointsQueue = [];
let idleFrames = 0;

function resizeLiquidCanvas() {
  if (!heroContainer || !heroCanvas) return;
  const rect = heroContainer.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = Math.round(rect.width * dpr);
  canvasHeight = Math.round(rect.height * dpr);

  heroCanvas.width = canvasWidth;
  heroCanvas.height = canvasHeight;
  heroCanvas.style.width = rect.width + 'px';
  heroCanvas.style.height = rect.height + 'px';

  mainCtx = heroCanvas.getContext('2d');

  coverCanvas.width = canvasWidth;
  coverCanvas.height = canvasHeight;

  const rad = brushRadius * dpr;
  const diam = Math.ceil(rad * 2);
  brushCanvas.width = diam;
  brushCanvas.height = diam;

  rebuildCover();
}

function rebuildCover() {
  if (!afterImgLoaded || !canvasWidth || !canvasHeight) return;
  const imgRatio = afterImg.naturalWidth / afterImg.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  let dw, dh, dx, dy;

  if (canvasRatio > imgRatio) {
    dw = canvasWidth;
    dh = canvasWidth / imgRatio;
    dx = 0;
    dy = (canvasHeight - dh) / 2;
  } else {
    dh = canvasHeight;
    dw = canvasHeight * imgRatio;
    dx = (canvasWidth - dw) / 2;
    dy = 0;
  }

  coverCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  coverCtx.filter = 'grayscale(100%) contrast(1.25) brightness(1.05)';
  coverCtx.drawImage(afterImg, dx, dy, dw, dh);
  coverCtx.filter = 'none';
}

if (window.ResizeObserver && heroContainer) {
  new ResizeObserver(function() {
    resizeLiquidCanvas();
  }).observe(heroContainer);
} else {
  window.addEventListener('resize', resizeLiquidCanvas);
}
resizeLiquidCanvas();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  window.addEventListener('pointermove', function(e) {
    if (!heroContainer || !mainCtx) return;
    const rect = heroContainer.getBoundingClientRect();
    const rad = brushRadius * dpr;

    if (
      e.clientX < rect.left - rad ||
      e.clientX > rect.right + rad ||
      e.clientY < rect.top - rad ||
      e.clientY > rect.bottom + rad
    ) {
      lastPoint = null;
      return;
    }

    const cx = (e.clientX - rect.left) * dpr;
    const cy = (e.clientY - rect.top) * dpr;

    if (!lastPoint) {
      lastPoint = { x: cx, y: cy };
      pointsQueue.push(lastPoint);
      return;
    }

    const dx = cx - lastPoint.x;
    const dy = cy - lastPoint.y;
    const dist = Math.hypot(dx, dy);
    const step = Math.max(rad * 0.3, 1);
    const count = Math.min(Math.ceil(dist / step), 60);

    for (let i = 1; i <= count; i++) {
      const t = i / count;
      pointsQueue.push({
        x: lastPoint.x + dx * t,
        y: lastPoint.y + dy * t
      });
    }

    lastPoint = { x: cx, y: cy };
  });
}

function stampPoint(px, py) {
  const rad = brushRadius * dpr;
  const diam = Math.ceil(rad * 2);

  brushCtx.clearRect(0, 0, diam, diam);
  brushCtx.globalCompositeOperation = 'source-over';

  const grad = brushCtx.createRadialGradient(rad, rad, 0, rad, rad, rad);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.82)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  brushCtx.fillStyle = grad;
  brushCtx.fillRect(0, 0, diam, diam);

  brushCtx.globalCompositeOperation = 'source-in';
  brushCtx.drawImage(coverCanvas, px - rad, py - rad, diam, diam, 0, 0, diam, diam);

  mainCtx.globalCompositeOperation = 'source-over';
  mainCtx.drawImage(brushCanvas, px - rad, py - rad);
}

function tickLiquid() {
  if (mainCtx && canvasWidth && canvasHeight && !prefersReducedMotion) {
    if (pointsQueue.length > 0) {
      idleFrames = 0;
    } else {
      idleFrames++;
    }

    if (idleFrames <= 120) {
      const fade = (pointsQueue.length > 0) ? decay : Math.min(decay + idleFrames * 0.004, 0.5);
      mainCtx.globalCompositeOperation = 'destination-out';
      mainCtx.fillStyle = 'rgba(0,0,0,' + fade + ')';
      mainCtx.fillRect(0, 0, canvasWidth, canvasHeight);

      if (pointsQueue.length > 0) {
        for (let i = 0; i < pointsQueue.length; i++) {
          stampPoint(pointsQueue[i].x, pointsQueue[i].y);
        }
        pointsQueue = [];
      }

      if (idleFrames === 120) {
        mainCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      }
    }
  }
  requestAnimationFrame(tickLiquid);
}
requestAnimationFrame(tickLiquid);

// ----------------------------------------------------
// PAGE INTRO LOADER ANIMATION
// ----------------------------------------------------
const FILL_MS = 1300;
const startTime = performance.now();
const loaderFillBar = document.getElementById('loader-fill-bar');
const loaderCounterTxt = document.getElementById('loader-counter-txt');
const pageLoader = document.getElementById('page-loader');

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateLoader(now) {
  const elapsed = now - startTime;
  const t = Math.min(elapsed / FILL_MS, 1);
  const eased = easeInOutCubic(t);
  const progress = Math.round(eased * 100);

  if (loaderFillBar) loaderFillBar.style.width = progress + '%';
  if (loaderCounterTxt) {
    const padded = progress < 10 ? '00' + progress : progress < 100 ? '0' + progress : '' + progress;
    loaderCounterTxt.textContent = padded;
  }
  if (pageLoader) pageLoader.setAttribute('aria-valuenow', progress);

  if (t < 1) {
    requestAnimationFrame(animateLoader);
  } else {
    setTimeout(function() {
      if (pageLoader) pageLoader.classList.add('exit');
      setTimeout(function() {
        introReady = true;
        startScroll();
        if (pageLoader) pageLoader.style.display = 'none';

        const headerEl = document.getElementById('main-header');
        const watermarkEl = document.getElementById('hero-watermark');
        const statusEl = document.getElementById('hero-status-bar');
        const homeEl = document.getElementById('home');

        if (headerEl) headerEl.classList.add('is-ready');
        if (watermarkEl) watermarkEl.classList.add('is-ready');
        if (statusEl) statusEl.classList.add('is-ready');
        if (homeEl) homeEl.classList.add('is-revealed');
      }, 700);
    }, 100);
  }
}
requestAnimationFrame(animateLoader);

// ----------------------------------------------------
// SCROLL REVEALS
// ----------------------------------------------------
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.scroll-reveal-section').forEach(function(sec) {
    revealObserver.observe(sec);
  });
} else {
  document.querySelectorAll('.scroll-reveal-section').forEach(function(sec) {
    sec.classList.add('is-revealed');
  });
}

// ----------------------------------------------------
// STATS COUNT-UP TRIGGER
// ----------------------------------------------------
const statsGrid = document.getElementById('stats-grid');
const statItems = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function updateStatsOnScroll() {
  if (!statsGrid || statsAnimated) return;
  const rect = statsGrid.getBoundingClientRect();
  const winHeight = window.innerHeight;

  const start = winHeight;
  const end = winHeight / 2;
  const current = rect.top + rect.height / 2;

  let progress = (start - current) / (start - end);
  progress = Math.max(0, Math.min(progress, 1));

  statItems.forEach(function(item) {
    const target = parseInt(item.getAttribute('data-target'), 10);
    const suffix = item.getAttribute('data-suffix') || '';
    const currentVal = Math.round(progress * target);
    item.textContent = currentVal + suffix;
  });

  if (progress >= 1) {
    statsAnimated = true;
  }
}
window.addEventListener('scroll', updateStatsOnScroll, { passive: true });

// ----------------------------------------------------
// HERO CARD CAROUSEL
// ----------------------------------------------------
const cardItems = document.querySelectorAll('.hero-card-item');
const dashes = document.querySelectorAll('.hero-dash');
const prevBtn = document.getElementById('hero-prev-btn');
const nextBtn = document.getElementById('hero-next-btn');
const heroCard = document.getElementById('hero-carousel-card');
let currentSlide = 0;
const totalSlides = cardItems.length;

function goToSlide(newIdx, direction) {
  if (typeof direction === 'undefined') direction = 1;
  if (newIdx === currentSlide) return;
  const prevIdx = currentSlide;
  currentSlide = (newIdx + totalSlides) % totalSlides;

  cardItems.forEach(function(item, idx) {
    item.classList.remove('active', 'exit-prev', 'exit-next');
    if (idx === prevIdx) {
      item.classList.add(direction > 0 ? 'exit-next' : 'exit-prev');
    } else if (idx === currentSlide) {
      item.classList.add('active');
    }
  });

  dashes.forEach(function(dash, idx) {
    dash.classList.toggle('active', idx === currentSlide);
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    goToSlide(currentSlide - 1, -1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    goToSlide(currentSlide + 1, 1);
  });
}

if (heroCard) {
  heroCard.addEventListener('click', function(e) {
    if (!e.target.closest('button')) {
      goToSlide(currentSlide + 1, 1);
    }
  });
}

// ----------------------------------------------------
// FULLSCREEN NAV MENU OVERLAY
// ----------------------------------------------------
const navMenu = document.getElementById('nav-menu');
const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const navMenuStartBtn = document.getElementById('nav-menu-start-btn');

function openNavMenu() {
  if (!navMenu) return;
  navMenu.classList.add('open');
  stopScroll();
}

function closeNavMenu() {
  if (!navMenu) return;
  navMenu.classList.remove('open');
  const modal = document.getElementById('request-modal');
  if (!modal || !modal.classList.contains('open')) {
    startScroll();
  }
}

if (openMenuBtn) openMenuBtn.addEventListener('click', openNavMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeNavMenu);

// ----------------------------------------------------
// REQUEST MODAL (CONTACT FORM)
// ----------------------------------------------------
const requestModal = document.getElementById('request-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const contactForm = document.getElementById('contact-form');
const modalFormState = document.getElementById('modal-form-state');
const modalSuccessState = document.getElementById('modal-success-state');
const submitBtnText = document.getElementById('submit-btn-text');
const successCloseBtn = document.getElementById('success-close-btn');

function openRequestModal() {
  closeNavMenu();
  if (!requestModal) return;
  requestModal.classList.add('open');
  stopScroll();
}

function closeRequestModal() {
  if (!requestModal) return;
  requestModal.classList.remove('open');
  startScroll();

  setTimeout(function() {
    if (modalFormState) modalFormState.classList.remove('hidden');
    if (modalSuccessState) modalSuccessState.classList.remove('active');
    if (contactForm) contactForm.reset();
    if (submitBtnText) submitBtnText.textContent = 'Send Message';
  }, 300);
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeRequestModal);
if (successCloseBtn) successCloseBtn.addEventListener('click', closeRequestModal);

if (requestModal) {
  requestModal.addEventListener('click', function(e) {
    if (e.target === requestModal) {
      closeRequestModal();
    }
  });
}

const copyEmailBtn = document.getElementById('copy-email-btn');
const copyEmailLabel = document.getElementById('copy-email-label');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('piyushbarua9@gmail.com').then(function () {
        if (copyEmailLabel) copyEmailLabel.textContent = 'Copied!';
        copyEmailBtn.classList.add('copied');
        setTimeout(function () {
          if (copyEmailLabel) copyEmailLabel.textContent = 'Copy Email';
          copyEmailBtn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        window.location.href = 'mailto:piyushbarua9@gmail.com';
      });
    } else {
      window.location.href = 'mailto:piyushbarua9@gmail.com';
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const projectInput = document.getElementById('contact-project');
    const fallbackLink = document.getElementById('success-email-fallback');
    const gmailBtn = document.getElementById('success-gmail-btn');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = projectInput ? projectInput.value.trim() : '';

    const subject = encodeURIComponent('Portfolio inquiry from ' + (name || 'Visitor'));
    const body = encodeURIComponent('Hi Piyush,\n\n' + message + '\n\n—\nFrom: ' + name + '\nEmail: ' + email);

    // Direct Gmail web compose link
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=piyushbarua9@gmail.com&su=' + subject + '&body=' + body;
    // Standard mailto link
    const mailtoUrl = 'mailto:piyushbarua9@gmail.com?subject=' + subject + '&body=' + body;

    if (gmailBtn) gmailBtn.href = gmailUrl;
    if (fallbackLink) fallbackLink.href = mailtoUrl;

    // Open Gmail or default mail composer
    window.open(gmailUrl, '_blank');

    // Send background AJAX to FormSubmit
    fetch('https://formsubmit.co/ajax/piyushbarua9@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: 'New Portfolio Message from ' + (name || 'Website Visitor'),
        name: name,
        email: email,
        message: message
      })
    }).catch(function () {});

    // Transition to success state
    if (modalFormState) modalFormState.classList.add('hidden');
    if (modalSuccessState) modalSuccessState.classList.add('active');
  });
}

if (navMenuStartBtn) {
  navMenuStartBtn.addEventListener('click', function() {
    openRequestModal();
  });
}

// ----------------------------------------------------
// GLOBAL ROUTING & CLICK HANDLERS
// ----------------------------------------------------
document.addEventListener('click', function(e) {
  const targetBtn = e.target.closest('[data-target]');
  if (targetBtn) {
    const targetId = targetBtn.getAttribute('data-target');
    if (targetId) {
      closeNavMenu();
      scrollToSection(targetId);
    }
  }

  const modalBtn = e.target.closest('[data-modal="contact"]');
  if (modalBtn) {
    openRequestModal();
  }

  const brandBtn = e.target.closest('#brand-scroll-btn');
  if (brandBtn) {
    scrollToSection('home');
  }
});

window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (requestModal && requestModal.classList.contains('open')) {
      closeRequestModal();
    } else if (navMenu && navMenu.classList.contains('open')) {
      closeNavMenu();
    }
  }
});
