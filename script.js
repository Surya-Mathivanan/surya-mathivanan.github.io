/* ============================================================
   SURYA MATHIVANAN PORTFOLIO — script.js
   ============================================================ */

// ── EmailJS (safe — bad key or missing SDK never halts the page) ──
try {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
  }
} catch (e) {
  console.warn('EmailJS not initialised:', e.message);
}

// ── Page Loader ──────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      animateHeroEntrance();
    }, 500);
  }, 600);
});

// ── Hero Entrance Animation ───────────────────────────────────
function animateHeroEntrance() {
  const targets = document.querySelectorAll(
    '.hero-eyebrow, .hero-name, .hero-bio, .hero-badges, .hero-cta, .hero-scroll-indicator'
  );
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 60);
    });
  });
}

// ── Reduce-motion support ─────────────────────────────────────
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--trans', 'none');
  document.documentElement.style.setProperty('--trans-slow', 'none');
}

// ── All DOM-ready code ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Drawer ──────────────────────────────────────── */
  const hamburgerBtn  = document.getElementById('hamburgerBtn');
  const mobileDrawer  = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const drawerClose   = document.getElementById('drawerClose');

  function openDrawer() {
    mobileDrawer  && mobileDrawer.classList.add('open');
    mobileOverlay && mobileOverlay.classList.add('open');
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer  && mobileDrawer.classList.remove('open');
    mobileOverlay && mobileOverlay.classList.remove('open');
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer && mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }
  if (drawerClose)   drawerClose.addEventListener('click',   closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  // Close on any drawer-link click
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeDrawer);
  });

  // Close when viewport is wide enough
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) closeDrawer();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ── Smooth scroll for anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 65;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ── Scroll: nav hide-on-down + active link + back-to-top ── */
  const mainNav   = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const sections  = document.querySelectorAll('main section[id]');

  let lastScrollY    = 0;
  let scrollTicking  = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;

        /* ── Auto-hide nav on scroll-down, reveal on scroll-up ── */
        if (mainNav) {
          if (sy > lastScrollY && sy > 80) {
            mainNav.classList.add('nav-hidden');    // scrolling DOWN
          } else {
            mainNav.classList.remove('nav-hidden'); // scrolling UP
          }
          lastScrollY = sy;
        }

        /* ── Back to top button ── */
        if (backToTop) backToTop.classList.toggle('visible', sy > 400);

        /* ── Active section in nav ── */
        let current = '';
        sections.forEach(sec => {
          if (sy >= sec.offsetTop - 110) current = sec.getAttribute('id');
        });
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Back to top button
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Scroll-reveal (fade-in) ────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll(
    '.project-card, .skill-group, .exp-item, .achieve-item, .edu-card, .edu-timeline-item, .contact-info-card, .section-header'
  ).forEach(el => {
    el.classList.add('fade-in');
    revealObs.observe(el);
  });

  /* ── Skill bars animate when in view ───────────────────── */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((fill, i) => {
          const targetW = fill.style.width;
          fill.style.width = '0';
          setTimeout(() => { fill.style.width = targetW; }, 120 + i * 60);
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-group').forEach(g => skillObs.observe(g));

  /* ── Project cards stagger on view ─────────────────────── */
  const projGrid = document.querySelector('.projects-grid');
  if (projGrid) {
    const projObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.project-card').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            card.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 60 + i * 40);
          });
          projObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04 });
    projObs.observe(projGrid);
  }

  /* ── Contact Form (EmailJS) ─────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const responseMsg = document.getElementById('responseMessage');
  const submitBtn   = document.querySelector('.submit-btn');

  if (contactForm) {
    // Field validation on blur
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('blur',  () => validateField(input));
      input.addEventListener('focus', () => clearFieldError(input));
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm(contactForm)) return;

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
      }

      const params = {
        from_name:  `${val('firstName')} ${val('lastName')}`,
        from_email: val('email'),
        subject:    val('subject'),
        message:    val('message'),
      };

      try {
        if (typeof emailjs === 'undefined') throw new Error('EmailJS SDK not loaded');
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params);
        setResponse(responseMsg, 'success', '<i class="fas fa-check-circle"></i> Message sent! I\'ll get back to you soon.');
        contactForm.reset();
        clearAllErrors(contactForm);
        ['firstName','lastName','email','subject','message'].forEach(id => localStorage.removeItem(`c_${id}`));
      } catch (err) {
        console.error('EmailJS error:', err);
        setResponse(responseMsg, 'error', '<i class="fas fa-exclamation-circle"></i> Failed to send. Email me at kit26.ad59@gmail.com');
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          submitBtn.disabled = false;
        }
      }
    });

    // Auto-save form content
    try {
      contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        const saved = localStorage.getItem(`c_${input.id}`);
        if (saved) input.value = saved;
        input.addEventListener('input', () => localStorage.setItem(`c_${input.id}`, input.value));
      });
    } catch (_) {}
  }

}); // end DOMContentLoaded

/* ── Form helpers ──────────────────────────────────────────── */
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function validateForm(form) {
  return Array.from(form.querySelectorAll('.form-input, .form-textarea'))
    .map(f => validateField(f)).every(Boolean);
}

function validateField(field) {
  const v = field.value.trim();
  let ok = true, msg = '';
  if (!v) { msg = 'Required'; ok = false; }
  else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { msg = 'Valid email'; ok = false; }
  else if (field.tagName === 'TEXTAREA' && v.length < 10) { msg = '10+ characters'; ok = false; }
  else if (field.type === 'text' && v.length < 2) { msg = '2+ characters'; ok = false; }

  field.style.borderColor = ok ? 'var(--neon-green)' : '#ff6b8a';
  removeFieldError(field);
  if (!ok) addFieldError(field, msg);
  return ok;
}

function addFieldError(field, msg) {
  const div = document.createElement('div');
  div.className = 'field-error';
  div.style.cssText = 'color:#ff6b8a;font-size:11px;margin-top:3px;font-family:"DM Mono",monospace;';
  div.textContent = msg;
  field.parentNode.appendChild(div);
}
function removeFieldError(field) {
  field.parentNode.querySelector('.field-error')?.remove();
}
function clearFieldError(field) {
  field.style.borderColor = '';
  removeFieldError(field);
}
function clearAllErrors(form) {
  form.querySelectorAll('.form-input, .form-textarea').forEach(clearFieldError);
}

function setResponse(el, type, html) {
  if (!el) return;
  el.className = `response-message ${type}`;
  el.innerHTML = html;
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => { el.style.opacity = '1'; el.innerHTML = ''; el.className = 'response-message'; }, 400);
  }, type === 'success' ? 6000 : 8000);
}

/* ============================================================
   THEME TOGGLE — Light / Dark
   Apply theme immediately to avoid FOUC (flash of unstyled content)
   ============================================================ */
(function earlyThemeApply() {
  const saved       = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme       = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const html     = document.documentElement;
  const themeKey = 'portfolio-theme';

  function syncUI(theme) {
    const isLight   = theme === 'light';
    const icon      = document.getElementById('themeIcon');
    const drawerChk = document.getElementById('themeToggle');
    if (icon)      icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    if (drawerChk) drawerChk.checked = isLight;
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(themeKey, theme);
    syncUI(theme);
  }

  /* Sync UI to whatever was applied early */
  syncUI(html.getAttribute('data-theme') || 'dark');

  /* Desktop nav moon/sun button */
  document.getElementById('themeIconBtn')?.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* Drawer toggle switch */
  document.getElementById('themeToggle')?.addEventListener('change', (e) => {
    applyTheme(e.target.checked ? 'light' : 'dark');
  });
});

