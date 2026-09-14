const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SITE_DIR = path.join(ROOT_DIR, 'site');
const PRODUCTS_FILE = path.join(SITE_DIR, 'data', 'products.json');
const REVIEWS_FILE = path.join(SITE_DIR, 'data', 'reviews.json');
const CATALOG_HTML_FILE = path.join(SITE_DIR, 'catalog.html');
const REVIEWS_HTML_FILE = path.join(SITE_DIR, 'vidguky.html');

const PHONE_MAIN = '+380977157915';
const PHONE_MAIN_LABEL = '097 715 79 15';
const PHONE_SALES = '+380976046144';
const PHONE_SALES_LABEL = '097 604 61 44';
const PHONE_SHOP = '+380999314520';
const PHONE_SHOP_LABEL = '099 931 45 20';
const EMAIL = 'suhorez@ukr.net';
const MAP_LINK = 'https://maps.app.goo.gl/QTLZb45coBpbMcQA9';
const VIBER_BASE = 'viber://chat?number=%2B380977157915';
const ROUTE_KIEV_LINK = 'https://www.google.com/maps/dir/%D0%9A%D0%B8%D0%B5%D0%B2/KAMENOTES.com+-+%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA%D0%B8+%D0%B8%D0%B7+%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%82%D0%B0,+%D0%9A%D0%BE%D1%80%D0%BE%D1%81%D1%82%D1%8B%D1%88%D0%B5%D0%B2,+%D1%83%D0%BB.+%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D1%85+%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D0%B7%D0%B0%D0%BD%D0%BE%D0%B2,+%D0%9A%D0%BE%D1%80%D0%BE%D1%81%D1%82%D1%8B%D1%88%D0%B5%D0%B2,+%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C/@50.3674122,29.7547776,10z/data=!4m13!4m12!1m5!1m1!1s0x40d4cf4ee15a4505:0x764931d2170146fe!2m2!1d30.5234!2d50.4501!1m5!1m1!1s0x472c83e298d808ad:0x2afed4ca42ae830c!2m2!1d29.0809756!2d50.3275428';
const ROUTE_ZT_LINK = 'https://www.google.com/maps/dir/%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80,+%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C/KAMENOTES.com+-+%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA%D0%B8+%D0%B8%D0%B7+%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%82%D0%B0,+%D0%9A%D0%BE%D1%80%D0%BE%D1%81%D1%82%D1%8B%D1%88%D0%B5%D0%B2,+%D1%83%D0%BB.+%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D1%85+%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D0%B7%D0%B0%D0%BD%D0%BE%D0%B2,+%D0%9A%D0%BE%D1%80%D0%BE%D1%81%D1%82%D1%8B%D1%88%D0%B5%D0%B2,+%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C/@50.2803575,28.7397235,11z/data=!4m13!4m12!1m5!1m1!1s0x472c64a32bfa355d:0xf14ad2a3d9b9e229!2m2!1d28.6586669!2d50.25465!1m5!1m1!1s0x472c83e298d808ad:0x2afed4ca42ae830c!2m2!1d29.0809756!2d50.3275428';

const CATEGORIES = [
  { id: 'all', label: 'З цінами', short: 'Усі моделі' },
  { id: 'odinarni', label: "Одинарні пам'ятники", short: 'Одинарні' },
  { id: 'podvijni', label: "Подвійні пам'ятники", short: 'Подвійні' },
  { id: 'vijskovi', label: 'Військові ЗСУ', short: 'Військові ЗСУ' },
  { id: 'modeli', label: 'Авторські моделі цеху', short: 'Моделі цеху' },
  { id: 'khresti', label: 'Хрести та плити', short: 'Хрести' },
  { id: 'ogorozhi', label: 'Огорожі та столи', short: 'Огорожі' }
];

const FEATURED_IDS = [
  'km-1-5',
  'km-2-5',
  'km-7',
  'km-27',
  'km-34',
  'vsk-01',
  'gallery-khresti-kr-001',
  'km-gal-kst-01'
];

function ensureDirs() {
  fs.mkdirSync(path.join(SITE_DIR, 'css'), { recursive: true });
  fs.mkdirSync(path.join(SITE_DIR, 'js'), { recursive: true });
}

function readProducts() {
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
}

function readReviews() {
  return JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#096;');
}

function formatPrice(num) {
  return Number(num || 0).toLocaleString('uk-UA').replace(/\u00A0/g, ' ');
}

function categoryName(id) {
  const item = CATEGORIES.find(category => category.id === id);
  return item ? item.short : "Пам'ятники";
}

function productForPublic(product) {
  const next = {
    ...product,
    title: product.title,
    badge: product.badge || '',
    specs: Array.isArray(product.specs) ? [...product.specs] : []
  };

  if (next.id === 'vsk-kiev-1') {
    next.title = 'Пам\'ятник воїну ЗСУ із зеленого граніту';
    next.specs = next.specs.map(item => item.replace('Повний комплекс з огорожею', 'Повний комплект з огорожею'));
  }

  if (next.id === 'vsk-chudniv') {
    next.title = 'Пам\'ятник воїну ЗСУ, Чуднів';
  }

  return next;
}

function productViberHref(product) {
  const text = `Вітаю! Мене цікавить пам'ятник арт. ${product.sku} ("${product.title}") за ціною від ${formatPrice(product.price)} грн. Прошу прорахувати повну вартість з оформленням і монтажем.`;
  return `${VIBER_BASE}&draft=${encodeURIComponent(text)}`;
}

function arrowIcon() {
  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';
}

function phoneIcon() {
  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
}

function searchIcon() {
  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>';
}

function tickIcon() {
  return '<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
}

function starIcon() {
  return '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z"/></svg>';
}

function viberIcon() {
  return '<img class="viber-img" src="img/viber-white.svg" alt="" aria-hidden="true">';
}

function navLink(active, id, href, label) {
  const cls = active === id ? ' class="active" aria-current="page"' : '';
  return `<a href="${href}"${cls}>${label}</a>`;
}

function renderHeader(active) {
  return `<header class="site-header">
    <div class="container header-grid">
      <a class="brand" href="index.html" aria-label="KAMENOTES, головна сторінка">
        <span class="brand-emblem"><img class="brand-blade blade-spin" src="img/suhorez_blade.svg" alt="Алмазний диск сухоріза" width="64" height="64"></span>
        <span class="brand-copy">
          <span class="brand-name">KAMENOTES</span>
        </span>
      </a>
      <nav class="main-nav" aria-label="Основна навігація">
        ${navLink(active, 'catalog', 'catalog.html', 'Каталог')}
        ${navLink(active, 'production', 'vyrobnytstvo.html', 'Виробництво')}
        ${navLink(active, 'reviews', 'vidguky.html', 'Відгуки')}
        ${navLink(active, 'contacts', 'kontakty.html', 'Контакти')}
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="tel:${PHONE_MAIN}" aria-label="Зателефонувати ${PHONE_MAIN_LABEL}">
          ${phoneIcon()}
          <span class="header-phone-copy"><strong>${PHONE_MAIN_LABEL}</strong></span>
        </a>
        <a class="btn btn-viber header-viber" href="${VIBER_BASE}" aria-label="Написати у Viber">
          ${viberIcon()}
          <span>Viber</span>
        </a>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `<footer class="site-footer">
    <div class="container footer-primary">
      <div class="footer-story">
        <a class="footer-mark" href="index.html" aria-label="KAMENOTES, головна сторінка"><img src="img/suhorez_blade.svg" alt="" width="52" height="52"><span>KAMENOTES</span></a>
        <p class="footer-eyebrow">Гранітна мануфактура · Коростишів · з 1995 року</p>
        <h2>Пам’ять у камені.<br>Від ескізу до монтажу.</h2>
      </div>
      <div class="footer-connect">
        <p>Розкажіть, який пам’ятник вам потрібен. Допоможемо з моделлю, матеріалом і розрахунком вартості.</p>
        <a class="footer-phone" href="tel:${PHONE_MAIN}">${PHONE_MAIN_LABEL}</a>
        <div class="footer-actions">
          <a class="btn btn-viber footer-viber" href="${VIBER_BASE}">${viberIcon()}<span>Написати у Viber</span></a>
          <a class="btn btn-outline-light footer-call" href="tel:${PHONE_MAIN}">${phoneIcon()}<span>Зателефонувати</span></a>
        </div>
      </div>
    </div>
    <div class="container footer-secondary">
      <nav class="footer-navigation" aria-label="Навігація у футері">
        <strong>Розділи</strong>
        <div><a href="catalog.html">Каталог</a><a href="vyrobnytstvo.html">Виробництво</a><a href="vidguky.html">Відгуки</a><a href="kontakty.html">Контакти</a></div>
      </nav>
      <div class="footer-location">
        <strong>Виробництво</strong>
        <address><a href="${MAP_LINK}" target="_blank" rel="noopener">м. Коростишів, вул. Партизанська-117<br>Коростишівський гранітний завод</a></address>
      </div>
      <div class="footer-online">
        <strong>Електронна пошта</strong>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
      </div>
    </div>
    <div class="container footer-bottom"><span>© 1995–2026 KAMENOTES</span><span>Виробляємо в Коростишеві · працюємо по Україні</span></div>
  </footer>
  <div class="mobile-actions" aria-label="Швидкий зв'язок">
    <a class="mobile-action" href="tel:${PHONE_MAIN}" aria-label="Зателефонувати">${phoneIcon()}</a>
    <a class="mobile-action mobile-viber" href="${VIBER_BASE}" aria-label="Написати у Viber">${viberIcon()}</a>
  </div>
  <div class="lightbox" id="lightbox" aria-hidden="true">
    <div class="lightbox-backdrop" data-lightbox-close></div>
    <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="lightboxTitle">
      <button class="lightbox-close" type="button" data-lightbox-close aria-label="Закрити перегляд">&times;</button>
      <div class="lightbox-media-col">
        <img id="lightboxImg" src="" alt="">
        <button class="lightbox-zoom" id="lightboxZoom" type="button" aria-pressed="false" aria-label="Показати фото у вихідному розмірі" title="Масштаб фото">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M8 11h6M11 8v6"/></svg>
        </button>
      </div>
      <aside class="lightbox-panel">
        <div class="lightbox-meta-line">
          <span id="lightboxSku"></span>
          <span id="lightboxCat"></span>
        </div>
        <h2 id="lightboxTitle" class="lightbox-title"></h2>
        <p id="lightboxPhotoMeta" class="lightbox-photo-meta"></p>
        <div class="lightbox-product-only">
          <div class="lightbox-price-row">
            <span>Ціна виробника</span>
            <strong id="lightboxPrice">від 5 900 грн</strong>
          </div>
          <div class="lightbox-specs-block">
            <h3>Комплектація</h3>
            <ul id="lightboxSpecsList" class="lightbox-specs-list"></ul>
          </div>
          <div class="lightbox-actions-row">
            <a id="lightboxViber" class="btn btn-viber lightbox-viber-btn" href="${VIBER_BASE}" target="_blank" rel="noopener">${viberIcon()}<span>Уточнити вартість у Viber</span></a>
            <a class="lightbox-call-link" href="tel:${PHONE_MAIN}">${phoneIcon()}<span>${PHONE_MAIN_LABEL}</span></a>
          </div>
          <p class="lightbox-note">Точна вартість залежить від каменю, розмірів, оформлення та монтажу.</p>
        </div>
      </aside>
    </div>
  </div>`;
}

function pageShell({ title, description, active, body }) {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="img/suhorez_blade.svg">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v=20260914-luxury-v4">
  <link rel="stylesheet" href="css/design-system.css?v=20260914-footer-contact">
</head>
<body>
  <a class="skip-link" href="#main">Перейти до змісту</a>
  ${renderHeader(active)}
  <main id="main">
${body}
  </main>
  ${renderFooter()}
  <script src="js/main.js?v=20260914-modern"></script>
</body>
</html>
`;
}

