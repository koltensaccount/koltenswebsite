// script.js — animations (GSAP + ScrollTrigger)
// - Draws SVG traces
// - Tilts/rotates the chip on scroll
// - Parallax background movement
// - Simple reveal for cards using ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

// Helper: animate SVG paths as if being drawn
document.querySelectorAll('.traces path').forEach((p, i) => {
  const len = p.getTotalLength();
  // set up initial stroke dash so path is hidden
  p.style.strokeDasharray = len;
  p.style.strokeDashoffset = len;
  // optional: add a slight delay between traces
  gsap.to(p, {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.animation-section',
      start: 'top 70%',
      end: 'bottom 40%',
      scrub: 0.6,
      invalidateOnRefresh: true
    }
  });
});

// Chip tilt & subtle scale on scroll — gives 3d apple-like motion
gsap.to('.chip', {
  rotationX: 20,
  rotationY: 18,
  scale: 1.04,
  transformOrigin: '50% 50%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.animation-section',
    start: 'top center',
    end: 'bottom top',
    scrub: true
  }
});

// Parallax the background layer slightly for depth
gsap.to('.layer-1', {
  yPercent: -12,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});
gsap.to('.layer-2', {
  yPercent: -6,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Reveal cards when they enter viewport
document.querySelectorAll('.reveal').forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      el.classList.add('is-visible');
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});

// Optional: subtle floating animation for small wave SVG
gsap.to('.floating-wave', {
  y: -14,
  repeat: -1,
  yoyo: true,
  duration: 3.6,
  ease: 'sine.inOut'
});
