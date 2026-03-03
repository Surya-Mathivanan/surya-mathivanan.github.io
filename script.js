/* ============================================================
   SURYA MATHIVANAN PORTFOLIO — script.js (CLEAN REWRITE)
   - Fixed: duplicate keydown listeners merged into one
   - Fixed: duplicate form submit listeners removed
   - Added: EmailJS for real email sending
   - Added: Page loader, typing animation, back-to-top
   - Added: Certifications injection, hero banner hide/show
   ============================================================ */

// ── DOM Refs ─────────────────────────────────────────────────
const searchInput       = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const backButton        = document.getElementById('backButton');
const mainGrid          = document.getElementById('mainGrid');
const heroBanner        = document.getElementById('heroBanner');
const gridItems         = document.querySelectorAll('.grid-item');
const expandedViews     = document.querySelectorAll('.expanded-view');
const suggestionItems   = document.querySelectorAll('.suggestion-item');
const mobileMenuToggle  = document.getElementById('mobileMenuToggle');
const mobileNav         = document.getElementById('mobileNav');
const mobileNavOverlay  = document.getElementById('mobileNavOverlay');
const mobileNavClose    = document.getElementById('mobileNavClose');
const mobileNavItems    = document.querySelectorAll('.mobile-nav-item');
const backToTop         = document.getElementById('backToTop');

// ── State ─────────────────────────────────────────────────────
let isOnHomePage = true;

// ── Page Loader ──────────────────────────────────────────────
const loader = document.getElementById('page-loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 600);
});

// ── EmailJS Init ─────────────────────────────────────────────
// Replace with your actual EmailJS Public Key from https://www.emailjs.com/
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

// ── Typing Animation (Hero Banner) ───────────────────────────
const roles = [
  'AI & Data Science Student',
  'Full Stack Developer',
  'MERN Stack Engineer',
  'Problem Solver · 850+ DSA',
  'Open Source Contributor',
];
const typedEl = document.getElementById('typedRole');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeRole() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  if (deleting) {
    typedEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeRole, 500); return; }
    setTimeout(typeRole, 40);
  } else {
    typedEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(typeRole, 1800); return; }
    setTimeout(typeRole, 80);
  }
}
setTimeout(typeRole, 1000);

// ── Certifications Injection into About ──────────────────────
function injectCertifications() {
  const aboutContent = document.querySelector('#aboutView .expanded-content');
  if (!aboutContent || aboutContent.querySelector('.cert-section')) return;

  const certs = [
    { icon: 'fa-award',    color: '#00d4ff', title: 'Software Engineering Fundamentals', org: 'Infosys Springboard' },
    { icon: 'fa-brain',    color: '#a855f7', title: 'Machine Learning & AI',            org: 'Coursera (Google)' },
    { icon: 'fa-chart-bar',color: '#00ff88', title: 'Data Analytics',                   org: 'Altair Certification' },
    { icon: 'fa-globe',    color: '#ff6b35', title: 'Full Stack Web Development',        org: 'Coursera / Self-study' },
    { icon: 'fa-trophy',   color: '#ff2d78', title: '6+ National Hackathons',            org: 'Participant & Contributor' },
    { icon: 'fa-code',     color: '#ffa657', title: '850+ Coding Problems',              org: 'LeetCode · CodeChef · Learnlogicify' },
  ];

  const section = document.createElement('div');
  section.className = 'cert-section';
  section.innerHTML = `
    <h2 class="cert-heading"><i class="fas fa-certificate"></i> Certifications & Achievements</h2>
    <div class="cert-grid">
      ${certs.map(c => `
        <div class="cert-card">
          <div class="cert-icon" style="color:${c.color}"><i class="fas ${c.icon}"></i></div>
          <div class="cert-info"><h4>${c.title}</h4><p>${c.org}</p></div>
        </div>`).join('')}
    </div>`;
  aboutContent.appendChild(section);
}

// ── Hero Banner visibility ────────────────────────────────────
function showHeroBanner() { if (heroBanner) heroBanner.classList.remove('hidden'); }
function hideHeroBanner() { if (heroBanner) heroBanner.classList.add('hidden'); }

// ── Section Navigation ────────────────────────────────────────
function showSection(section) {
  if (section === 'home') { goToHome(); return; }

  const targetView = document.getElementById(section + 'View');
  if (!targetView) return;

  expandedViews.forEach(v => v.classList.remove('active'));
  isOnHomePage = false;
  mainGrid.style.display = 'none';
  hideHeroBanner();
  targetView.classList.add('active');
  backButton.style.display = 'block';
  searchSuggestions.style.display = 'none';

  // Inject certs on first About open
  if (section === 'about') injectCertifications();

  // Skill bar animation
  if (section === 'skills') {
    setTimeout(() => {
      document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.animation = 'fillBar 1s ease-in-out';
      });
    }, 300);
  }

  // Scroll to top of expanded view
  targetView.scrollTop = 0;
}

