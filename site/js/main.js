document.addEventListener('DOMContentLoaded', () => {
  const monumentsGrid = document.querySelector('#catalogGrid[data-catalog-type="monuments"]');
  if (monumentsGrid) {
    initMonumentsCatalog(monumentsGrid);
  } else {
    initStaticCatalog();
  }

  function initMonumentsCatalog(grid) {
    const filterButtons = [...document.querySelectorAll('.catalog-filters button.filter-btn')];
    const searchInput = document.getElementById('catalogSearchInput');
    const countEl = document.getElementById('catalogCount');
    const countLabel = document.getElementById('catalogCountLabel');
    const emptyEl = document.getElementById('catalogEmpty');
    const loadMoreWrap = document.getElementById('catalogPaginationWrap');
    const loadMoreBtn = document.getElementById('btnLoadMore');
    const pageStatus = document.getElementById('catalogPageStatus');

    const PAGE_SIZE = 48;
    let allProducts = null;
    let currentFilter = grid.dataset.defaultFilter || 'standard';
    let searchQuery = '';
    let currentPage = 1;
    let filteredList = [];

    const CAT_NAMES = {
      standard: 'Стандартні з цінами',
      odinarni: "Одинарні",
      podvijni: "Подвійні",
      vijskovi: "Військові ЗСУ",
      vip: "VIP",
      modeli: "Моделі цеху",
      khresti: "Хрести",
      ogorozhi: "Огорожі",
      dytiachi: "Дитячі",
      nadgrobky: "Надгробні",
      stoly: "Столи/лавки",
      kolony: "Колони",
      pidvikonnya: "Підвіконня",
      kuli: "Кулі",
      lampadky: "Лампадки",
      vazy: "Вази",
      stovpchyky: "Стовпчики",
      '3d-proekty': "3D-проекти",
      all: "Усі моделі"
    };

    function getCatName(id) {
      return CAT_NAMES[id] || "Пам'ятники";
    }

    function getCatalogCategory(p) {
      return (p.category === 'odinarni' || p.category === 'podvijni') && Number(p.price) > 0
        ? 'standard'
        : p.category;
    }

    function matchesCategory(p, cat) {
      if (cat === 'all') return true;
      const cats = [getCatalogCategory(p), ...(p.alternateCategories || [])];
      return cats.includes(cat);
    }

    function matchesSearch(p, q) {
      if (!q) return true;
      const aliases = Array.isArray(p.aliases) ? p.aliases.join(' ') : '';
      const specs = Array.isArray(p.specs) ? p.specs.join(' ') : '';
      const hay = (p.sku + ' ' + aliases + ' ' + p.title + ' ' + specs).toLowerCase();
      return hay.includes(q);
    }

    function formatPrice(num) {
      return Number(num || 0).toLocaleString('uk-UA').replace(/\u00A0/g, ' ');
    }

    function escapeHtml(str) {
      return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function renderCard(item) {
      const isPriceVerified = Number(item.price) > 0;
      const priceLabel = isPriceVerified ? 'від ' + formatPrice(item.price) + ' грн' : 'Ціна за прорахунком';
      const specs = (Array.isArray(item.specs) && item.specs.length)
        ? item.specs
        : ['Натуральне Букинське габро', 'Пряма різка у цеху Коростишева', 'Дзеркальне водяне полірування'];
      const specsAttr = escapeHtml(specs.join('||'));
      const aliases = Array.isArray(item.aliases) ? item.aliases : [];
      const skuDisplay = item.sku + (aliases.length ? ' / також ' + aliases.join(', ') : '');
      const pricePart = isPriceVerified ? ' за ціною від ' + formatPrice(item.price) + ' грн' : '';
      const viberText = 'Вітаю! Мене цікавить пам\'ятник арт. ' + item.sku + ' ("' + item.title + '")' + pricePart + '. Прошу прорахувати повну вартість з оформленням і монтажем.';
      const viberHref = 'viber://chat?number=%2B380977157915&draft=' + encodeURIComponent(viberText);
      const catName = getCatName(item.category);
      const categories = [...new Set([getCatalogCategory(item), ...(item.alternateCategories || [])])];
      const searchStr = (item.sku + ' ' + aliases.join(' ') + ' ' + item.title + ' ' + specs.join(' ')).toLowerCase();

      return '<article class="product-card ' + escapeHtml(item.category) + '" data-category="' + escapeHtml(categories.join(' ')) + '" data-search="' + escapeHtml(searchStr) + '">' +
        '<button class="product-media js-lightbox" type="button"' +
          ' data-image="' + escapeHtml(item.img) + '"' +
          ' data-title="' + escapeHtml(item.title) + '"' +
          ' data-sku="Арт. ' + escapeHtml(skuDisplay) + '"' +
          ' data-category="' + escapeHtml(catName) + '"' +
          ' data-product-id="' + escapeHtml(item.id) + '"' +
          ' data-badge="' + escapeHtml(item.badge || '') + '"' +
          ' data-price="' + escapeHtml(priceLabel) + '"' +
          ' data-specs="' + specsAttr + '"' +
          ' data-viber="' + escapeHtml(viberHref) + '"' +
          ' aria-label="Збільшити та переглянути ' + escapeHtml(item.sku) + '">' +
          '<img src="' + escapeHtml(item.img) + '" alt="' + escapeHtml(item.title) + '" loading="lazy">' +
        '</button>' +
        '<div class="product-body">' +
          '<div class="product-topline">' +
            '<span>Арт. ' + escapeHtml(skuDisplay) + '</span>' +
            '<span>' + escapeHtml(catName) + '</span>' +
          '</div>' +
          '<h3><a href="products/' + escapeHtml(item.id) + '.html">' + escapeHtml(item.title) + '</a></h3>' +
          '<div class="product-price">' +
            '<strong>' + escapeHtml(priceLabel) + '</strong>' +
            '<button class="product-detail js-lightbox" type="button"' +
              ' data-image="' + escapeHtml(item.img) + '"' +
              ' data-title="' + escapeHtml(item.title) + '"' +
              ' data-sku="Арт. ' + escapeHtml(skuDisplay) + '"' +
              ' data-category="' + escapeHtml(catName) + '"' +
              ' data-product-id="' + escapeHtml(item.id) + '"' +
              ' data-badge="' + escapeHtml(item.badge || '') + '"' +
              ' data-price="' + escapeHtml(priceLabel) + '"' +
              ' data-specs="' + specsAttr + '"' +
              ' data-viber="' + escapeHtml(viberHref) + '"' +
              ' aria-label="Переглянути деталі ' + escapeHtml(item.sku) + '">' +
              '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }

    function updateView(isAppend = false) {
      if (!allProducts) return;

      if (!isAppend) {
        filteredList = allProducts.filter(p => matchesCategory(p, currentFilter) && matchesSearch(p, searchQuery));
      }

      const start = isAppend ? (currentPage - 1) * PAGE_SIZE : 0;
      const end = currentPage * PAGE_SIZE;
      const batch = filteredList.slice(start, end);
      const html = batch.map(renderCard).join('\n');

      if (isAppend) {
        grid.insertAdjacentHTML('beforeend', html);
      } else {
        grid.innerHTML = html;
      }

      if (countEl) countEl.textContent = filteredList.length;
      if (countLabel) countLabel.textContent = searchQuery ? 'знайдено за запитом' : 'позицій у розділі';
      if (emptyEl) emptyEl.hidden = filteredList.length > 0;

      if (loadMoreWrap && loadMoreBtn) {
        const shownCount = Math.min(filteredList.length, end);
        const remaining = filteredList.length - shownCount;
        if (remaining > 0) {
          loadMoreWrap.style.display = '';
          loadMoreBtn.style.display = 'inline-block';
          loadMoreBtn.textContent = 'Показати ще (' + Math.min(PAGE_SIZE, remaining) + ' із ' + remaining + ')';
          if (pageStatus) pageStatus.textContent = 'Показано ' + shownCount + ' із ' + filteredList.length + ' моделей';
        } else {
          loadMoreBtn.style.display = 'none';
          if (pageStatus) pageStatus.textContent = filteredList.length ? 'Показано всі ' + filteredList.length + ' моделей' : '';
        }
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        if (cat === currentFilter && !searchQuery) return;
        filterButtons.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });
        currentFilter = cat;
        currentPage = 1;

        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.delete('cat');
        nextUrl.searchParams.delete('filter');
        nextUrl.searchParams.set('category', cat);
        history.replaceState({ category: cat }, '', nextUrl);

        updateView(false);
      });
    });

    let searchTimer = null;
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          searchQuery = searchInput.value.trim().toLowerCase();
          currentPage = 1;
          const nextUrl = new URL(window.location.href);
          if (searchQuery) {
            nextUrl.searchParams.set('q', searchInput.value.trim());
          } else {
            nextUrl.searchParams.delete('q');
          }
          history.replaceState({ q: searchQuery }, '', nextUrl);
          updateView(false);
        }, 100);
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        updateView(true);
      });
    }

    fetch('data/products.json')
      .then(response => {
        if (!response.ok) throw new Error('catalog fetch failed');
        return response.json();
      })
      .then(data => {
        allProducts = data;
        const urlParams = new URLSearchParams(window.location.search);
        let catParam = urlParams.get('category') || urlParams.get('cat') || urlParams.get('filter');
        if (catParam === 'svechi' || catParam === 'svechi-cvety' || catParam === 'kvity-svichky') catParam = 'svichky';
        const qParam = urlParams.get('q');

        if (catParam || qParam) {
          if (catParam) {
            currentFilter = catParam;
            filterButtons.forEach(btn => {
              const isActive = btn.dataset.filter === currentFilter;
              btn.classList.toggle('active', isActive);
              btn.setAttribute('aria-pressed', String(isActive));
            });
          }
          if (qParam && searchInput) {
            searchQuery = qParam.trim().toLowerCase();
            searchInput.value = qParam;
          }
          currentPage = 1;
          updateView(false);
        } else {
          filteredList = allProducts.filter(p => matchesCategory(p, currentFilter));
          const remaining = filteredList.length - PAGE_SIZE;
          if (loadMoreWrap && loadMoreBtn) {
            if (remaining > 0) {
              loadMoreWrap.style.display = '';
              loadMoreBtn.style.display = 'inline-block';
              loadMoreBtn.textContent = 'Показати ще (' + Math.min(PAGE_SIZE, remaining) + ' із ' + remaining + ')';
              if (pageStatus) pageStatus.textContent = 'Показано ' + PAGE_SIZE + ' із ' + filteredList.length + ' моделей';
            } else {
              loadMoreBtn.style.display = 'none';
              if (pageStatus) pageStatus.textContent = filteredList.length ? 'Показано всі ' + filteredList.length + ' моделей' : '';
            }
          }
        }

        const productParam = urlParams.get('product');
        if (productParam) {
          const targetTrigger = document.querySelector('.js-lightbox[data-product-id="' + CSS.escape(productParam) + '"]');
          if (targetTrigger) {
            targetTrigger.click();
          } else {
            const prod = allProducts.find(p => p.id === productParam);
            if (prod) {
              currentFilter = getCatalogCategory(prod);
              filterButtons.forEach(btn => {
                const isActive = btn.dataset.filter === currentFilter;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', String(isActive));
              });
              filteredList = allProducts.filter(p => matchesCategory(p, currentFilter));
              const idx = filteredList.findIndex(p => p.id === productParam);
              currentPage = idx >= 0 ? Math.ceil((idx + 1) / PAGE_SIZE) : 1;
              updateView(false);
              setTimeout(() => {
                const t = document.querySelector('.js-lightbox[data-product-id="' + CSS.escape(productParam) + '"]');
                if (t) t.click();
              }, 50);
            }
          }
        }
      })
      .catch(err => {
        console.warn('Products preload failed', err);
      });
  }

  function initStaticCatalog() {
    const filterButtons = [...document.querySelectorAll('button.filter-btn')];
    const searchInput = document.getElementById('catalogSearchInput');
    const cards = [...document.querySelectorAll('.product-card')];
    const empty = document.getElementById('catalogEmpty');
    const countEl = document.getElementById('catalogCount');

    if (!cards.length) return;

    function activeFilter() {
      const active = filterButtons.find(b => b.classList.contains('active'));
      return active ? active.dataset.filter : 'all';
    }

    function applyStaticFilter() {
      const filter = activeFilter();
      filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let visible = 0;

      cards.forEach(card => {
        const matchesCategory = filter === 'all' || (card.dataset.category || '').split(' ').includes(filter);
        const matchesSearch = !query || (card.dataset.search || card.textContent.toLowerCase()).includes(query);
        const show = matchesCategory && matchesSearch;
        card.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });

      if (empty) empty.hidden = visible !== 0;
      if (countEl) countEl.textContent = visible;
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.delete('cat');
        nextUrl.searchParams.delete('filter');
        nextUrl.searchParams.set('category', button.dataset.filter);
        history.replaceState(history.state, '', nextUrl);
        applyStaticFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', applyStaticFilter);
    }

    const urlParams = new URLSearchParams(window.location.search);
    let filterParam = urlParams.get('filter') || urlParams.get('cat') || urlParams.get('category');
    if (filterParam) {
      if (filterParam === 'svechi' || filterParam === 'svechi-cvety' || filterParam === 'kvity-svichky') filterParam = 'svichky';
      if (filterParam === 'kvity-kolir') filterParam = 'cvety';
      if (filterParam === 'hramy') filterParam = 'peyzazh';
      const target = filterButtons.find(b => b.dataset.filter === filterParam);
      if (target) {
        filterButtons.forEach(b => b.classList.remove('active'));
        target.classList.add('active');
      }
    }
    if (urlParams.get('q') && searchInput) {
      searchInput.value = urlParams.get('q');
    }
    applyStaticFilter();
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

  function closeLightbox(syncHistory = true) {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    resetLightboxZoom();
    if (syncHistory) {
      const currentUrl = new URL(window.location.href);
      if (history.state && history.state.lightboxProduct) {
        history.back();
      } else if (currentUrl.searchParams.has('product')) {
        currentUrl.searchParams.delete('product');
        history.replaceState({}, '', currentUrl);
      }
    }
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
      event.preventDefault();
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
        lightboxPrice.textContent = trigger.dataset.price || 'Ціна за прорахунком';
      }
      const specsTitle = document.getElementById('lightboxSpecsTitle');
      if (specsTitle) {
        specsTitle.textContent = trigger.dataset.specsTitle || 'Комплектація';
      }
      const lightboxNote = lightbox.querySelector('.lightbox-note');
      if (lightboxNote) {
        lightboxNote.textContent = trigger.dataset.specsTitle
          ? 'Точна вартість гравіювання залежить від розмірів стели та складності роботи.'
          : 'Точна вартість залежить від каменю, розмірів, оформлення та монтажу.';
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
      if (trigger.dataset.productId) {
        const currentUrl = new URL(window.location.href);
        if (currentUrl.searchParams.get('product') !== trigger.dataset.productId) {
          currentUrl.searchParams.set('product', trigger.dataset.productId);
          history.pushState({ lightboxProduct: true }, '', currentUrl);
        }
      }
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

  if (!monumentsGrid) {
    const productParam = new URLSearchParams(window.location.search).get('product');
    if (productParam) {
      const productTrigger = document.querySelector('.js-lightbox[data-product-id="' + CSS.escape(productParam) + '"]');
      if (productTrigger) productTrigger.click();
    }
  }

  window.addEventListener('popstate', () => {
    const productId = new URL(window.location.href).searchParams.get('product');
    if (!productId) {
      if (lightbox && lightbox.classList.contains('active')) closeLightbox(false);
      return;
    }
    const productTrigger = document.querySelector('.js-lightbox[data-product-id="' + CSS.escape(productId) + '"]');
    if (productTrigger) productTrigger.click();
  });
});