function renderProductCard(product, options = {}) {
  const item = productForPublic(product);
  const viberHref = productViberHref(item);
  const specs = item.specs && item.specs.length
    ? item.specs
    : ['Натуральне Букинське габро', 'Пряма різка у цеху Коростишева', 'Дзеркальне водне полірування фасок'];

  const specsAttr = escapeAttr(specs.join('||'));
  const priceFormatted = formatPrice(item.price);

  return `<article class="product-card ${escapeAttr(item.category)}" data-category="${escapeAttr(item.category)}" data-search="${escapeAttr(`${item.sku} ${item.title} ${specs.join(' ')}`.toLowerCase())}">
    <button class="product-media js-lightbox" type="button"
      data-image="${escapeAttr(item.img)}"
      data-title="${escapeAttr(item.title)}"
      data-sku="Арт. ${escapeAttr(item.sku)}"
      data-category="${escapeAttr(categoryName(item.category))}"
      data-badge="${escapeAttr(item.badge || '')}"
      data-price="від ${priceFormatted} грн"
      data-specs="${specsAttr}"
      data-viber="${escapeAttr(viberHref)}"
      aria-label="Збільшити та переглянути ${escapeAttr(item.sku)}">
      <img src="${escapeAttr(item.img)}" alt="${escapeAttr(item.title)}" loading="lazy">
    </button>
    <div class="product-body">
      <div class="product-topline">
        <span>Арт. ${escapeHtml(item.sku)}</span>
        <span>${escapeHtml(categoryName(item.category))}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <div class="product-price">
        <strong>від ${priceFormatted} грн</strong>
        <button class="product-detail js-lightbox" type="button"
          data-image="${escapeAttr(item.img)}"
          data-title="${escapeAttr(item.title)}"
          data-sku="Арт. ${escapeAttr(item.sku)}"
          data-category="${escapeAttr(categoryName(item.category))}"
          data-badge="${escapeAttr(item.badge || '')}"
          data-price="від ${priceFormatted} грн"
          data-specs="${specsAttr}"
          data-viber="${escapeAttr(viberHref)}"
          aria-label="Переглянути деталі ${escapeAttr(item.sku)}">${arrowIcon()}</button>
      </div>
    </div>
  </article>`;
}

function sectionHeading(kicker, title, text = '') {
  return `<div class="section-heading">
    <p class="kicker">${escapeHtml(kicker)}</p>
    <h2>${escapeHtml(title)}</h2>
    ${text ? `<p>${escapeHtml(text)}</p>` : ''}
  </div>`;
}

