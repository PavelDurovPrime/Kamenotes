const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://kamenotes.com';
const PAGE_SIZE = 48;
const PRIMARY_PAGES = ['', 'catalog.html', 'poslugy.html', 'portret.html', 'litery.html', 'vyrobnytstvo.html', 'oformlennya.html', 'montazh.html', 'brukivka.html', 'vidguky.html', 'kontakty.html', 'decor-catalog.html'];
const CATEGORIES = [
  ['standard', 'Стандартні пам’ятники з цінами'],
  ['odinarni', 'Одинарні пам’ятники'],
  ['podvijni', 'Подвійні пам’ятники'],
  ['vijskovi', 'Військові пам’ятники'],
  ['vip', 'VIP-пам’ятники'],
  ['modeli', 'Авторські моделі'],
  ['khresti', 'Хрести та плити'],
  ['ogorozhi', 'Огорожі'],
  ['dytiachi', 'Дитячі пам’ятники'],
  ['nadgrobky', 'Надгробні плити'],
  ['stoly', 'Столи і лавки'],
  ['kolony', 'Колони'],
  ['pidvikonnya', 'Підвіконня'],
  ['kuli', 'Гранітні кулі'],
  ['lampadky', 'Лампадки і свічники'],
  ['vazy', 'Вази з граніту'],
  ['stovpchyky', 'Стовпчики'],
  ['3d-proekty', '3D-проєкти'],
  ['all', 'Усі моделі']
];
const labels = Object.fromEntries(CATEGORIES);
const escape = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const categoryOf = item => ['odinarni', 'podvijni'].includes(item.category) && Number(item.price) > 0 ? 'standard' : item.category;
const matches = (item, category) => category === 'all' || [categoryOf(item), ...(item.alternateCategories || [])].includes(category);
const categoryUrl = (category, page = 1) => '/catalog-' + category + (page > 1 ? '-' + page : '') + '.html';
const productUrl = item => '/products/' + item.id + '.html';
const priceText = item => Number(item.price) > 0 ? 'від ' + Number(item.price).toLocaleString('uk-UA') + ' грн' : 'Ціна за прорахунком';
const productDescription = item => item.title + '. Артикул ' + item.sku + '. ' + ((item.specs || []).slice(0, 2).join('; ') || 'Виріб із природного каменю') + '. Виготовлення у Коростишеві.';

