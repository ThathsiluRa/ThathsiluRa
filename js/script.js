/* ============================================
   THATHSILU — Interactive Engine
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Cursor ---- */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * .12;
      ringY += (mouseY - ringY) * .12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ---- Mobile nav ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Scroll animations ---- */
  const animateElements = () => {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.project-card, .skill-card, .timeline-item, .contact-item');

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const threshold = window.innerHeight * .75;
      if (rect.top < threshold) {
        section.classList.add('visible');
        // stagger children
        const children = section.querySelectorAll('.project-card, .skill-card, .timeline-item, .contact-item');
        children.forEach((el, i) => {
          el.style.animationDelay = (i * 0.08) + 's';
        });
      }
    });
  };

  animateElements();
  window.addEventListener('scroll', animateElements, { passive: true });
  window.addEventListener('resize', animateElements, { passive: true });

  /* ---- Project cards stagger ---- */
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, i) => {
    card.style.animationDelay = (i * 0.1 + 0.3) + 's';
  });

  /* ---- Timeline stagger ---- */
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, i) => {
    item.style.animationDelay = (i * 0.12 + 0.3) + 's';
  });

  /* ---- Skill cards stagger ---- */
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, i) => {
    card.style.animationDelay = (i * 0.08 + 0.3) + 's';
  });

  /* ---- Contact stagger ---- */
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, i) => {
    item.style.animationDelay = (i * 0.1 + 0.3) + 's';
  });

  /* ---- Form handling ---- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Sending...';
      btn.disabled = true;

      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());

      // Use Formspree as a free form backend (user can replace)
      try {
        const resp = await fetch('https://formspree.io/f/your-form-id', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' }
        });

        if (resp.ok) {
          showToast('✨ Message sent! I\'ll get back to you soon.');
          form.reset();
        } else {
          showToast('⚠️ Something went wrong. Try emailing me directly.');
        }
      } catch {
        showToast('⚠️ Could not send. Email me at thathsilura@gmail.com');
      }

      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }

  /* ---- Toast ---- */
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ---- Nav scroll effect ---- */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const current = window.scrollY;
    if (current > 80) {
      nav.style.background = 'rgba(7,7,13,.95)';
      nav.style.backdropFilter = 'blur(30px)';
    } else {
      nav.style.background = 'linear-gradient(180deg,rgba(7,7,13,.85),transparent)';
    }
    lastScroll = current;
  }, { passive: true });

  /* ---- Smooth hash links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