function formatReviewDate(date) {
  const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
  const [year, month, day] = String(date).split('-').map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

function renderReviewCard(review, compact = false) {
  const images = Array.isArray(review.images) ? review.images : [];
  const visibleImages = compact ? images.slice(0, 1) : images.slice(0, 2);
  const city = review.city || (String(review.name).match(/,\s*([^,]+)$/) || String(review.title).match(/,\s*([^,]+)$/) || [])[1] || '';
  const name = city && String(review.name).endsWith(city) ? String(review.name).slice(0, String(review.name).lastIndexOf(',')).trim() : review.name;
  const year = String(review.date).slice(0, 4);
  const gallery = visibleImages.length ? `<div class="review-gallery">
    ${visibleImages.map((image, index) => `<button class="review-image js-lightbox" type="button" data-image="${escapeAttr(image)}" data-title="${escapeAttr(review.title)}" data-meta="${escapeAttr(review.name)}" aria-label="Переглянути фото роботи для ${escapeAttr(review.name)}, ${index + 1}"><img src="${escapeAttr(image)}" alt="Робота KAMENOTES до відгуку ${escapeAttr(review.name)}" loading="lazy"></button>`).join('')}
  </div>` : '';
  return `<article class="review-card editorial-quote ${compact ? 'quote-featured' : 'quote-archive'} ${images.length ? 'quote-with-image' : 'quote-text-only'}">
    <div class="quote-copy">
      <blockquote>${escapeHtml(review.text)}</blockquote>
      <div class="quote-attribution"><strong>${escapeHtml(name)}</strong><span>${city ? escapeHtml(city) + ' · ' : ''}<time datetime="${escapeAttr(review.date)}">${escapeHtml(year)}</time></span></div>
    </div>
    ${gallery}
  </article>`;
}

function renderIndex(products) {
  const reviews = readReviews().filter(review => review.published !== false);
  const byId = new Map(products.map(product => [product.id, product]));
  const featured = FEATURED_IDS.map(id => byId.get(id)).filter(Boolean);
  const fallbackFeatured = featured.length >= 6 ? featured : products.slice(0, 6);
  const showcase = fallbackFeatured.slice(0, 6).map(product => renderProductCard(product, { compact: true })).join('\n');
  const homeReviewIds = ['review-2014-05-andrii-mykolaiv', 'review-2018-10-ludmyla-v', 'review-2014-04-iryna'];
  const homeReviewMarkup = homeReviewIds.map((id, index) => {
    const review = reviews.find(item => item.id === id);
    if (!review) return '';
    const displayReview = index === 0 ? review : { ...review, images: [] };
    let markup = renderReviewCard(displayReview, true);
    if (index === 0) {
      markup = markup.replace('<div class="quote-copy">', '<div class="quote-copy"><p class="kicker">Історія замовлення</p>');
    } else {
      markup = markup.replace('quote-featured', 'quote-short');
    }
    return markup;
  }).join('\n');

  const body = `    <section class="home-hero">
      <div class="container home-hero-layout">
        <div class="home-hero-copy">
          <p class="kicker">KAMENOTES · Коростишів</p>
          <h1><span>Моноліт та час.</span>Гранітна мануфактура<br>з 1995 року.</h1>
          <p class="hero-copy">Виготовляємо пам'ятники з натурального граніту та габро у власному цеху. Показуємо реальні моделі, чесні ціни виробника і беремо відповідальність за монтаж.</p>
          <div class="hero-actions">
            <a class="btn btn-dark" href="catalog.html">Дивитися каталог <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>
            <a class="btn btn-viber" href="viber://chat?number=%2B380977157915&draft=%D0%92%D1%96%D1%82%D0%B0%D1%8E!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BF%D1%80%D0%BE%D1%80%D0%B0%D1%85%D1%83%D0%B2%D0%B0%D1%82%D0%B8%20%D0%BF%D0%B0%D0%BC'%D1%8F%D1%82%D0%BD%D0%B8%D0%BA%20%D1%83%20KAMENOTES."><img class="viber-img" src="img/viber-white.svg" alt="" aria-hidden="true"> <span>Прорахунок у Viber</span></a>
          </div>
          <dl class="hero-proof">
            <div><dt>30+</dt><dd>років у каменеобробці</dd></div>
            <div><dt>власний цех</dt><dd>розпил, полірування, гравірування</dd></div>
            <div><dt>Коростишів</dt><dd>український камінь і майстерність</dd></div>
          </dl>
        </div>
        <figure class="home-hero-visual">
          <img src="img/production/workshop_07.jpg" alt="Майстер KAMENOTES біля портальної пили у Коростишеві">
          <figcaption><span>01</span> Власне виробництво · Коростишів</figcaption>
        </figure>
      </div>
    </section>

    <section class="section home-featured surface-section">
      <div class="container">
        <div class="section-heading">
    <p class="kicker">Популярні моделі</p>
    <h2>Пам&#039;ятники з цінами виробника</h2>
    <p>Класичні та різьблені моделі з натурального каменю. Точна вартість залежить від розмірів, породи граніту й художнього оформлення.</p>
  </div>
        <div class="product-grid featured-grid">${showcase}</div>
        <div class="section-action"><a class="btn btn-dark" href="catalog.html">Відкрити повний каталог <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a></div>
      </div>
    </section>

    <section class="section home-process">
      <div class="container">
        <div class="home-process-heading">
          <div class="section-heading">
            <p class="kicker">Власна мануфактура · з 1995 року</p>
            <h2>Камінь. Руки майстра.<br>Відповідальність за результат.</h2>
            <p>Від першого розпилу до останньої літери — працюємо з каменем у власному цеху в Коростишеві. Ви спілкуєтеся безпосередньо з виробником.</p>
          </div>
          <a class="text-link" href="vyrobnytstvo.html">Усередині мануфактури <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>
        </div>
        <div class="home-process-images">
          <figure><img src="img/production/workshop_01.jpg" alt="Розпил гранітних плит у цеху KAMENOTES" loading="lazy"><figcaption>01 / Розпил та обробка каменю</figcaption></figure>
          <figure><img src="img/kamenotes/services_hudozhnik_pamyatnikov.jpg" alt="Ручне гравірування портрета на граніті" loading="lazy"><figcaption>02 / Ручна художня робота</figcaption></figure>
        </div>
        <div class="home-capabilities">
          <article><h3>Точність у деталях</h3><p>Розпил, окантовування та полірування — на власному обладнанні.</p></article>
          <article><h3>Ручна художня робота</h3><p>Портрети, написи й орнаменти виконує майстер по каменю.</p></article>
          <article><h3>Повний цикл</h3><p>Погоджуємо проєкт, виготовляємо, доставляємо та встановлюємо.</p></article>
        </div>
      </div>
    </section>

    <section class="section home-materials">
      <div class="container home-stone-layout">
        <figure class="home-stone-image">
          <img src="img/production/workshop_16.jpg" alt="Натуральні кам’яні плити на складі мануфактури" width="640" height="480" loading="lazy">
          <figcaption>Камінь на нашому складі</figcaption>
        </figure>
        <div class="home-stone-copy">
          <p class="kicker">Матеріали</p>
          <h2>Природний рисунок.<br>Ваш вибір каменю.</h2>
          <p>Букинське габро, граніт або лабрадорит — допоможемо підібрати породу під модель, оформлення та бюджет.</p>
          <ul class="home-stone-names" aria-label="Породи каменю">
            <li>Букинське габро</li><li>Граніт</li><li>Лабрадорит</li>
          </ul>
          <a class="text-link" href="kontakty.html">Подивитися камінь наживо <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>
        </div>
      </div>
    </section>

    <section class="section home-order">
      <div class="container">
        <div class="section-heading">
          <p class="kicker">Як відбувається замовлення</p>
          <h2>Зрозуміло<br>на кожному кроці.</h2>
          <p>Можна приїхати до нас у Коростишів або погодити всі деталі дистанційно.</p>
        </div>
        <ol class="home-order-list">
          <li><span>01</span><h3>Надсилаєте модель або ескіз</h3><p>Називаєте артикул із каталогу чи надсилаєте власний приклад у Viber.</p></li>
          <li><span>02</span><h3>Погоджуємо проєкт і кошторис</h3><p>Уточнюємо розміри, камінь, оформлення, термін, доставку та монтаж.</p></li>
          <li><span>03</span><h3>Виготовляємо у власному цеху</h3><p>Запускаємо погоджений проєкт у роботу та контролюємо кожен етап.</p></li>
          <li><span>04</span><h3>Доставляємо та встановлюємо</h3><p>Комплектуємо замовлення, привозимо на місце й виконуємо монтаж.</p></li>
        </ol>
      </div>
    </section>

    <section class="section reviews-preview">
      <div class="container">
        <div class="section-heading">
          <p class="kicker">Довіра клієнтів</p>
          <h2>Найважливіше —<br>слова наших замовників.</h2>
          <p>Реальні історії, готові роботи та вдячність, яку ми бережемо.</p>
        </div>
        <div class="reviews-grid reviews-grid-preview">${homeReviewMarkup}</div>
        <div class="section-action"><a class="btn btn-dark" href="vidguky.html">Усі відгуки <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a></div>
      </div>
    </section>

    <section class="section dark-cta">
      <div class="container cta-grid">
        <div><p class="kicker">Обговорімо ваше замовлення</p><h2>Почнемо з вашого задуму.</h2><p>Надішліть артикул із каталогу або власний ескіз у Viber. Допоможемо з вибором і прорахуємо вартість.</p></div>
        <div class="cta-actions"><a class="btn btn-viber" href="viber://chat?number=%2B380977157915&draft=%D0%92%D1%96%D1%82%D0%B0%D1%8E!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BF%D1%80%D0%BE%D1%80%D0%B0%D1%85%D1%83%D0%B2%D0%B0%D1%82%D0%B8%20%D0%BF%D0%B0%D0%BC'%D1%8F%D1%82%D0%BD%D0%B8%D0%BA.%20%D0%9D%D0%B0%D0%B4%D1%96%D1%88%D0%BB%D1%8E%20%D0%B0%D1%80%D1%82%D0%B8%D0%BA%D1%83%D0%BB%20%D0%B0%D0%B1%D0%BE%20%D0%B5%D1%81%D0%BA%D1%96%D0%B7."><img class="viber-img" src="img/viber-white.svg" alt="" aria-hidden="true"> <span>Написати у Viber</span></a><a class="btn btn-outline-light" href="tel:+380977157915"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span>097 715 79 15</span></a></div>
      </div>
    </section>

    <section class="section home-contact">
      <div class="container split-grid contact-preview">
        <div><p class="kicker">Контакти виробництва</p><h2>Чекаємо на вас у Коростишеві</h2><p class="lead-copy">м. Коростишів, вул. Партизанська-117, Коростишівський гранітний завод. Приїжджайте обрати камінь, подивитися цех і погодити деталі замовлення.</p><div class="contact-preview-links"><a href="tel:+380977157915">+38 (097) 715-79-15</a><a href="mailto:suhorez@ukr.net">suhorez@ukr.net</a></div><a class="btn btn-dark" href="kontakty.html">Контакти та карта <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a></div>
        <div class="map-panel">
    <div class="map-panel-head">
      <div>
        <strong>м. Коростишів, вул. Партизанська-117</strong>
        <span>Коростишівський гранітний завод KAMENOTES</span>
      </div>
      <a href="https://maps.app.goo.gl/QTLZb45coBpbMcQA9" target="_blank" rel="noopener">Google Maps</a>
    </div>
    <iframe title="Карта проїзду до KAMENOTES" src="https://maps.google.com/maps?cid=3098147558844695308&amp;ll=50.3281248,29.082698&amp;z=16&amp;hl=uk&amp;output=embed" width="100%" height="420" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
      </div>
    </section>`;
  return pageShell({
    title: "Виготовлення пам'ятників з граніту в Коростишеві | KAMENOTES",
    description: "KAMENOTES у Коростишеві: виготовлення гранітних пам'ятників від виробника, каталог з цінами, власний цех, 3D-проєктування, доставка та монтаж.",
    active: 'home',
    body
  }).replace('<main id="main">', '<main id="main" class="home-page">')
    .replace('</head>', '  <link rel="stylesheet" href="css/home.css?v=20260914-home-2">\n</head>');
}
function renderReviews(reviews) {
  const published = reviews.filter(review => review.published !== false);
  const lead = published.find(review => review.id === 'review-2014-05-andrii-mykolaiv') || published[0];
  const storyIds = [
    'review-2018-10-ludmyla-v',
    'review-2017-07-oksana',
    'review-2017-10-ludmyla-filina',
    'review-2018-06-petro',
    'review-2015-03-nadiia',
    'review-2013-10-olena'
  ];
  const stories = storyIds.map(id => published.find(review => review.id === id)).filter(Boolean);

  const reviewPerson = review => {
    const city = review.city || (String(review.name).match(/,\s*([^,]+)$/) || String(review.title).match(/,\s*([^,]+)$/) || [])[1] || '';
    const name = city && String(review.name).endsWith(city) ? String(review.name).slice(0, String(review.name).lastIndexOf(',')).trim() : review.name;
    return { city, name, year: String(review.date).slice(0, 4) };
  };
  const reviewImage = (review, className) => {
    const image = Array.isArray(review.images) ? review.images[0] : '';
    if (!image) return '';
    return `<button class="${className} js-lightbox" type="button" data-image="${escapeAttr(image)}" data-title="${escapeAttr(review.title)}" data-meta="${escapeAttr(review.name)}" aria-label="Переглянути готову роботу: ${escapeAttr(review.name)}"><img src="${escapeAttr(image)}" alt="Готова робота KAMENOTES. Замовник: ${escapeAttr(review.name)}" loading="lazy"></button>`;
  };
  const renderStory = review => {
    const person = reviewPerson(review);
    return `<article class="reviews-story">
      ${reviewImage(review, 'reviews-story-image')}
      <blockquote>${escapeHtml(review.text)}</blockquote>
      <footer><strong>${escapeHtml(person.name)}</strong><span>${person.city ? escapeHtml(person.city) + ' · ' : ''}<time datetime="${escapeAttr(review.date)}">${escapeHtml(person.year)}</time></span></footer>
    </article>`;
  };
  const leadPerson = reviewPerson(lead);

  const body = `    <section class="section reviews-page-hero">
      <div class="container reviews-page-hero-grid">
        <div><p class="kicker">Відгуки клієнтів</p><h1>Роботи, яким<br>довіряють родини.</h1></div>
        <div class="reviews-page-hero-copy">
          <p>Тут — слова замовників і фотографії готових пам'ятників. Вони найкраще показують якість нашої роботи.</p>
          <div class="hero-actions"><a class="btn btn-dark" href="catalog.html">Перейти до каталогу ${arrowIcon()}</a><a class="btn btn-viber" href="${VIBER_BASE}">${viberIcon()} <span>Написати у Viber</span></a></div>
        </div>
      </div>
    </section>

    <section class="section reviews-lead-story surface-section">
      <div class="container reviews-lead-grid">
        <div class="reviews-lead-copy">
          <h2>Замовлення на відстані — від розмови до готової роботи.</h2>
          <blockquote>${escapeHtml(lead.text)}</blockquote>
          <div class="reviews-person"><strong>${escapeHtml(leadPerson.name)}</strong><span>${leadPerson.city ? escapeHtml(leadPerson.city) + ' · ' : ''}<time datetime="${escapeAttr(lead.date)}">${escapeHtml(leadPerson.year)}</time></span></div>
        </div>
        ${reviewImage(lead, 'reviews-lead-image')}
      </div>
    </section>

    <section class="section reviews-stories">
      <div class="container">
        <div class="reviews-stories-heading"><h2>Ще кілька історій</h2><p>Про виготовлення, художню роботу, доставку та встановлення.</p></div>
        <div class="reviews-stories-grid">${stories.map(renderStory).join('\n')}</div>
      </div>
    </section>

    <section class="section dark-cta">
      <div class="container cta-grid">
        <div><p class="kicker">Почнемо з вашого задуму</p><h2>Надішліть модель або ескіз</h2><p>Підберемо камінь, уточнимо оформлення та прорахуємо вартість.</p></div>
        <div class="cta-actions"><a class="btn btn-viber" href="${VIBER_BASE}&draft=${encodeURIComponent("Вітаю! Хочу замовити прорахунок пам'ятника.")}">${viberIcon()} <span>Написати у Viber</span></a><a class="btn btn-outline-light" href="tel:${PHONE_MAIN}">${phoneIcon()} <span>${PHONE_MAIN_LABEL}</span></a></div>
      </div>
    </section>`;

  return pageShell({
    title: "Відгуки клієнтів про пам'ятники | KAMENOTES",
    description: "Відгуки клієнтів KAMENOTES про виготовлення, художнє оформлення, доставку та встановлення гранітних пам'ятників.",
    active: 'reviews',
    body
  }).replace('<main id="main">', '<main id="main" class="reviews-page">')
    .replace('</head>', '  <link rel="stylesheet" href="css/reviews.css?v=20260914-reviews-2">\n</head>');
}
function renderCatalog(products) {
  const counts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    acc.all += 1;
    return acc;
  }, { all: 0 });

  const filters = CATEGORIES.map(category => {
    const count = counts[category.id] || 0;
    if (category.id !== 'all' && count === 0) return '';
    const active = category.id === 'all' ? ' active' : '';
    return `<button class="filter-btn${active}" type="button" data-filter="${category.id}">${category.label}<span>${count}</span></button>`;
  }).join('\n          ');

  const body = `    <section class="page-hero catalog-hero">
      <img class="hero-image" src="img/cover-1.jpg" alt="Цех KAMENOTES у Коростишеві">
      <div class="hero-overlay"></div>
      <div class="container page-hero-inner">
        <p class="kicker hero-kicker">Прямі ціни від виробника</p>
        <h1>Каталог гранітних пам'ятників</h1>
        <p>Оберіть модель, перевірте комплектацію та надішліть артикул у Viber для точного прорахунку з оформленням, доставкою і монтажем.</p>
      </div>
    </section>

    <section class="section catalog-section">
      <div class="container">
        <div class="catalog-toolbar">
          <label class="search-field">
            ${searchIcon()}
            <span class="sr-only">Пошук за артикулом або назвою</span>
            <input id="catalogSearchInput" type="search" placeholder="Пошук: КМ-1, ВСК, хрест, огорожа">
          </label>
          <div class="catalog-note">
            <strong>${counts.all}</strong>
            <span>позицій у каталозі</span>
          </div>
        </div>
        <div class="catalog-filters" aria-label="Фільтр категорій">
          ${filters}
        </div>
        <p class="catalog-empty" id="catalogEmpty" hidden>За цим запитом нічого не знайдено.</p>
        <div class="product-grid catalog-grid" id="catalogGrid">
          ${products.map(product => renderProductCard(product)).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section dark-cta">
      <div class="container cta-grid">
        <div>
          <p class="kicker">Індивідуальне замовлення</p>
          <h2>Не знайшли точний варіант?</h2>
          <p>Виготовимо пам'ятник за ескізом, фото або кресленням. Підготуємо кошторис і погодимо 3D-візуалізацію перед запуском у роботу.</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-viber" href="${VIBER_BASE}&draft=${encodeURIComponent("Вітаю! Маю власний ескіз для прорахунку пам'ятника.")}">${viberIcon()} <span>Надіслати ескіз</span></a>
          <a class="btn btn-outline-light" href="tel:${PHONE_SALES}">${phoneIcon()} <span>${PHONE_SALES_LABEL}</span></a>
        </div>
      </div>
    </section>`;

  return pageShell({
    title: "Каталог гранітних пам'ятників з цінами | KAMENOTES Коростишів",
    description: "Каталог пам'ятників KAMENOTES з цінами виробника: одинарні, подвійні, військові ЗСУ, хрести, огорожі та авторські моделі цеху.",
    active: 'catalog',
    body
  });
}

