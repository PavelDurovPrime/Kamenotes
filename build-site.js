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
const ROUTE_KIEV_LINK = 'https://www.google.com/maps/dir/?api=1&origin=%D0%9A%D0%B8%D1%97%D0%B2&destination=50.3281248%2C29.082698&travelmode=driving';
const ROUTE_ZT_LINK = 'https://www.google.com/maps/dir/?api=1&origin=%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80&destination=50.3281248%2C29.082698&travelmode=driving';

const CATEGORIES = [
  { id: 'all', label: 'Усі моделі', short: 'Усі моделі' },
  { id: 'odinarni', label: "Одинарні пам'ятники", short: 'Одинарні' },
  { id: 'podvijni', label: "Подвійні пам'ятники", short: 'Подвійні' },
  { id: 'vijskovi', label: 'Військові ЗСУ', short: 'Військові ЗСУ' },
  { id: 'modeli', label: 'Авторські моделі цеху', short: 'Моделі цеху' },
  { id: 'khresti', label: 'Хрести та плити', short: 'Хрести' },
  { id: 'ogorozhi', label: 'Огорожі та столи', short: 'Огорожі' }
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

function hasVerifiedPrice(product) {
  return Number.isFinite(Number(product.price)) && Number(product.price) > 0;
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
  const pricePart = hasVerifiedPrice(product) ? ` за ціною від ${formatPrice(product.price)} грн` : '';
  const text = `Вітаю! Мене цікавить пам'ятник арт. ${product.sku} ("${product.title}")${pricePart}. Прошу прорахувати повну вартість з оформленням і монтажем.`;
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
        ${navLink(active, 'works', 'vidguky.html', 'Наші роботи')}
        ${navLink(active, 'production', 'vyrobnytstvo.html', 'Виробництво')}
        ${navLink(active, 'services', 'oformlennya.html', 'Послуги')}
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
    <div class="container footer-compact">
      <div class="footer-identity">
        <a class="footer-mark" href="index.html" aria-label="KAMENOTES, головна сторінка"><img src="img/suhorez_blade.svg" alt="" width="44" height="44"><span>KAMENOTES</span></a>
        <p>KAMENOTES — виробництво гранітних пам’ятників у Коростишеві · з 1995 року</p>
      </div>
      <nav class="footer-navigation" aria-label="Навігація у футері">
        <a href="catalog.html">Каталог</a><a href="vidguky.html">Наші роботи</a><a href="vyrobnytstvo.html">Виробництво</a><a href="oformlennya.html">Художнє оформлення</a><a href="montazh.html">Монтаж</a><a href="kontakty.html">Контакти</a><a href="brukivka.html">Інша продукція: бруківка</a>
      </nav>
      <address class="footer-contact-compact">
        <a href="${MAP_LINK}" target="_blank" rel="noopener">м. Коростишів, вул. Партизанська-117<br>Коростишівський гранітний завод</a>
        <span><a href="tel:${PHONE_MAIN}">${PHONE_MAIN_LABEL}</a><a href="mailto:${EMAIL}">${EMAIL}</a></span>
      </address>
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
            <span>Вартість</span>
            <strong id="lightboxPrice">Ціна за прорахунком</strong>
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
  <link rel="stylesheet" href="css/theme.css?v=20260915-graphite">
  <link rel="stylesheet" href="css/style.css?v=20260915-graphite">
  <link rel="stylesheet" href="css/design-system.css?v=20260915-graphite">
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
  const priceLabel = hasVerifiedPrice(item) ? `від ${formatPrice(item.price)} грн` : 'Ціна за прорахунком';

  return `<article class="product-card ${escapeAttr(item.category)}" data-category="${escapeAttr(item.category)}" data-search="${escapeAttr(`${item.sku} ${item.title} ${specs.join(' ')}`.toLowerCase())}">
    <button class="product-media js-lightbox" type="button"
      data-image="${escapeAttr(item.img)}"
      data-title="${escapeAttr(item.title)}"
      data-sku="Арт. ${escapeAttr(item.sku)}"
      data-category="${escapeAttr(categoryName(item.category))}"
      data-product-id="${escapeAttr(item.id)}"
      data-badge="${escapeAttr(item.badge || '')}"
      data-price="${escapeAttr(priceLabel)}"
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
        <strong>${escapeHtml(priceLabel)}</strong>
        <button class="product-detail js-lightbox" type="button"
          data-image="${escapeAttr(item.img)}"
          data-title="${escapeAttr(item.title)}"
          data-sku="Арт. ${escapeAttr(item.sku)}"
          data-category="${escapeAttr(categoryName(item.category))}"
          data-product-id="${escapeAttr(item.id)}"
          data-badge="${escapeAttr(item.badge || '')}"
          data-price="${escapeAttr(priceLabel)}"
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

function editorialPages() {
  return require("./editorial-pages")({ pageShell, escapeHtml, escapeAttr, arrowIcon, viberIcon, VIBER_BASE, PHONE_MAIN, PHONE_MAIN_LABEL, readProducts, readReviews, productForPublic, formatPrice });
}

function renderIndex(products) {
  return editorialPages().home(products);
}
function renderReviews(reviews) {
  return editorialPages().works(reviews);
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
  return editorialPages().production();
}

function renderDecoration() {
  return editorialPages().decoration();
}

function renderMounting() {
  return editorialPages().mounting();
}

function renderPaving() {
  return editorialPages().paving();
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
  --container: 1240px;
  --radius: 8px;
  --shadow: 0 18px 45px rgba(var(--ink-rgb), 0.09);
  --shadow-soft: 0 10px 25px rgba(var(--ink-rgb), 0.07);
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
  touch-action: manipulation;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
  touch-action: manipulation;
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
  outline: 3px solid rgba(var(--ink-rgb), 0.42);
  outline-offset: 3px;
}

.skip-link {
  position: absolute;
  left: 20px;
  top: 8px;
  z-index: 9999;
  transform: translateY(-150%);
  background: var(--graphite);
  color: var(--white);
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
  background: rgba(var(--white-rgb), 0.96);
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
  color: var(--white);
}

.btn-dark:hover,
.btn-call:hover {
  background: var(--graphite);
}

.btn-call {
  background: var(--graphite);
  color: var(--white);
  white-space: nowrap;
}

.btn-light {
  background: var(--white);
  color: var(--graphite);
}

.btn-light:hover {
  background: var(--surface-strong);
}

.btn-outline-light {
  color: var(--white);
  border-color: rgba(var(--white-rgb), 0.42);
}

.btn-outline-light:hover {
  background: rgba(var(--white-rgb), 0.12);
}

.btn-viber {
  background: var(--viber);
  color: var(--white);
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
  color: var(--white);
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
  background: linear-gradient(90deg, rgba(var(--ink-rgb), 0.88), rgba(var(--ink-rgb), 0.62) 52%, rgba(var(--ink-rgb), 0.34));
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
  color: var(--white);
}

.hero-statement {
  margin-top: 12px;
  font-family: "Lora", Georgia, serif;
  font-size: 36px;
  color: var(--white);
}

.hero-copy,
.page-hero p:not(.kicker) {
  max-width: 740px;
  margin-top: 20px;
  font-size: 19px;
  color: var(--line);
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
  border-top: 1px solid rgba(var(--white-rgb), 0.24);
}

.hero-proof div {
  padding-right: 24px;
}

.hero-proof dt {
  font-family: "Lora", Georgia, serif;
  font-size: 30px;
  color: var(--white);
  font-weight: 700;
  line-height: 1.1;
}

.hero-proof dd {
  margin: 8px 0 0;
  color: var(--on-dark-muted);
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
  color: var(--bg);
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
  color: var(--text);
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
  background: var(--white);
  box-shadow: 0 1px 0 rgba(var(--ink-rgb), 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
  border-color: var(--on-dark-muted);
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
  background: rgba(var(--ink-rgb), 0.9);
  color: var(--white);
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
  background: var(--white);
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
  color: var(--white);
}

.dark-cta .kicker {
  color: var(--on-dark-muted);
}

.dark-cta p:not(.kicker) {
  margin-top: 16px;
  color: var(--on-dark-muted);
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
  color: var(--text);
}

.plain-list a {
  font-weight: 800;
  color: var(--graphite);
}

.map-panel {
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: var(--white);
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
  background: var(--white);
  color: var(--graphite);
  outline: none;
}

.search-field input:focus {
  border-color: var(--viber-soft);
  box-shadow: 0 0 0 4px rgba(var(--viber-rgb), 0.12);
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
  background: var(--white);
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
  color: var(--white);
}

.filter-btn:hover span,
.filter-btn.active span {
  color: var(--on-dark-muted);
}

.catalog-empty {
  padding: 24px;
  margin-bottom: 20px;
  background: var(--white);
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
  background: var(--white);
  box-shadow: 0 1px 0 rgba(var(--ink-rgb), 0.03);
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
  color: var(--text);
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
  background: var(--white);
  box-shadow: 0 1px 0 rgba(var(--ink-rgb), 0.03);
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
  background: var(--white);
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
  color: var(--white);
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
  color: var(--white);
}

.road-card h2 {
  margin-top: 8px;
  color: var(--white);
}

.road-card p {
  color: var(--on-dark-muted);
}

/* ================== РОЗКІШНИЙ СОЛІДНИЙ ФУТЕР (МЕНШ ІІШНИЙ) ================== */
.site-footer {
  background: var(--graphite);
  color: var(--on-dark-muted);
  padding-top: 36px;
  border-top: 1px solid rgba(var(--white-rgb), 0.08);
}

.footer-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(var(--white-rgb), 0.08);
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
  color: var(--white);
  letter-spacing: 1.2px;
  text-decoration: none;
}

.footer-brand-tagline {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
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
  background: rgba(var(--white-rgb), 0.08);
  border: 1px solid rgba(var(--white-rgb), 0.16);
  color: var(--white);
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
  background: rgba(var(--white-rgb), 0.15);
  border-color: rgba(var(--white-rgb), 0.3);
}

.footer-pill-viber {
  background: var(--viber);
  color: var(--white);
  font-size: 13px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(var(--viber-rgb), 0.3);
  transition: all 0.2s ease;
}

.footer-pill-viber:hover {
  background: var(--viber-hover);
  transform: translateY(-1px);
}

.footer-pill-portal {
  background: transparent;
  border: 1px solid rgba(var(--white-rgb), 0.2);
  color: var(--on-dark-muted);
  font-size: 12.5px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-pill-portal:hover {
  background: rgba(var(--ink-rgb), 0.1);
  border-color: var(--on-dark-muted);
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
  color: var(--muted);
  margin: 0 0 16px;
}

.footer-about-text {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--muted);
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
  color: var(--on-dark-muted);
  background: rgba(var(--white-rgb), 0.04);
  border: 1px solid rgba(var(--white-rgb), 0.08);
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
  color: var(--on-dark-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-nav-luxury a:hover {
  color: var(--on-dark-muted);
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
  color: var(--white);
  font-size: 12.5px;
  margin-bottom: 2px;
}

.footer-contact-item p {
  margin: 0;
  color: var(--muted);
}

.footer-contact-item a {
  color: var(--on-dark-muted);
  text-decoration: none;
}

.footer-contact-item a:hover {
  text-decoration: underline;
}

.footer-bottom-luxury {
  border-top: 1px solid rgba(var(--white-rgb), 0.06);
  padding: 20px 0;
  font-size: 12px;
  color: var(--muted);
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
  color: var(--white);
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
  background: rgba(var(--ink-rgb), 0.82);
}

.lightbox-dialog {
  position: relative;
  width: min(1120px, 100%);
  max-height: calc(100svh - 40px);
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 430px);
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(var(--ink-rgb), 0.35);
  border: 1px solid rgba(var(--white-rgb), 0.1);
}

.lightbox-media-col {
  position: relative;
  background: var(--bg);
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
  background: rgba(var(--white-rgb), 0.92);
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
  background: var(--white);
}

.lightbox-badges-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.lightbox-sku-badge {
  background: var(--graphite);
  color: var(--white);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 4px;
}

.lightbox-cat-badge {
  background: var(--surface);
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid var(--on-dark-muted);
}

.lightbox-flag-badge {
  background: var(--surface);
  color: var(--text);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid var(--line);
}

.lightbox-title {
  font-family: 'Lora', Georgia, serif;
  font-size: clamp(22px, 2.2vw, 28px);
  color: var(--graphite);
  line-height: 1.25;
  margin: 0;
  font-weight: 700;
}

.lightbox-price-card {
  background: var(--bg);
  border: 1px solid var(--on-dark-muted);
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
  color: var(--text);
  background: var(--surface-strong);
  padding: 2px 8px;
  border-radius: 4px;
}

.lightbox-price-val {
  font-size: 26px;
  font-weight: 800;
  color: var(--graphite);
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.lightbox-price-sub {
  font-size: 11.5px;
  color: var(--muted);
}

.lightbox-section-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  display: block;
  margin-bottom: 7px;
}

.lightbox-specs-block {
  border-top: 1px solid var(--surface);
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
  color: var(--text);
  line-height: 1.45;
}

.lightbox-specs-list .spec-bullet {
  color: var(--stone);
  font-weight: 800;
  font-size: 13px;
  flex-shrink: 0;
}

.lightbox-perks-block {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 11px 13px;
}

.lightbox-perks-block .lightbox-section-label {
  color: var(--text);
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
  color: var(--text);
  line-height: 1.4;
}

.lightbox-perks-list .perk-check {
  font-weight: 800;
  color: var(--text);
  flex-shrink: 0;
}

.lightbox-actions-row {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 2px;
}

.lightbox-viber-btn {
  background: var(--viber) !important;
  color: var(--white) !important;
  padding: 12px 18px !important;
  font-size: 13.5px !important;
  font-weight: 700 !important;
  border-radius: 6px !important;
  text-decoration: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  box-shadow: 0 4px 14px rgba(var(--viber-rgb), 0.35);
  transition: all 0.2s ease !important;
}

.lightbox-viber-btn:hover {
  background: var(--viber-hover) !important;
  transform: translateY(-1px);
}

.lightbox-call-btn {
  background: var(--bg) !important;
  color: var(--graphite) !important;
  border: 1px solid var(--on-dark-muted) !important;
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
  background: var(--surface) !important;
  border-color: var(--muted) !important;
}

.lightbox-footer-hint {
  font-size: 11.5px;
  color: var(--muted);
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
  border: 1px solid var(--on-dark-muted);
  border-radius: 50%;
  background: rgba(var(--white-rgb), 0.95);
  color: var(--graphite);
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(var(--ink-rgb), 0.1);
  transition: all 0.15s ease;
}

.lightbox-close:hover {
  background: var(--surface);
  color: var(--graphite);
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
    background: rgba(var(--ink-rgb), 0.72);
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

  applyCatalogFilter();
  const productParam = urlParams.get('product');
  if (productParam) {
    const productTrigger = document.querySelector('.js-lightbox[data-product-id="' + CSS.escape(productParam) + '"]');
    if (productTrigger) productTrigger.click();
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
});`;
}

function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://kamenotes.com/</loc></url>
  <url><loc>https://kamenotes.com/catalog.html</loc></url>
  <url><loc>https://kamenotes.com/vyrobnytstvo.html</loc></url>
  <url><loc>https://kamenotes.com/oformlennya.html</loc></url>
  <url><loc>https://kamenotes.com/montazh.html</loc></url>
  <url><loc>https://kamenotes.com/brukivka.html</loc></url>
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
    'ua/mounting.html': '../montazh.html',
    'ua/monuments.html': '../catalog.html',
    'ua/vidguky.html': '../vidguky.html',
    'ua/services/bruschatka.html': '../../brukivka.html',
    'ua/services/329-bruschatka.html': '../../brukivka.html',
    'ua/services/portret.html': '../../oformlennya.html',
    'ua/services/retush.html': '../../oformlennya.html',
    'ua/services/litery.html': '../../oformlennya.html',
    'ua/services/khudozhne-oformlennya.html': '../../oformlennya.html',
    'ua/epitaph.html': '../oformlennya.html',
    'ua/epitaph-2.html': '../oformlennya.html',
    'ua/bruschatka.html': '../brukivka.html'
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
  fs.writeFileSync(path.join(SITE_DIR, 'oformlennya.html'), renderDecoration(), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'montazh.html'), renderMounting(), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'brukivka.html'), renderPaving(), 'utf8');
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
