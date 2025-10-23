// Lightweight interaction helpers for the updated header + reduced-motion handling

(function () {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');

  if (!header) {
    return;
  }

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
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      // subtle lift as you scroll down
      if (y > 10) {
        header.style.transform = 'translateY(-6px) scale(0.995)';
      } else {
        header.style.transform = '';
      }
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
})();

document.addEventListener('DOMContentLoaded', () => {
  const posterWrappers = document.querySelectorAll('.poster-wrapper');
  posterWrappers.forEach((wrapper) => {
    const img = wrapper.querySelector('img');
    if (!img || !img.src) return;
    wrapper.style.setProperty('--poster-bg', `url(${img.src})`);
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const heroArt = document.querySelectorAll('.notebook-hero-art svg');
  const coverArt = document.querySelectorAll('.notebook-cover-art');

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const applyParallax = () => {
    const viewportMid = window.innerHeight * 0.5;

    heroArt.forEach((svg) => {
      const parent = svg.closest('.notebook-hero');
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const sectionMid = rect.top + rect.height * 0.5;
      const raw = (viewportMid - sectionMid) * 0.12;
      const shift = clamp(raw, -60, 60);
      svg.style.setProperty('--hero-shift', `${shift}px`);
    });

    coverArt.forEach((svg) => {
      const rect = svg.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.5;
      const raw = (viewportMid - mid) * 0.08;
      const shift = clamp(raw, -36, 36);
      svg.style.setProperty('--cover-shift', `${shift}px`);
    });
  };

  if (heroArt.length || coverArt.length) {
    let ticking = false;
    let parallaxActive = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          applyParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    const startParallax = () => {
      if (parallaxActive || prefersReduced.matches) return;
      parallaxActive = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', applyParallax);
      applyParallax();
    };

    const stopParallax = () => {
      if (!parallaxActive) return;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', applyParallax);
      heroArt.forEach((svg) => svg.style.removeProperty('--hero-shift'));
      coverArt.forEach((svg) => svg.style.removeProperty('--cover-shift'));
      parallaxActive = false;
    };

    startParallax();

    if (typeof prefersReduced.addEventListener === 'function') {
      prefersReduced.addEventListener('change', (event) => {
        if (event.matches) {
          stopParallax();
        } else {
          startParallax();
        }
      });
    }
  }
});

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