function renderProduction() {
  const body = `    <section class="production-page-hero">
      <div class="container production-hero-grid">
        <div class="production-hero-copy">
          <p class="kicker">Власне виробництво · Коростишів</p>
          <h1>Від каменю<br>до готового пам’ятника.</h1>
          <p class="production-hero-lead">Ми самі розпилюємо, поліруємо, оформлюємо та готуємо виріб до монтажу. Ви можете побачити цех і обрати камінь наживо.</p>
          <div class="production-hero-actions">
            <a class="btn btn-dark" href="catalog.html">Переглянути каталог ${arrowIcon()}</a>
            <a class="btn btn-light" href="${MAP_LINK}" target="_blank" rel="noopener">Запланувати візит</a>
          </div>
          <dl class="production-proof" aria-label="Переваги виробництва">
            <div><dt>30+</dt><dd>років досвіду</dd></div>
            <div><dt>1 цех</dt><dd>повний цикл робіт</dd></div>
            <div><dt>Україна</dt><dd>доставка та монтаж</dd></div>
          </dl>
        </div>
        <figure class="production-hero-media">
          <button class="js-lightbox" type="button" data-image="img/production/workshop_07.jpg" data-title="Цех KAMENOTES" data-meta="Коростишів" aria-label="Збільшити фото виробництва"><img src="img/production/workshop_07.jpg" alt="Майстер KAMENOTES біля портальної пили в каменеобробному цеху"></button>
          <figcaption>Реальний цех KAMENOTES у Коростишеві</figcaption>
        </figure>
      </div>
    </section>

    <section class="production-cycle-band">
      <div class="container">
        <div class="production-cycle-heading">
          <p class="kicker">Повний цикл</p>
          <h2>Одна команда відповідає за кожен етап.</h2>
        </div>
        <ol class="production-cycle-list">
          <li><span>01</span><div><h3>Добір каменю</h3><p>Підбираємо породу, колір і товщину під модель та бюджет.</p></div></li>
          <li><span>02</span><div><h3>Точна обробка</h3><p>Розпилюємо деталі, вирівнюємо площини та поліруємо край.</p></div></li>
          <li><span>03</span><div><h3>Оформлення</h3><p>Погоджуємо портрет, написи й декоративні елементи.</p></div></li>
          <li><span>04</span><div><h3>Монтаж</h3><p>Перевіряємо комплект, доставляємо та встановлюємо.</p></div></li>
        </ol>
      </div>
    </section>

    <section class="section production-work">
      <div class="container">
        <div class="production-work-heading">
          <div><p class="kicker">Усередині цеху</p><h2>Техніка дає точність.<br>Майстер — характер.</h2></div>
          <p>Три ключові операції формують вигляд і довговічність готового виробу.</p>
        </div>
        <div class="production-work-grid">
          <article class="production-work-item production-work-item-wide">
            <button class="js-lightbox" type="button" data-image="img/production/workshop_03.jpg" data-title="Розпил натурального граніту" data-meta="Обробка з подачею води" aria-label="Збільшити фото розпилу граніту"><img src="img/production/workshop_03.jpg" alt="Диск обробляє граніт із подачею води" loading="lazy"></button>
            <div><span>01</span><h3>Розпил і геометрія</h3><p>Точний розмір кожної деталі починається з першого проходу.</p></div>
          </article>
          <article class="production-work-item">
            <button class="js-lightbox" type="button" data-image="img/production/workshop_01.jpg" data-title="Полірування та контроль площин" data-meta="Власний каменеобробний цех" aria-label="Збільшити фото робочої зони"><img src="img/production/workshop_01.jpg" alt="Портальна пила і гранітні плити в цеху" loading="lazy"></button>
            <div><span>02</span><h3>Полірування</h3><p>Виводимо рівну поверхню, чисту фаску й глибокий блиск каменю.</p></div>
          </article>
          <article class="production-work-item">
            <button class="js-lightbox" type="button" data-image="img/kamenotes/services_hudozhnik_pamyatnikov.jpg" data-title="Ручне гравірування портрета" data-meta="Художня майстерня KAMENOTES" aria-label="Збільшити фото художньої роботи"><img src="img/kamenotes/services_hudozhnik_pamyatnikov.jpg" alt="Майстер вручну гравірує портрет на граніті" loading="lazy"></button>
            <div><span>03</span><h3>Робота художника</h3><p>Портрет і написи переносимо на камінь тільки після погодження.</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="production-material-band">
      <div class="container production-material-row">
        <div><p class="kicker">Натуральний камінь</p><h2>Оберіть матеріал наживо.</h2></div>
        <p>Букинське габро, Покостівка, Лезники та лабрадорит. На складі можна порівняти природний рисунок і якість полірування.</p>
        <a class="text-link" href="kontakty.html">Як до нас доїхати ${arrowIcon()}</a>
      </div>
    </section>

    <section class="section production-control">
      <div class="container production-control-grid">
        <figure><img src="img/production/workshop_12.jpg" alt="Готові моделі пам'ятників на території KAMENOTES" loading="lazy"><figcaption>Готові моделі на території виробництва</figcaption></figure>
        <div class="production-control-copy">
          <p class="kicker">Контроль перед монтажем</p>
          <h2>Спочатку перевіряємо. Потім відправляємо.</h2>
          <ul>
            <li><strong>Суха збірка</strong><span>Перевіряємо стики, комплектність і стійкість конструкції.</span></li>
            <li><strong>Фото погодження</strong><span>Показуємо готовий виріб до доставки.</span></li>
            <li><strong>Монтаж за договором</strong><span>Готуємо основу, встановлюємо та герметизуємо стики.</span></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section production-control">
      <div class="container production-control-grid">
        <figure><img src="img/production/workshop_10.jpg" alt="Виробництво гранітної бруківки у Коростишеві" loading="lazy"><figcaption>Власне виробництво бруківки та шашки з граніту</figcaption></figure>
        <div class="production-control-copy">
          <p class="kicker">Супутня продукція · Власний цех</p>
          <h2>Гранітна бруківка оптом та шашка з каменю</h2>
          <p style="margin: 12px 0 16px; color: var(--muted); line-height: 1.6;">Виготовляємо бруківку всіх видів для дорожнього мощення, меморіальних майданчиків та благоустрою території безпосередньо в каменеобробному цеху в Коростишеві.</p>
          <ul>
            <li><strong>Колота та пиляно-колота</strong><span>Висока міцність, природний колотий рельєф, стійкість до будь-яких погодних навантажень.</span></li>
            <li><strong>Повнопиляна термооброблена</strong><span>Ідеально рівна геометрія швів зі спеціальною антиковзкою термообробленою поверхнею.</span></li>
            <li><strong>Галтована шашка (згладжена)</strong><span>Скруглені грані під старовинну бруківку, приємна округла фактура натурального каменю.</span></li>
            <li><strong>Породи та розрахунок</strong><span>Чорне габро, сіра Покостівка, червоні Лезники. Оптові партії з розрахунком вартості за м².</span></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section dark-cta production-cta">
      <div class="container cta-grid">
        <div><p class="kicker">Візит на виробництво</p><h2>Побачте камінь і цех до замовлення</h2><p>Оцініть колір, полірування, товщину стели та готові моделі. При замовленні повертаємо витрати на дорогу.</p></div>
        <div class="cta-actions"><a class="btn btn-light" href="${MAP_LINK}" target="_blank" rel="noopener">Відкрити карту ${arrowIcon()}</a><a class="btn btn-outline-light" href="tel:${PHONE_MAIN}">${phoneIcon()} <span>${PHONE_MAIN_LABEL}</span></a></div>
      </div>
    </section>`;

  return pageShell({
    title: "Виробництво та цех пам'ятників | KAMENOTES Коростишів",
    description: "Власне виробництво KAMENOTES у Коростишеві: фото цеху, розпил граніту, водне полірування, ручне гравірування, доставка та монтаж.",
    active: 'production',
    body
  }).replace('</head>', '  <link rel="stylesheet" href="css/production.css?v=20260914-production-1">\n</head>');
}
function renderMapFrame() {
  return `<div class="map-panel">
    <div class="map-panel-head">
      <div>
        <strong>м. Коростишів, вул. Партизанська-117</strong>
        <span>Коростишівський гранітний завод KAMENOTES</span>
      </div>
      <a href="${MAP_LINK}" target="_blank" rel="noopener">Google Maps</a>
    </div>
    <iframe title="Карта проїзду до KAMENOTES" src="https://maps.google.com/maps?cid=3098147558844695308&amp;ll=50.3281248,29.082698&amp;z=16&amp;hl=uk&amp;output=embed" width="100%" height="420" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>`;
}

