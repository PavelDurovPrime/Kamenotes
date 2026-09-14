document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const searchInput = document.getElementById('catalogSearchInput');
  const cards = [...document.querySelectorAll('.product-card')];
  const empty = document.getElementById('catalogEmpty');

  function activeFilter() {
    const active = filterButtons.find(button => button.classList.contains('active'));
    return active ? active.dataset.filter : 'all';
  }

  function applyCatalogFilter() {
    if (!cards.length) return;
    const filter = activeFilter();
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visible = 0;

    cards.forEach(card => {
      const matchesCategory = filter === 'all' || card.dataset.category === filter;
      const matchesSearch = !query || (card.dataset.search || card.textContent.toLowerCase()).includes(query);
      const show = matchesCategory && matchesSearch;
      card.classList.toggle('hidden', !show);
      if (show) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      applyCatalogFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyCatalogFilter);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter') || urlParams.get('cat');
  if (filterParam) {
    const target = filterButtons.find(button => button.dataset.filter === filterParam);
    if (target) target.click();
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSku = document.getElementById('lightboxSku');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxBadge = document.getElementById('lightboxBadge');
  const lightboxPrice = document.getElementById('lightboxPrice');
  const lightboxSpecsList = document.getElementById('lightboxSpecsList');
  const lightboxViber = document.getElementById('lightboxViber');
  const lightboxZoom = document.getElementById('lightboxZoom');
  const lightboxMedia = lightbox ? lightbox.querySelector('.lightbox-media-col') : null;
  let lastFocus = null;

  function resetLightboxZoom() {
    if (lightboxMedia) lightboxMedia.classList.remove('is-zoomed');
    if (lightboxZoom) {
      lightboxZoom.setAttribute('aria-pressed', 'false');
      lightboxZoom.setAttribute('aria-label', 'Показати фото у вихідному розмірі');
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    resetLightboxZoom();
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', event => {
    const zoomTrigger = event.target.closest('#lightboxZoom');
    if (zoomTrigger && lightboxMedia) {
      const zoomed = lightboxMedia.classList.toggle('is-zoomed');
      zoomTrigger.setAttribute('aria-pressed', String(zoomed));
      zoomTrigger.setAttribute('aria-label', zoomed ? 'Повернути фото до розміру вікна' : 'Показати фото у вихідному розмірі');
      return;
    }
    const trigger = event.target.closest('.js-lightbox');
    if (trigger && lightbox) {
      lastFocus = trigger;
      resetLightboxZoom();
      if (lightboxImg) {
        lightboxImg.src = trigger.dataset.image || '';
        lightboxImg.alt = trigger.dataset.title || '';
      }
      if (lightboxTitle) lightboxTitle.textContent = trigger.dataset.title || '';
      lightbox.classList.toggle('photo-only', !trigger.dataset.sku);
      const photoMeta = document.getElementById('lightboxPhotoMeta');
      if (photoMeta) photoMeta.textContent = trigger.dataset.sku ? '' : (trigger.dataset.meta || '');
      if (lightboxSku) lightboxSku.textContent = trigger.dataset.sku || '';
      if (lightboxCat) lightboxCat.textContent = trigger.dataset.category || '';
      if (lightboxBadge) {
        const badge = trigger.dataset.badge || '';
        lightboxBadge.textContent = badge;
        lightboxBadge.style.display = badge ? 'inline-block' : 'none';
      }
      if (lightboxPrice) {
        lightboxPrice.textContent = trigger.dataset.price || 'від виробника';
      }
      if (lightboxSpecsList) {
        const rawSpecs = trigger.dataset.specs || '';
        const specsArr = rawSpecs ? rawSpecs.split('||').filter(Boolean) : [];
        lightboxSpecsList.innerHTML = '';
        if (specsArr.length > 0) {
          specsArr.forEach(s => {
            const li = document.createElement('li');
            li.innerHTML = '<span class="spec-line" aria-hidden="true"></span><span class="spec-text"></span>';
            li.querySelector('.spec-text').textContent = s;
            lightboxSpecsList.appendChild(li);
          });
        } else {
          const defaultItems = [
            'Натуральне Букинське габро (вищий гатунок)',
            'Пряма різка у власному цеху Коростишева',
            'Водяне дзеркальне полірування всіх граней',
            'Підготовка комплекту під надійне бетонування'
          ];
          defaultItems.forEach(s => {
            const li = document.createElement('li');
            li.innerHTML = '<span class="spec-line" aria-hidden="true"></span><span class="spec-text"></span>';
            li.querySelector('.spec-text').textContent = s;
            lightboxSpecsList.appendChild(li);
          });
        }
      }
      if (lightboxViber) {
        const href = trigger.dataset.viber || '';
        lightboxViber.hidden = !href;
        if (href) lightboxViber.href = href;
      }
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      const closeButton = lightbox.querySelector('.lightbox-close');
      if (closeButton) closeButton.focus();
    }

    if (event.target.closest('[data-lightbox-close]')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', event => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'Tab') {
      const focusable = [...lightbox.querySelectorAll('button, a[href]')].filter(item => !item.hidden && item.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  applyCatalogFilter();
});