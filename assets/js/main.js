document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 250) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});