function contactRow(label, value, href, note) {
  return `<article class="contact-card">
    <p class="kicker">${escapeHtml(label)}</p>
    <h3><a href="${escapeAttr(href)}">${escapeHtml(value)}</a></h3>
    <p>${escapeHtml(note)}</p>
  </article>`;
}

function renderContacts() {
  const body = `<section class="section contacts-editorial">
    <div class="container contacts-composition">
      <div class="contacts-copy">
        <p class="kicker">KAMENOTES / Контакти</p>
        <h1>Зустрінемось<br>у Коростишеві</h1>
        <address class="contacts-address">вул. Партизанська-117<span>Коростишівський гранітний завод</span></address>
        <div class="contacts-main-phone"><span>Олександр / Юрій · Керівництво та виробництво</span><a href="tel:${PHONE_MAIN}">+38 (097) 715-79-15</a></div>
        <dl class="contacts-directory">
          <div><dt>Відділ продажу</dt><dd><a href="tel:${PHONE_SALES}">+38 (097) 604-61-44</a></dd></div>
          <div><dt>Цех і відвантаження</dt><dd><a href="tel:${PHONE_SHOP}">+38 (099) 931-45-20</a></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:${EMAIL}">${EMAIL}</a></dd></div>
        </dl>
        <div class="contact-actions"><a class="btn btn-viber" href="${VIBER_BASE}">${viberIcon()} <span>Написати у Viber</span></a><a class="btn btn-dark" href="tel:${PHONE_MAIN}">${phoneIcon()} <span>Подзвонити</span></a></div>
        <p class="contacts-hours">Пн–Сб: 08:00–18:00. Неділя: за домовленістю.<br>Час візиту узгодьте за телефоном.</p>
      </div>
      <div class="contacts-map">
        ${renderMapFrame()}
        <a class="text-link" href="${MAP_LINK}" target="_blank" rel="noopener">Прокласти маршрут ${arrowIcon()}</a>
      </div>
    </div>
  </section>
  <section class="section surface-section routes-section">
    <div class="container">
      <div class="routes-intro">
        <p class="kicker">Схеми доїзду</p>
        <h2>Як доїхати до виробництва</h2>
      </div>
      <div class="routes-grid">
        <article class="route-card">
          <div class="route-card-content">
            <div class="route-card-text">
              <h3>Як їхати до нас з напрямку Києва</h3>
              <p>Траса М-06 / E40 · ~107 км · орієнтовно 1 год 26 хв у дорозі від виїзду з Києва</p>
            </div>
            <a class="text-link route-link" href="${ROUTE_KIEV_LINK}" target="_blank" rel="noopener">Відкрити маршрут на Google Maps ${arrowIcon()}</a>
          </div>
          <a class="route-image-wrap" href="${ROUTE_KIEV_LINK}" target="_blank" rel="noopener" aria-label="Відкрити маршрут з Києва на Google Maps">
            <img class="route-img" src="img/kamenotes/map-from-kiev.jpg" alt="Як їхати до нас з напрямку Києва" width="1280" height="230" loading="lazy">
          </a>
        </article>
        <article class="route-card">
          <div class="route-card-content">
            <div class="route-card-text">
              <h3>Як їхати до нас з напрямку Житомира</h3>
              <p>Траса М-06 / E40 · ~41 км · орієнтовно 37 хв у дорозі від виїзду з Житомира</p>
            </div>
            <a class="text-link route-link" href="${ROUTE_ZT_LINK}" target="_blank" rel="noopener">Відкрити маршрут на Google Maps ${arrowIcon()}</a>
          </div>
          <a class="route-image-wrap" href="${ROUTE_ZT_LINK}" target="_blank" rel="noopener" aria-label="Відкрити маршрут з Житомира на Google Maps">
            <img class="route-img" src="img/kamenotes/map-from-zt.jpg" alt="Як їхати до нас з напрямку Житомира" width="1280" height="467" loading="lazy">
          </a>
        </article>
      </div>
    </div>
  </section>`;
  return pageShell({
    title: "Контакти та проїзд до заводу | KAMENOTES Коростишів",
    description: "Контакти KAMENOTES: м. Коростишів, вул. Партизанська-117, телефони керівництва, відділу продажу, цеху, email і точна карта проїзду.",
    active: 'contacts',
    body
  });
}