function goToHome() {
  isOnHomePage = true;
  expandedViews.forEach(v => v.classList.remove('active'));
  mainGrid.style.display = 'grid';
  showHeroBanner();
  backButton.style.display = 'none';
  searchInput.value = '';
  searchSuggestions.style.display = 'none';
  backToTop.classList.remove('visible');
}

// ── Back Button ───────────────────────────────────────────────
backButton.addEventListener('click', goToHome);

// ── Grid Interactions ─────────────────────────────────────────
gridItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    if (!isOnHomePage) return;
    gridItems.forEach(other => { if (other !== item) other.classList.add('blurred'); });
  });
  item.addEventListener('mouseleave', () => {
    if (!isOnHomePage) return;
    gridItems.forEach(other => other.classList.remove('blurred'));
  });
  item.addEventListener('click', () => {
    if (!isOnHomePage) return;
    showSection(item.dataset.section);
  });
});

// Grid load animation
window.addEventListener('load', () => {
  gridItems.forEach((item, i) => {
    item.style.animation = `fadeInUp 0.5s ease ${i * 0.08}s both`;
  });
});

// ── Search ────────────────────────────────────────────────────
searchInput.addEventListener('input', function () {
  if (!isOnHomePage) return;
  const q = this.value.toLowerCase();
  if (q.length > 0) {
    searchSuggestions.style.display = 'block';
    suggestionItems.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? 'block' : 'none';
    });
  } else {
    searchSuggestions.style.display = 'none';
  }
});

suggestionItems.forEach(item => {
  item.addEventListener('click', () => {
    if (!isOnHomePage) return;
    showSection(item.dataset.section);
    searchInput.value = '';
    searchSuggestions.style.display = 'none';
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-container')) searchSuggestions.style.display = 'none';
});

// ── Mobile Nav ────────────────────────────────────────────────
function closeMobileNav() {
  mobileNav.classList.remove('active');
  mobileNavOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

mobileMenuToggle.addEventListener('click', () => {
  mobileNav.classList.add('active');
  mobileNavOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});
mobileNavClose.addEventListener('click', closeMobileNav);
mobileNavOverlay.addEventListener('click', closeMobileNav);

mobileNavItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const section = item.dataset.section;
    if (section === 'home') { goToHome(); }
    else if (section) { showSection(section); }
    closeMobileNav();
  });
});

window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMobileNav(); });

// ── Unified Keyboard Handler (single listener — fixes bug) ────
document.addEventListener('keydown', e => {
  // Escape: close mobile nav → then go home
  if (e.key === 'Escape') {
    if (mobileNav.classList.contains('active')) {
      closeMobileNav();
    } else if (!isOnHomePage) {
      goToHome();
    }
    const visibleMsg = document.querySelector('.response-message[style*="block"]');
    if (visibleMsg) hideMessage(visibleMsg);
  }

  // Enter in form: tab to next field
  if (e.key === 'Enter' && e.target.matches('.form-input:not([type="submit"])')) {
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll('.form-input, .form-textarea'));
    const next = inputs[inputs.indexOf(e.target) + 1];
    if (next) next.focus();
    else { const btn = document.querySelector('.submit-btn'); if (btn) btn.focus(); }
  }
});

// ── Back to Top ───────────────────────────────────────────────
expandedViews.forEach(view => {
  view.addEventListener('scroll', () => {
    if (view.scrollTop > 300) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  });
});

backToTop.addEventListener('click', () => {
  const activeView = document.querySelector('.expanded-view.active');
  if (activeView) activeView.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Contact Form — EmailJS ────────────────────────────────────
function initFormHandler() {
  const contactForm   = document.getElementById('contactForm');
  const responseMsg   = document.getElementById('responseMessage');
  const submitBtn     = document.querySelector('.submit-btn');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    showLoadingState(submitBtn);

    const params = {
      from_name:  `${document.getElementById('firstName').value.trim()} ${document.getElementById('lastName').value.trim()}`,
      from_email: document.getElementById('email').value.trim(),
      subject:    document.getElementById('subject').value.trim(),
      message:    document.getElementById('message').value.trim(),
    };

    try {
      // ⚠️ Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS values
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params);
      showSuccessMessage(responseMsg);
      resetForm(contactForm, submitBtn);
    } catch (err) {
      console.error('EmailJS error:', err);
      showErrorMessage(responseMsg, 'Failed to send. Please email me directly at kit26.ad59@gmail.com');
      resetButton(submitBtn);
    }
  });
}

// ── Form Helpers ──────────────────────────────────────────────
function initFormValidation() {
  document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('focus', () => clearFieldValidation(input));
  });
}

function validateForm() {
  return ['firstName','lastName','email','subject','message']
    .map(id => validateField(document.getElementById(id)))
    .every(Boolean);
}