function schemaScript(data) {
  return '<script type="application/ld+json">' + JSON.stringify(data).replace(/</g, '\\u003c') + '</script>';
}
function breadcrumbs(entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem', position: index + 1, name: entry[0], item: SITE_URL + entry[1]
    }))
  };
}
function shell({ title, description, canonical, image, schema, body }) {
  const head = [
    '<!doctype html><html lang="uk"><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>' + escape(title) + ' | KAMENOTES</title>',
    '<meta name="description" content="' + escape(description) + '">',
    '<link rel="canonical" href="' + SITE_URL + canonical + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="uk_UA">',
    '<meta property="og:site_name" content="KAMENOTES">',
    '<meta property="og:url" content="' + SITE_URL + canonical + '">',
    '<meta property="og:title" content="' + escape(title) + ' | KAMENOTES">',
    '<meta property="og:description" content="' + escape(description) + '">',
    '<meta property="og:image" content="' + SITE_URL + image + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + escape(title) + ' | KAMENOTES">',
    '<meta name="twitter:description" content="' + escape(description) + '">',
    '<meta name="twitter:image" content="' + SITE_URL + image + '">',
    '<link rel="icon" href="/img/favicon-k.svg" type="image/svg+xml">',
    '<link rel="stylesheet" href="/css/theme.css">',
    '<link rel="stylesheet" href="/css/style.css">',
    '<link rel="stylesheet" href="/css/design-system.css">',
    '<link rel="stylesheet" href="/css/seo-pages.css">',
    ...schema.map(schemaScript),
    '</head><body><a class="skip-link" href="#main">Перейти до змісту</a>',
    '<header class="site-header seo-header"><div class="container seo-header-inner"><a class="seo-logo" href="/">KAMENOTES</a>',
    '<nav class="seo-nav" aria-label="Основна навігація"><a href="/">Головна</a><a href="/catalog.html">Каталог</a><a href="/poslugy.html">Послуги</a><a href="/vyrobnytstvo.html">Виробництво</a><a href="/vidguky.html">Відгуки</a><a href="/kontakty.html">Контакти</a></nav>',
    '<a class="seo-call" href="tel:+380977157915">097 715 79 15</a></div></header>',
    '<main id="main">' + body + '</main>',
    '<footer class="seo-footer"><div class="container"><a href="/">KAMENOTES</a> · <a href="/catalog.html">Каталог</a> · <a href="/kontakty.html">Контакти</a></div></footer></body></html>'
  ];
  return head.join('\n');
}
function card(item) {
  return '<article class="seo-card"><a class="seo-card-image" href="' + productUrl(item) + '"><img src="/' + escape(item.img) + '" alt="' + escape(item.title) + '" loading="lazy"></a>' +
    '<div class="seo-card-body"><p>Арт. ' + escape(item.sku) + '</p><h2><a href="' + productUrl(item) + '">' + escape(item.title) + '</a></h2>' +
    '<strong>' + escape(priceText(item)) + '</strong></div></article>';
}
function categoryPage(category, items, page, pages) {
  const label = labels[category];
  const canonical = categoryUrl(category, page);
  const title = label + (page > 1 ? ' — сторінка ' + page : '');
  const description = label + ' KAMENOTES: ' + items.length + ' моделей у каталозі. Фото, артикули та запит на прорахунок.';
  const start = (page - 1) * PAGE_SIZE;
  const subset = items.slice(start, start + PAGE_SIZE);
  const links = [];
  if (page > 1) links.push('<a href="' + categoryUrl(category, page - 1) + '">← Попередня</a>');
  for (let n = 1; n <= pages; n++) links.push('<a href="' + categoryUrl(category, n) + '"' + (n === page ? ' aria-current="page"' : '') + '>' + n + '</a>');
  if (page < pages) links.push('<a href="' + categoryUrl(category, page + 1) + '">Наступна →</a>');
  const body = '<section class="seo-listing container"><nav class="seo-crumbs"><a href="/">Головна</a> / <a href="/catalog.html">Каталог</a> / ' + escape(label) + '</nav>' +
    '<h1>' + escape(title) + '</h1><p>Оберіть модель і відкрийте її сторінку з фото та артикулом.</p>' +
    '<div class="seo-grid">' + subset.map(card).join('') + '</div><nav class="seo-pagination" aria-label="Сторінки каталогу">' + links.join('') + '</nav>' +
    '<p><a href="/catalog.html">Повернутися до пошуку в каталозі</a></p></section>';
  const schema = [
    {'@context':'https://schema.org','@type':'CollectionPage', name: title, url: SITE_URL + canonical, inLanguage: 'uk'},
    breadcrumbs([['Головна','/'],['Каталог','/catalog.html'],[label,canonical]])
  ];
  return shell({title, description, canonical, image: '/img/og-image.jpg', schema, body});
}
function productPage(item, related) {
  const canonical = productUrl(item);
  const category = categoryOf(item);
  const title = item.title;
  const description = productDescription(item);
  const specs = (item.specs || []).map(spec => '<li>' + escape(spec) + '</li>').join('');
  const question = encodeURIComponent('Вітаю! Прошу прорахувати ' + item.title + ', арт. ' + item.sku + '.');
  const aliases = (item.aliases || []).length ? '<p>Інші артикули: ' + escape(item.aliases.join(', ')) + '</p>' : '';
  const body = '<section class="seo-detail container"><nav class="seo-crumbs"><a href="/">Головна</a> / <a href="/catalog.html">Каталог</a> / <a href="' + categoryUrl(category) + '">' + escape(labels[category] || 'Моделі') + '</a></nav>' +
    '<div class="seo-detail-grid"><div><img class="seo-detail-image" src="/' + escape(item.img) + '" alt="' + escape(item.title) + '" fetchpriority="high"></div>' +
    '<div><p class="kicker">Арт. ' + escape(item.sku) + '</p><h1>' + escape(title) + '</h1><p class="seo-price">' + escape(priceText(item)) + '</p>' +
    aliases + '<p>Виготовляємо у Коростишеві. Точну вартість з оформленням, доставкою та монтажем повідомимо після узгодження комплектації.</p>' +
    (specs ? '<h2>Опис і параметри</h2><ul>' + specs + '</ul>' : '') +
    '<div class="seo-actions"><a class="btn btn-dark" href="tel:+380977157915">Подзвонити</a><a class="btn btn-viber" href="viber://chat?number=%2B380977157915&draft=' + question + '">Запитати у Viber</a></div></div></div>' +
    '<h2>Схожі моделі</h2><div class="seo-grid">' + related.map(card).join('') + '</div></section>';
  const productSchema = {
    '@context':'https://schema.org','@type':'Product', name: item.title, sku: item.sku,
    image: SITE_URL + '/' + item.img, description, brand: {'@type':'Brand', name:'KAMENOTES'},
    category: labels[category] || category, url: SITE_URL + canonical
  };
  if (Number(item.price) > 0 && item.priceVerified) productSchema.offers = {
    '@type':'Offer', price: Number(item.price), priceCurrency:'UAH', url: SITE_URL + canonical
  };
  const schema = [productSchema, breadcrumbs([['Головна','/'],['Каталог','/catalog.html'],[labels[category] || 'Моделі',categoryUrl(category)],[item.sku,canonical]])];
  return shell({title, description, canonical, image: '/' + item.img, schema, body});
}
function writeSitemap(siteDir, products) {
  const urls = [...PRIMARY_PAGES.map(page => '/' + page)];
  for (const [category] of CATEGORIES) {
    const count = products.filter(item => matches(item, category)).length;
    for (let page = 1; page <= Math.ceil(count / PAGE_SIZE); page++) urls.push(categoryUrl(category, page));
  }
  for (const item of products) urls.push(productUrl(item));
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(url => '  <url><loc>' + SITE_URL + url + '</loc></url>').join('\n') + '\n</urlset>\n';
  fs.writeFileSync(path.join(siteDir, 'sitemap.xml'), xml, 'utf8');
  return urls.length;
}
function buildSeoPages(siteDir, products) {
  const productDir = path.join(siteDir, 'products');
  fs.mkdirSync(productDir, {recursive:true});
  const validIds = new Set();
  for (const item of products) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.id) || validIds.has(item.id)) throw new Error('Invalid or duplicate product id: ' + item.id);
    validIds.add(item.id);
  }
  for (const file of fs.readdirSync(productDir)) {
    if (file.endsWith('.html') && !validIds.has(file.slice(0,-5))) fs.unlinkSync(path.join(productDir,file));
  }
  for (const item of products) {
    const category = categoryOf(item);
    const related = products.filter(other => other.id !== item.id && categoryOf(other) === category).slice(0, 3);
    fs.writeFileSync(path.join(productDir,item.id + '.html'), productPage(item,related), 'utf8');
  }
  const expected = new Set();
  for (const [category] of CATEGORIES) {
    const items = products.filter(item => matches(item,category));
    const pages = Math.ceil(items.length / PAGE_SIZE);
    for (let page = 1; page <= pages; page++) {
      const file = categoryUrl(category,page).slice(1);
      expected.add(file);
      fs.writeFileSync(path.join(siteDir,file), categoryPage(category,items,page,pages), 'utf8');
    }
  }
  for (const file of fs.readdirSync(siteDir)) {
    if (/^catalog-(?:standard|odinarni|podvijni|vijskovi|vip|modeli|khresti|ogorozhi|dytiachi|nadgrobky|stoly|kolony|pidvikonnya|kuli|lampadky|vazy|stovpchyky|3d-proekty|all)(?:-\d+)?\.html$/.test(file) && !expected.has(file)) fs.unlinkSync(path.join(siteDir,file));
  }
  writeSitemap(siteDir,products);
  return {products:products.length,categories:expected.size};
}
module.exports = {buildSeoPages,writeSitemap,CATEGORIES,categoryOf,categoryUrl};