function renderCss() {
  return `:root {
  --bg: #ffffff;
  --surface: #f9fafb;
  --surface-strong: #f3f4f6;
  --text: #1f2937;
  --muted: #64748b;
  --soft: #94a3b8;
  --line: #e5e7eb;
  --graphite: #111827;
  --graphite-2: #1f2937;
  --stone: #a16207;
  --green: #166534;
  --viber: #7360f2;
  --viber-hover: #5d4bd6;
  --container: 1240px;
  --radius: 8px;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.09);
  --shadow-soft: 0 10px 25px rgba(15, 23, 42, 0.07);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  letter-spacing: 0;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body.lightbox-open {
  overflow: hidden;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1,
h2,
h3 {
  font-family: "Lora", Georgia, serif;
  color: var(--graphite);
  line-height: 1.18;
  letter-spacing: 0;
}

h1 {
  font-size: 72px;
}

h2 {
  font-size: 42px;
}

h3 {
  font-size: 21px;
}

:focus-visible {
  outline: 3px solid rgba(161, 98, 7, 0.42);
  outline-offset: 3px;
}

.skip-link {
  position: absolute;
  left: 20px;
  top: 8px;
  z-index: 9999;
  transform: translateY(-150%);
  background: var(--graphite);
  color: #ffffff;
  padding: 10px 14px;
  border-radius: 6px;
}

.skip-link:focus {
  transform: translateY(0);
}

.container {
  width: min(100% - 40px, var(--container));
  margin-inline: auto;
}

.top-notice {
  display: none !important;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(14px);
}

.header-grid {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  min-height: 86px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.brand-blade {
  width: 64px;
  height: 64px;
  flex: 0 0 auto;
}

.blade-spin {
  display: inline-block;
  animation: blade-spin 10s linear infinite !important;
  -webkit-animation: blade-spin 10s linear infinite !important;
  transform-origin: 50% 50% !important;
  -webkit-transform-origin: 50% 50% !important;
  will-change: transform;
}

@keyframes blade-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes blade-spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.brand-copy {
  display: grid;
  gap: 2px;
}

.brand-name {
  font-family: "Lora", Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--graphite);
}

.brand-place {
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.main-nav a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 999px;
  color: var(--muted);
  font-weight: 700;
  transition: color 0.2s ease, background 0.2s ease;
}

.main-nav a:hover,
.main-nav a.active {
  color: var(--graphite);
  background: var(--surface-strong);
}

.header-actions,
.hero-actions,
.inline-actions,
.cta-actions,
.contact-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 12px 20px;
  font-weight: 800;
  color: var(--graphite);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-dark {
  background: var(--graphite);
  color: #ffffff;
}

.btn-dark:hover,
.btn-call:hover {
  background: #000000;
}

.btn-call {
  background: var(--graphite);
  color: #ffffff;
  white-space: nowrap;
}

.btn-light {
  background: #ffffff;
  color: var(--graphite);
}

.btn-light:hover {
  background: var(--surface-strong);
}

.btn-outline-light {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.42);
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.12);
}

.btn-viber {
  background: var(--viber);
  color: #ffffff;
}

.btn-viber:hover {
  background: var(--viber-hover);
}

.icon {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.viber-img {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
}

.hero,
.page-hero {
  position: relative;
  min-height: 74svh;
  display: grid;
  align-items: center;
  overflow: hidden;
  color: #ffffff;
  background: var(--graphite);
}

.page-hero {
  min-height: 280px;
}

.page-hero h1 { font-size: 44px; }

.hero-image,
.hero-overlay {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  background: linear-gradient(90deg, rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.62) 52%, rgba(17, 24, 39, 0.34));
}

.hero-inner,
.page-hero-inner {
  position: relative;
  z-index: 1;
  padding: 76px 0 64px;
}

.page-hero-inner {
  max-width: 850px;
}

.hero h1,
.page-hero h1,
.dark-cta h2 {
  color: #ffffff;
}

.hero-statement {
  margin-top: 12px;
  font-family: "Lora", Georgia, serif;
  font-size: 36px;
  color: #ffffff;
}

.hero-copy,
.page-hero p:not(.kicker) {
  max-width: 740px;
  margin-top: 20px;
  font-size: 19px;
  color: #e5e7eb;
}

.hero-actions {
  margin-top: 34px;
}

.hero-proof {
  width: min(100%, 920px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin: 48px 0 0;
  padding: 26px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.24);
}

.hero-proof div {
  padding-right: 24px;
}

.hero-proof dt {
  font-family: "Lora", Georgia, serif;
  font-size: 30px;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.1;
}

.hero-proof dd {
  margin: 8px 0 0;
  color: #cbd5e1;
  font-size: 14px;
}

.kicker {
  color: var(--stone);
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0;
}

.hero-kicker {
  color: #f8fafc;
}

.section {
  padding: 84px 0;
}

.surface-section {
  background: var(--surface);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.section-heading {
  max-width: 790px;
  margin-bottom: 36px;
}

.section-heading h2 {
  margin-top: 8px;
}

.section-heading p:not(.kicker) {
  margin-top: 14px;
  color: var(--muted);
  font-size: 17px;
}

.split-grid,
.cta-grid,
.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.82fr);
  gap: 48px;
  align-items: center;
}

.split-grid h2 {
  margin-top: 8px;
}

.lead-copy {
  margin-top: 22px;
  display: grid;
  gap: 14px;
  color: #475569;
  font-size: 17px;
}

.inline-actions {
  margin-top: 28px;
}

.text-link {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  color: var(--graphite);
  font-weight: 800;
  border-bottom: 1px solid currentColor;
}

.image-panel,
.product-media,
.masonry-media {
  border: 0;
  padding: 0;
  background: transparent;
  text-align: left;
}

.image-panel {
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.image-panel img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.image-panel:hover img,
.masonry-media:hover img,
.product-card:hover .product-media img,
.service-card:hover img {
  transform: scale(1.035);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
}

.featured-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.product-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
  border-color: #cbd5e1;
}

.product-card.hidden {
  display: none;
}

.product-media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  background: var(--surface);
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}

.product-media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  transition: transform 0.4s ease;
}

.product-badge {
  position: absolute;
  z-index: 2;
  left: 12px;
  top: 12px;
  max-width: calc(100% - 24px);
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.9);
  color: #ffffff;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 800;
}

.product-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 18px;
}

.product-topline {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
}

.product-topline span:last-child {
  text-align: right;
}

.product-body h3 {
  margin-top: 10px;
  font-family: "Inter", system-ui, sans-serif;
  font-size: 19px;
  line-height: 1.3;
}

.product-specs {
  list-style: none;
  padding: 14px 0 0;
  margin: 14px 0 0;
  border-top: 1px solid var(--line);
  display: grid;
  gap: 7px;
  color: var(--muted);
  font-size: 13px;
}

.product-specs li,
.plain-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.tick {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  fill: none;
  stroke: var(--green);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  margin-top: 3px;
}

.product-price {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 18px;
}

.product-price span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.product-price strong {
  color: var(--graphite);
  font-size: 18px;
  white-space: nowrap;
}

.product-viber {
  width: 100%;
  margin-top: 16px;
}

.section-action {
  display: flex;
  justify-content: center;
  margin-top: 34px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.service-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #ffffff;
}

.service-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-bottom: 1px solid var(--line);
  transition: transform 0.4s ease;
}

.service-card div {
  padding: 20px;
}

.service-card h3 {
  margin-top: 7px;
  font-size: 22px;
}

.service-card p:last-child {
  margin-top: 11px;
  color: var(--muted);
  font-size: 14px;
}

.dark-cta {
  background: var(--graphite);
  color: #ffffff;
}

.dark-cta .kicker {
  color: #cbd5e1;
}

.dark-cta p:not(.kicker) {
  margin-top: 16px;
  color: #d1d5db;
  font-size: 17px;
}

.cta-grid {
  grid-template-columns: minmax(0, 1fr) auto;
}

.cta-actions {
  justify-content: flex-end;
}

.plain-list {
  display: grid;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 22px 0;
  color: #475569;
}

.plain-list a {
  font-weight: 800;
  color: var(--graphite);
}

.map-panel {
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: #ffffff;
  box-shadow: var(--shadow-soft);
}

.map-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
}

.map-panel-head div {
  display: grid;
  gap: 3px;
}

.map-panel-head strong {
  color: var(--graphite);
}

.map-panel-head span {
  color: var(--muted);
  font-size: 13px;
}

.map-panel-head a {
  color: var(--stone);
  font-weight: 800;
  white-space: nowrap;
}

.map-panel iframe {
  display: block;
  width: 100%;
  min-height: 420px;
}

.catalog-section {
  background: var(--surface);
}

.catalog-toolbar {
  display: grid;
  grid-template-columns: minmax(260px, 520px) auto;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 22px;
}

.search-field {
  position: relative;
  display: block;
}

.search-field .icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}

.search-field input {
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0 18px 0 46px;
  background: #ffffff;
  color: var(--graphite);
  outline: none;
}

.search-field input:focus {
  border-color: #c4b5fd;
  box-shadow: 0 0 0 4px rgba(115, 96, 242, 0.12);
}

.catalog-note {
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: var(--muted);
}

.catalog-note strong {
  font-family: "Lora", Georgia, serif;
  font-size: 34px;
  color: var(--graphite);
}

.catalog-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}

.filter-btn {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 9px 15px;
  background: #ffffff;
  color: var(--graphite);
  font-weight: 800;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.filter-btn span {
  color: var(--muted);
  font-size: 12px;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--graphite);
  border-color: var(--graphite);
  color: #ffffff;
}

.filter-btn:hover span,
.filter-btn.active span {
  color: #d1d5db;
}

.catalog-empty {
  padding: 24px;
  margin-bottom: 20px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--muted);
  font-weight: 700;
}

.editorial-masonry {
  columns: 3 280px;
  column-gap: 22px;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  align-items: start;
}

.reviews-grid-preview {
  columns: initial;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.review-card {
  width: 100%;
  margin: 0;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.03);
}

.reviews-grid-preview .review-card {
  margin: 0;
}

.review-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.review-head strong,
.review-head time {
  display: block;
}

.review-head strong {
  color: var(--graphite);
}

.review-head time {
  margin-top: 3px;
  color: var(--muted);
  font-size: 12px;
}

.review-rating {
  display: inline-flex;
  flex: 0 0 auto;
  color: var(--stone);
}

.star {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.review-card h3 {
  margin-top: 18px;
  font-size: 21px;
}

.review-card blockquote {
  margin: 12px 0 0;
  color: #475569;
  font-size: 15px;
}

.review-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 8px;
  margin-top: 20px;
}

.review-image {
  padding: 0;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  background: var(--surface-strong);
}

.review-image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.review-image:hover img {
  transform: scale(1.04);
}

.masonry-card {
  break-inside: avoid;
  display: inline-block;
  width: 100%;
  margin: 0 0 22px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.03);
}

.masonry-media {
  width: 100%;
  overflow: hidden;
  background: var(--surface);
}

.masonry-media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.masonry-body {
  padding: 18px;
}

.masonry-body h3 {
  margin-top: 7px;
  font-size: 20px;
}

.process-list {
  display: grid;
  gap: 14px;
}

.process-list article,
.contact-card,
.road-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #ffffff;
  padding: 22px;
}

.process-list article {
  display: grid;
  grid-template-columns: 48px 1fr;
  column-gap: 16px;
}

.process-list span {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: var(--radius);
  background: var(--graphite);
  color: #ffffff;
  font-weight: 800;
}

.process-list h3,
.contact-card h3,
.road-card h2 {
  font-size: 22px;
}

.process-list p {
  grid-column: 2;
  color: var(--muted);
  margin-top: 4px;
}

.contact-layout {
  align-items: start;
}

.contact-stack,
.contact-map-stack {
  display: grid;
  gap: 18px;
}

.contact-card h3 {
  margin-top: 6px;
}

.contact-card h3 a:hover,
.footer-contact a:hover,
.footer-nav a:hover {
  color: var(--stone);
}

.contact-card p:last-child,
.road-card p {
  margin-top: 10px;
  color: var(--muted);
}

.road-card {
  background: var(--graphite);
  color: #ffffff;
}

.road-card h2 {
  margin-top: 8px;
  color: #ffffff;
}

.road-card p {
  color: #d1d5db;
}

/* ================== РОЗКІШНИЙ СОЛІДНИЙ ФУТЕР (МЕНШ ІІШНИЙ) ================== */
.site-footer {
  background: #090E17;
  color: #CBD5E1;
  padding-top: 36px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-brand-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-brand-title {
  font-family: 'Lora', Georgia, serif;
  font-size: 26px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 1.2px;
  text-decoration: none;
}

.footer-brand-tagline {
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-fast-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-pill-phone {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-pill-phone:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.footer-pill-viber {
  background: #7360F2;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(115, 96, 242, 0.3);
  transition: all 0.2s ease;
}

.footer-pill-viber:hover {
  background: #5E49DC;
  transform: translateY(-1px);
}

.footer-pill-portal {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #93C5FD;
  font-size: 12.5px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-pill-portal:hover {
  background: rgba(147, 197, 253, 0.1);
  border-color: #93C5FD;
}

.footer-grid-luxury {
  display: grid;
  grid-template-columns: 1.3fr 0.85fr 1.1fr;
  gap: 40px;
  padding: 40px 0 44px;
}

.footer-col-title {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #64748B;
  margin: 0 0 16px;
}

.footer-about-text {
  font-size: 13.5px;
  line-height: 1.65;
  color: #94A3B8;
  margin: 0 0 18px;
}

.footer-badges-strip {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-stone-badge {
  display: inline-block;
  font-size: 12px;
  color: #CBD5E1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 5px 12px;
  border-radius: 4px;
  width: fit-content;
}

.footer-nav-luxury {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav-luxury a {
  font-size: 14px;
  font-weight: 500;
  color: #E2E8F0;
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-nav-luxury a:hover {
  color: #60A5FA;
}

.footer-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  font-size: 13px;
  line-height: 1.5;
}

.footer-contact-item strong {
  display: block;
  color: #FFFFFF;
  font-size: 12.5px;
  margin-bottom: 2px;
}

.footer-contact-item p {
  margin: 0;
  color: #94A3B8;
}

.footer-contact-item a {
  color: #93C5FD;
  text-decoration: none;
}

.footer-contact-item a:hover {
  text-decoration: underline;
}

.footer-bottom-luxury {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 0;
  font-size: 12px;
  color: #64748B;
}

.footer-bottom-luxury .footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.mobile-actions {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 900;
  display: none;
  gap: 10px;
}

.mobile-action {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--graphite);
  color: #ffffff;
  box-shadow: var(--shadow-soft);
}

.mobile-viber {
  background: var(--viber);
}

/* ================== РЕДИЗАЙН КАРТКИ МОДАЛЬНОГО ВІКНА (LIGHTBOX) ================== */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.lightbox.active {
  display: flex;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(11, 18, 32, 0.82);
}

.lightbox-dialog {
  position: relative;
  width: min(1120px, 100%);
  max-height: calc(100svh - 40px);
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 430px);
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.lightbox-media-col {
  position: relative;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  max-height: min(84svh, 740px);
  border-right: 1px solid var(--line);
}

.lightbox-media-col img {
  width: 100%;
  height: 100%;
  max-height: min(84svh, 740px);
  object-fit: contain;
  padding: 20px;
}

.lightbox-zoom-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
}

.lightbox-panel {
  padding: 28px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  max-height: min(84svh, 740px);
  background: #ffffff;
}

.lightbox-badges-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.lightbox-sku-badge {
  background: #0F172A;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 4px;
}

.lightbox-cat-badge {
  background: #F1F5F9;
  color: #334155;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #E2E8F0;
}

.lightbox-flag-badge {
  background: #FEF3C7;
  color: #92400E;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #FDE68A;
}

.lightbox-title {
  font-family: 'Lora', Georgia, serif;
  font-size: clamp(22px, 2.2vw, 28px);
  color: #0F172A;
  line-height: 1.25;
  margin: 0;
  font-weight: 700;
}

.lightbox-price-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.lightbox-price-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.lightbox-price-label {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.lightbox-direct-tag {
  font-size: 11px;
  font-weight: 700;
  color: #166534;
  background: #DCFCE7;
  padding: 2px 8px;
  border-radius: 4px;
}

.lightbox-price-val {
  font-size: 26px;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.lightbox-price-sub {
  font-size: 11.5px;
  color: #64748B;
}

.lightbox-section-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748B;
  display: block;
  margin-bottom: 7px;
}

.lightbox-specs-block {
  border-top: 1px solid #F1F5F9;
  padding-top: 10px;
}

.lightbox-specs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.lightbox-specs-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #334155;
  line-height: 1.45;
}

.lightbox-specs-list .spec-bullet {
  color: #2563EB;
  font-weight: 800;
  font-size: 13px;
  flex-shrink: 0;
}

.lightbox-perks-block {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 11px 13px;
}

.lightbox-perks-block .lightbox-section-label {
  color: #166534;
  margin-bottom: 5px;
}

.lightbox-perks-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lightbox-perks-list li {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 12px;
  color: #166534;
  line-height: 1.4;
}

.lightbox-perks-list .perk-check {
  font-weight: 800;
  color: #15803D;
  flex-shrink: 0;
}

.lightbox-actions-row {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 2px;
}

.lightbox-viber-btn {
  background: #7360F2 !important;
  color: #ffffff !important;
  padding: 12px 18px !important;
  font-size: 13.5px !important;
  font-weight: 700 !important;
  border-radius: 6px !important;
  text-decoration: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  box-shadow: 0 4px 14px rgba(115, 96, 242, 0.35);
  transition: all 0.2s ease !important;
}

.lightbox-viber-btn:hover {
  background: #5E49DC !important;
  transform: translateY(-1px);
}

.lightbox-call-btn {
  background: #F8FAFC !important;
  color: #0F172A !important;
  border: 1px solid #CBD5E1 !important;
  padding: 10px 16px !important;
  font-size: 12.5px !important;
  font-weight: 700 !important;
  border-radius: 6px !important;
  text-decoration: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
}

.lightbox-call-btn:hover {
  background: #F1F5F9 !important;
  border-color: #94A3B8 !important;
}

.lightbox-footer-hint {
  font-size: 11.5px;
  color: #64748B;
  text-align: center;
  line-height: 1.45;
  margin: 0;
  padding-top: 2px;
}

.lightbox-close {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 10;
  width: 38px;
  height: 38px;
  border: 1px solid #CBD5E1;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: #0F172A;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.15s ease;
}

.lightbox-close:hover {
  background: #F1F5F9;
  color: #000000;
  transform: scale(1.05);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1120px) {
  .header-grid { gap: 12px; }
  .header-viber { display: none; }
  .main-nav a { padding-inline: 10px; }

  .featured-grid,
  .service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reviews-grid-preview {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reviews-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .container {
    width: min(100% - 28px, var(--container));
  }

  .notice-inner {
    flex-direction: column;
    gap: 2px;
  }

  .header-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .brand,
  .main-nav {
    min-width: 0;
    max-width: 100%;
  }

  .main-nav {
    overflow-x: auto;
  }

  .main-nav a {
    padding-inline: 5px;
    font-size: 12px;
  }

  h1 { font-size: 48px; }
  h2 { font-size: 32px; }
  .hero-statement { font-size: 28px; }
  .main-nav { justify-content: flex-start; }

  .header-actions {
    display: none;
  }

  .brand-blade {
    width: 52px;
    height: 52px;
  }

  .brand-name {
    font-size: 24px;
  }

  .main-nav a {
    padding: 0 13px;
  }

  .hero,
  .page-hero {
    min-height: auto;
  }

  .hero-inner,
  .page-hero-inner {
    padding: 28px 0;
  }

  .hero-statement { font-size: 24px; line-height: 1.4; }
  .hero-copy, .page-hero p:not(.kicker) { font-size: 16px; margin-top: 12px; }
  .hero-actions { margin-top: 18px; }
  .home-hero .hero-proof { display: none; }
  .page-hero h1 { font-size: 32px; }
  .notice-inner { font-size: 12px; line-height: 1.4; }

  .hero-overlay {
    background: rgba(17, 24, 39, 0.72);
  }

  .hero-proof {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 22px;
  }

  .split-grid,
  .cta-grid,
  .contact-layout,
  .catalog-toolbar {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    justify-content: flex-start;
  }

  .service-grid,
  .featured-grid,
  .reviews-grid,
  .reviews-grid-preview {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 62px 0;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom-inner {
    flex-direction: column;
  }

  .mobile-actions {
    display: flex;
  }

  .lightbox-dialog {
    grid-template-columns: 1fr;
    max-height: 92svh;
    overflow-y: auto;
  }
  .lightbox-media-col {
    max-height: 46svh;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
  .lightbox-media-col img {
    max-height: 44svh;
  }
  .lightbox-panel {
    max-height: none;
    overflow-y: visible;
    padding: 20px;
  }
}

@media (max-width: 520px) {
  h1 {
    font-size: 38px;
  }

  .btn {
    width: 100%;
  }

  .hero-actions .btn,
  .inline-actions .btn,
  .contact-actions .btn,
  .cta-actions .btn {
    width: 100%;
  }

  .hero-proof { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .process-list article {
    grid-template-columns: 1fr;
  }

  .process-list p {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  *:not(.blade-spin),
  *:not(.blade-spin)::before,
  *:not(.blade-spin)::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .blade-spin {
    animation: blade-spin 10s linear infinite !important;
    -webkit-animation: blade-spin 10s linear infinite !important;
  }
}
`;
}

