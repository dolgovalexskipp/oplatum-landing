// Nav scroll state
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q?.addEventListener('click', () => item.classList.toggle('open'));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
});

// Form submit (demo)
document.querySelectorAll('form[data-demo]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    if (btn) { btn.textContent = 'Спасибо! Свяжемся в течение рабочего дня'; btn.setAttribute('disabled', 'true'); btn.style.opacity = 0.7; }
    form.reset();
  });
});
