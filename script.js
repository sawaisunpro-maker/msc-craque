// ========================================
// MSC CRAQUE - Pro Sports Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Menu ----------
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Close on link click
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  // ---------- Hero Carousel ----------
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let autoplay;

  function restartAnim(el) {
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // reflow で強制リセット
    el.style.animation = '';
  }

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;

    const slide = slides[current];

    // Ken Burns・テキストアニメーションを再起動
    restartAnim(slide.querySelector('.hero-bg'));
    restartAnim(slide.querySelector('.slide-label'));
    restartAnim(slide.querySelector('.slide-title'));
    restartAnim(slide.querySelector('.slide-sub'));
    restartAnim(slide.querySelector('.btn-accent'));

    slide.classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startAutoplay() {
    autoplay = setInterval(nextSlide, 5000);
  }
  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  document.querySelector('.hero-next')?.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  document.querySelector('.hero-prev')?.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
      resetAutoplay();
    });
  });

  startAutoplay();

  // ---------- Schedule Tabs ----------
  const tabBtns = document.querySelectorAll('.sch-tab');
  const tabPanels = document.querySelectorAll('.sch-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // ---------- Scroll Animations ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.mvv-card, .sport-card, .stat-item, .benefit, ' +
    '.course-block, .faq, .contact-card, ' +
    '.enroll-step, .plan-item, .slogan-banner, ' +
    '.about-hero-row, .coach-profile, .gallery-item, ' +
    '.result-card, .concept-card, .about-concept-row'
  ).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---------- Header scroll ----------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
  });

  // ---------- Modals (iOS scroll-lock safe) ----------
  let savedScrollY = 0;

  function openModal(modal) {
    savedScrollY = window.scrollY;
    document.body.style.top = `-${savedScrollY}px`;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    modal.scrollTop = 0;
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, savedScrollY);
  }

  // Open modal
  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modal);
      if (modal) openModal(modal);
    });
  });

  // Close modal - close button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal-overlay'));
    });
  });

  // Close modal - click overlay background
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Close modal - Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m));
    }
  });

});
