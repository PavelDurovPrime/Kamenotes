const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

async function main() {
  const root = path.join(__dirname, 'site');
  const pages = ['index.html', 'catalog.html', 'vyrobnytstvo.html', 'oformlennya.html', 'montazh.html', 'brukivka.html', 'vidguky.html', 'kontakty.html'];
  const missing = new Set();
  for (const name of pages) {
    const html = fs.readFileSync(path.join(root, name), 'utf8');
    for (const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:[^\"]*)"/g)) {
      const target = match[1];
      if (/^(?:[a-z]+:|\/\/)/i.test(target)) continue;
      if (!fs.existsSync(path.join(root, target))) missing.add(target);
    }
  }
  assert.deepEqual([...missing], [], 'Missing local assets');
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  fs.mkdirSync(path.join(__dirname, 'qa'), { recursive: true });
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of pages) {
      await page.goto(`http://127.0.0.1:3000/${name}`, { waitUntil: 'domcontentloaded' });
      await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(() => {}))));
      await page.screenshot({ path: path.join(__dirname, 'qa', `${name}-${width}.png`) });
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        broken: [...document.images].filter(img => img.getAttribute('src') && img.complete && !img.naturalWidth).map(img => img.getAttribute('src'))
      }));
      assert.ok(layout.scroll <= width, `${name} overflows at ${width}: ${layout.scroll}`);
      assert.deepEqual(layout.broken, [], `${name}: broken images`);
    }
  }
  await page.goto('http://127.0.0.1:3000/catalog.html?filter=vijskovi');
  assert.equal(await page.locator('.product-card:not(.hidden)').count(), 13);
  await page.locator('#catalogSearchInput').fill('NO-MATCH-TEST');
  assert.equal(await page.locator('.product-card:not(.hidden)').count(), 0);
  assert.equal(await page.locator('#catalogEmpty').isVisible(), true);
  await page.locator('#catalogSearchInput').fill('');
  await page.locator('.catalog-toolbar').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(__dirname, 'qa', 'catalog-products.png') });
  await page.locator('.product-card:not(.hidden) .js-lightbox').first().click();
  assert.equal(await page.locator('#lightbox').getAttribute('aria-hidden'), 'false');
  await page.screenshot({ path: path.join(__dirname, 'qa', 'catalog-lightbox.png') });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#lightbox').getAttribute('aria-hidden'), 'true');
  await page.goto('http://127.0.0.1:3000/index.html');
  assert.equal(await page.locator('.home-featured').count(), 0, 'Homepage catalog showcase must stay removed');
  await page.goto('http://127.0.0.1:3000/brukivka.html');
  assert.equal(await page.locator('h1').innerText(), 'Гранітна\nбруківка оптом.');
  await page.goto('http://127.0.0.1:3000/oformlennya.html');
  assert.equal(await page.locator('h1').innerText(), 'Оформлення\nпам’ятника.');
  await page.goto('http://127.0.0.1:3000/montazh.html');
  assert.equal(await page.locator('h1').innerText(), 'Монтаж\nпам’ятника.');
  await page.goto('http://127.0.0.1:3000/admin');
  assert.equal((await page.request.get('http://127.0.0.1:3000/api/products')).status(), 200);
  const base = 'http://127.0.0.1:3000';
  assert.equal(await page.locator('#reviewsAdminTab').isVisible(), true);
  await page.locator('#reviewsAdminTab').click();
  assert.equal(await page.locator('#reviewsAdminPanel').isVisible(), true);
  assert.equal(await page.locator('#reviewsTableBody tr').count(), 19);
  await page.screenshot({ path: path.join(__dirname, 'qa', 'admin-reviews.png') });
  const productsBefore = await (await page.request.get(`${base}/api/products`)).json();
  const id = `qa-${Date.now()}`;
  try {
    const created = await page.request.post(`${base}/api/products`, { data: {
      id, sku: id, title: 'QA verification', price: 12345, category: 'odinarni',
      img: 'img/production/workshop_01.jpg'
    } });
    assert.equal(created.status(), 201);
    const updated = await page.request.put(`${base}/api/products/${id}`, { data: { price: 23456 } });
    assert.equal(updated.status(), 200);
    const html = await (await page.request.get(`${base}/catalog.html`)).text();
    assert.ok(html.includes('23 456'));
    assert.ok(html.includes(id));
  } finally {
    await page.request.delete(`${base}/api/products/${id}`);
  }
  const productsAfter = await (await page.request.get(`${base}/api/products`)).json();
  assert.deepEqual(productsAfter, productsBefore, 'Existing products must remain unchanged');
  const reviewsBefore = await (await page.request.get(`${base}/api/reviews`)).json();
  const reviewId = `qa-review-${Date.now()}`;
  try {
    const created = await page.request.post(`${base}/api/reviews`, { data: {
      id: reviewId, name: 'QA', title: 'Перевірка', date: '2026-09-14', rating: 5,
      text: 'Тимчасовий тестовий відгук.', images: [], published: false
    } });
    assert.equal(created.status(), 201);
    const updated = await page.request.put(`${base}/api/reviews/${reviewId}`, { data: { title: 'Перевірено', published: true } });
    assert.equal(updated.status(), 200);
    const html = await (await page.request.get(`${base}/vidguky.html`)).text();
    assert.ok(html.includes('Перевірено'));
  } finally {
    await page.request.delete(`${base}/api/reviews/${reviewId}`);
  }
  const reviewsAfter = await (await page.request.get(`${base}/api/reviews`)).json();
  assert.deepEqual(reviewsAfter, reviewsBefore, 'Existing reviews must remain unchanged');
  await page.goto(`${base}/vidguky.html`);
  assert.equal(await page.locator('.review-card').count(), 19);
  for (const [source, target] of [
    ['/catalog/', '/catalog.html'],
    ['/contacts.html', '/kontakty.html'],
    ['/ua/', '/index.html'],
    ['/ua/bruschatka.html', '/brukivka.html'],
    ['/ua/services/bruschatka.html', '/brukivka.html'],
    ['/ua/services/329-bruschatka.html', '/brukivka.html'],
    ['/ua/mounting.html', '/montazh.html'],
    ['/ua/services/portret.html', '/oformlennya.html'],
    ['/ua/services/retush.html', '/oformlennya.html'],
    ['/ua/services/litery.html', '/oformlennya.html'],
    ['/ua/services/khudozhne-oformlennya.html', '/oformlennya.html'],
    ['/ua/epitaph.html', '/oformlennya.html']
  ]) {
    await page.goto(`${base}${source}`);
    await page.waitForURL(`${base}${target}`);
  }
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('PASS: local assets, 8 pages at 4 widths, product and review CRUD with cleanup, filters, lightbox, redirects, no JS errors.');
}

main().catch(error => { console.error(error); process.exit(1); });