function validateField(field) {
  if (!field) return true;
  const value = field.value.trim();
  let ok = true, msg = '';
  if (!value) { msg = 'This field is required'; ok = false; }
  else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { msg = 'Enter a valid email'; ok = false; }
  else if (field.type === 'text' && value.length < 2) { msg = 'At least 2 characters'; ok = false; }
  else if (field.tagName === 'TEXTAREA' && value.length < 10) { msg = 'At least 10 characters'; ok = false; }

  if (ok) { field.style.borderColor = 'var(--neon-green)'; removeFieldError(field); }
  else     { field.style.borderColor = 'var(--neon-pink)';  showFieldError(field, msg); }
  return ok;
}

function showFieldError(field, msg) {
  removeFieldError(field);
  const div = document.createElement('div');
  div.className = 'field-error';
  div.textContent = msg;
  field.parentNode.appendChild(div);
}
function removeFieldError(field) {
  const e = field.parentNode.querySelector('.field-error');
  if (e) e.remove();
}
function clearFieldValidation(field) {
  field.style.borderColor = '';
  removeFieldError(field);
}

function showLoadingState(btn) {
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
}
function resetButton(btn) {
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  btn.disabled = false;
}
function showSuccessMessage(el) {
  el.className = 'response-message success';
  el.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! I\'ll get back to you soon.';
  el.style.display = 'block';
  setTimeout(() => hideMessage(el), 6000);
}
function showErrorMessage(el, msg) {
  el.className = 'response-message error';
  el.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
  el.style.display = 'block';
  setTimeout(() => hideMessage(el), 8000);
}
function hideMessage(el) {
  el.style.opacity = '0';
  setTimeout(() => { el.style.display = 'none'; el.style.opacity = '1'; }, 300);
}
function resetForm(form, btn) {
  form.reset();
  resetButton(btn);
  form.querySelectorAll('.form-input, .form-textarea').forEach(clearFieldValidation);
  // Clear localStorage saved data
  ['firstName','lastName','email','subject','message'].forEach(id => localStorage.removeItem(`contact_${id}`));
}

// ── Auto-save contact form ────────────────────────────────────
function initAutoSave() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    const saved = localStorage.getItem(`contact_${input.id}`);
    if (saved) input.value = saved;
    input.addEventListener('input', () => localStorage.setItem(`contact_${input.id}`, input.value));
  });
}

try {
  localStorage.setItem('_test', '1');
  localStorage.removeItem('_test');
  initAutoSave();
} catch (_) {}

// ── Social Link Tracking ──────────────────────────────────────
function initSocialLinkTracking() {
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
      link.style.transform = 'scale(0.92)';
      setTimeout(() => link.style.transform = '', 150);
    });
  });
}

// ── Scroll Animations (IntersectionObserver) ──────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.5s ease both';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.skill-category, .project-card, .education-item, .cert-card, .stat-item').forEach(el => obs.observe(el));
}

// ── Stats counter animation ───────────────────────────────────
function initStatsAnimation() {
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        entry.target.classList.add('animate');
        statObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-item').forEach(el => statObs.observe(el));
}

function animateCounter(statItem) {
  const el = statItem.querySelector('.stat-number');
  if (!el) return;
  const final = el.textContent;
  const isPlus = final.includes('+'), isH = final.includes('h');
  const num = parseInt(final.replace(/\D/g, ''));
  if (isNaN(num)) return;
  let cur = 0;
  const inc = num / 30, step = 1000 / 30;
  const timer = setInterval(() => {
    cur += inc;
    if (cur >= num) { cur = num; clearInterval(timer); }
    el.textContent = Math.floor(cur) + (isPlus ? '+' : '') + (isH ? 'h' : '');
  }, step);
}

// ── Info block slide-in ───────────────────────────────────────
function initInfoBlocks() {
  document.querySelectorAll('.info-block').forEach((block, i) => {
    block.style.opacity = '0';
    block.style.transform = 'translateX(-16px)';
    block.style.transition = `all 0.5s ease ${i * 0.1}s`;
    setTimeout(() => {
      block.style.opacity = '1';
      block.style.transform = 'translateX(0)';
    }, 600 + i * 100);
  });
}

// ── Resume Popup ──────────────────────────────────────────────
function initResumePopup() {
  const popup   = document.getElementById('resume-popup');
  const closeBtn = document.getElementById('close-popup');
  if (!popup || !closeBtn) return;

  closeBtn.addEventListener('click', () => popup.style.display = 'none');
  setTimeout(() => { popup.style.display = 'flex'; }, 5000);
}

// ── Reduce-motion support ─────────────────────────────────────
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--trans', 'none');
  document.documentElement.style.setProperty('--trans-slow', 'none');
}

// ── Lazy-load map ─────────────────────────────────────────────
function initLazyMap() {
  const mc = document.querySelector('.map-container');
  if (!mc) return;
  const iframe = mc.querySelector('iframe');
  if (!iframe) return;
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { /* map already has src, just ensure loaded */ }
    });
  }).observe(mc);
}

// ── Init all ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFormHandler();
  initFormValidation();
  initScrollAnimations();
  initStatsAnimation();
  initSocialLinkTracking();
  initInfoBlocks();
  initLazyMap();
  initResumePopup();
  typeRole();
});
