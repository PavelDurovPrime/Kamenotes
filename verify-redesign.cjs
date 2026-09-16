const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const base = 'http://127.0.0.1:3000';
const pages = ['index','vyrobnytstvo','oformlennya','montazh','brukivka','vidguky','catalog','kontakty'];

async function main() {
  // Protected pages and every stylesheet/script they load must remain unchanged.
  const protectedFiles = ['site/catalog.html','site/kontakty.html','site/css/theme.css','site/css/style.css','site/css/design-system.css','site/js/main.js'];
  for (const file of protectedFiles) {
    const before = execFileSync('git', ['show', `HEAD:${file}`], {encoding:'utf8'}).replace(/\r\n/g, '\n');
    assert.equal(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), before, `${file} changed`);
  }
  for (const name of pages) {
    const html = fs.readFileSync(`site/${name}.html`, 'utf8');
    for (const [, url] of html.matchAll(/(?:src|href)="([^"?#]+)[^"]*"/g)) {
      if (/^[a-z]+:|^\/\//i.test(url)) continue;
      assert.ok(fs.existsSync(path.join('site',url)), `${name}: missing ${url}`);
    }
  }
  const browser = await chromium.launch({headless:true, channel:'msedge'});
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [375,768,1024,1440]) {
    await page.setViewportSize({width,height:1000});
    for (const name of pages) {
      await page.goto(`${base}/${name}.html`, {waitUntil:'domcontentloaded'});
      await page.evaluate(() => document.fonts.ready);
      await page.locator('main img').evaluateAll(imgs => Promise.all(imgs.map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })));
      if (name !== 'kontakty') assert.equal(await page.locator('h1').count(), 1, name);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow, false, `${name} overflows at ${width}`);
      const broken = await page.locator('main img').evaluateAll(imgs => imgs.filter(i => i.complete && !i.naturalWidth).map(i => i.src));
      assert.deepEqual(broken, [], `${name} broken images`);
      if (name !== 'catalog' && name !== 'kontakty') {
        assert.equal(await page.locator('main .ed-contact .ed-viber').count(), 1);
        assert.equal(await page.locator('main a[href^="viber:"]').count(), 1, 'Repeated Viber CTA');
      }
      if (width === 375 || width === 1440) {
        await page.screenshot({path:`qa/redesign-${name}-${width}.png`,fullPage:true});
        if (name === 'index') await page.screenshot({path:`qa/redesign-home-top-${width}.png`});
      }
    }
    console.log(`PASS: eight pages at ${width}px`);
  }
  await page.setViewportSize({width:1440,height:1000});
  for (const name of pages.slice(0,6)) {
    await page.goto(`${base}/${name}.html`);
    const photo = page.locator('main .js-lightbox').first();
    await photo.click();
    assert.equal(await page.locator('#lightbox').getAttribute('aria-hidden'), 'false');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#lightbox').getAttribute('aria-hidden'), 'true');
    assert.equal(await photo.evaluate(el=>el===document.activeElement), true);
  }
  await page.goto(`${base}/index.html`);
  await page.locator('.ed-category[href$="podvijni"]').click();
  await page.locator('.filter-btn.active[data-filter="podvijni"]').waitFor();
  assert.ok(await page.locator('.filter-btn[data-filter="podvijni"]').evaluate(el=>el.classList.contains('active')));
  await page.goto(`${base}/catalog.html?product=km-29`);
  assert.equal(await page.locator('#lightbox').getAttribute('aria-hidden'), 'false');
  assert.equal(await page.locator('#lightboxSku').textContent(), 'Арт. КМ-29');
  await page.keyboard.press('Escape');
  await page.goto(`${base}/montazh.html`);
  await page.locator('.ed-disclosure').first().locator('summary').click();
  assert.ok(await page.locator('.ed-disclosure').first().getAttribute('open') !== null);
  const published = JSON.parse(fs.readFileSync('site/data/reviews.json','utf8')).filter(r=>r.published!==false);
  await page.goto(`${base}/vidguky.html`);
  assert.equal(await page.locator('.ed-review').count(), published.length);
  assert.deepEqual(await page.locator('.ed-review blockquote').allTextContents(), published.map(r=>r.text));
  for (const [source, target] of [['ua/','index.html'],['ua/about.html','vyrobnytstvo.html'],['ua/mounting.html','montazh.html'],['ua/services/retush.html','oformlennya.html'],['ua/services/329-bruschatka.html','brukivka.html']]) {
    await page.goto(`${base}/${source}`);
    await page.waitForURL(`${base}/${target}`);
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:667,height:375});
  await page.goto(`${base}/index.html`);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1), false);
  await page.locator('.ed-menu summary').click();
  assert.equal(await page.locator('.ed-menu nav').isVisible(), true);
  await page.locator('.ed-menu nav a[href="vyrobnytstvo.html"]').click();
  await page.waitForURL(`${base}/vyrobnytstvo.html`);
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('PASS: protected pages and dependencies unchanged, local assets, 32 layouts, photo dialogs, focus restoration, catalog links, disclosures, all published reviews, redirects, no JS errors.');
}
main().catch(e=>{console.error(e);process.exit(1);});
