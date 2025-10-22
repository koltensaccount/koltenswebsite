// Lightweight interaction helpers for the updated header + reduced-motion handling

(function () {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      header.classList.toggle('stacked');
    });
  }

  // Add a tiny transform to header on scroll for depth, but avoid if prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      // subtle lift as you scroll down
      if (y > 10) {
        header.style.transform = 'translateY(-6px) scale(0.995)';
      } else {
        header.style.transform = '';
      }
      lastY = y;
    }, { passive: true });
  }

  // Add scroll listener to enhance header effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Helpful hint: if your HW pdf isn't in assets/hw.pdf, update the link in index.html:
  // <a class="hw-button" href="assets/hw.pdf" ...> — point that href to your PDF file path in the repo.
})();

// Circuit scrolling animation logic
(function () {
  const visual = document.querySelector('.animation-section .visual');
  const copy = document.querySelector('.animation-section .copy');

  if (visual && copy) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visual.classList.add('animate');
          copy.classList.add('animate');
        } else {
          visual.classList.remove('animate');
          copy.classList.remove('animate');
        }
      });
    }, { threshold: 0.5 });

    observer.observe(visual);
  }
})();