function renderMainJs() {
  return `document.addEventListener('DOMContentLoaded', () => {
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
});`;
}

function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://kamenotes.com/</loc></url>
  <url><loc>https://kamenotes.com/catalog.html</loc></url>
  <url><loc>https://kamenotes.com/vyrobnytstvo.html</loc></url>
  <url><loc>https://kamenotes.com/vidguky.html</loc></url>
  <url><loc>https://kamenotes.com/kontakty.html</loc></url>
</urlset>
`;
}

function buildCatalogOnly() {
  ensureDirs();
  const products = readProducts();
  fs.writeFileSync(CATALOG_HTML_FILE, renderCatalog(products), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'index.html'), renderIndex(products), 'utf8');
  return { count: products.length, file: CATALOG_HTML_FILE };
}

function buildReviewsOnly() {
  ensureDirs();
  const reviews = readReviews();
  fs.writeFileSync(REVIEWS_HTML_FILE, renderReviews(reviews), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'index.html'), renderIndex(readProducts()), 'utf8');
  return { count: reviews.length, file: REVIEWS_HTML_FILE };
}

function writeRedirects() {
  const redirects = {
    'contacts.html': 'kontakty.html',
    'catalog/index.html': '../catalog.html',
    'ua/index.html': '../index.html',
    'ua/contacts.html': '../kontakty.html',
    'ua/about.html': '../vyrobnytstvo.html',
    'ua/mounting.html': '../vyrobnytstvo.html',
    'ua/monuments.html': '../catalog.html',
    'ua/vidguky.html': '../vidguky.html',
    'ua/services/bruschatka.html': '../vyrobnytstvo.html',
    'ua/bruschatka.html': '../vyrobnytstvo.html'
  };
  for (const [file, target] of Object.entries(redirects)) {
    const destination = path.join(SITE_DIR, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><title>KAMENOTES</title></head><body><a href="${target}">Перейти на сайт KAMENOTES</a><script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script></body></html>`, 'utf8');
  }
}

function buildAll() {
  ensureDirs();
  const products = readProducts();
  const reviews = readReviews();
  fs.writeFileSync(path.join(SITE_DIR, 'css', 'style.css'), renderCss(), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'js', 'main.js'), renderMainJs(), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'index.html'), renderIndex(products), 'utf8');
  fs.writeFileSync(CATALOG_HTML_FILE, renderCatalog(products), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'vyrobnytstvo.html'), renderProduction(), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'kontakty.html'), renderContacts(), 'utf8');
  fs.writeFileSync(REVIEWS_HTML_FILE, renderReviews(reviews), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'sitemap.xml'), renderSitemap(), 'utf8');
  writeRedirects();
  return { count: products.length };
}

module.exports = {
  buildAll,
  buildCatalogOnly,
  buildReviewsOnly,
  renderProductCard,
  PRODUCTS_FILE,
  CATALOG_HTML_FILE,
  REVIEWS_FILE,
  REVIEWS_HTML_FILE
};

if (require.main === module) {
  const result = buildAll();
  console.log(`Built KAMENOTES site with ${result.count} catalog items.`);
}
