// Enhancements belong only to rebuilt pages, never catalog or contacts.
(() => {
  const menu = document.querySelector('.ed-menu');
  if (menu) {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
    document.addEventListener('click', event => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    const desktop = window.matchMedia('(min-width: 761px)');
    desktop.addEventListener('change', () => { if (desktop.matches) menu.open = false; });
  }
  // Avoid two visible Viber actions when the contact section is on screen.
  const contact = document.querySelector('.ed-contact');
  const mobileBar = document.querySelector('.ed-mobile-contact');
  if (contact && mobileBar && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      mobileBar.classList.toggle('is-hidden', entry.isIntersecting);
      mobileBar.inert = entry.isIntersecting;
    }, { threshold: 0.3 }).observe(contact);
  }
})();
