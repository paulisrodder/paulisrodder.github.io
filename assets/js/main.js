document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('#primary-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navClose = document.querySelector('.nav-close');
  const body = document.body;

  const toggleHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  const setNavState = (shouldOpen) => {
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    }
    body.classList.toggle('nav-open', shouldOpen);
    if (header) {
      header.classList.toggle('nav-open', shouldOpen);
    }
  };

  const closeNav = () => setNavState(false);

  const handleToggle = () => {
    const isOpen = body.classList.contains('nav-open');
    setNavState(!isOpen);
  };

  navToggle?.addEventListener('click', handleToggle);

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (body.classList.contains('nav-open')) {
        closeNav();
      }
    });
  });

  navClose?.addEventListener('click', () => {
    if (!body.classList.contains('nav-open')) return;
    closeNav();
    navToggle?.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      closeNav();
      navToggle?.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850 && body.classList.contains('nav-open')) {
      closeNav();
    }
  });

  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });
  setNavState(false);
});
