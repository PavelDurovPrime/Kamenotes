// Public pages with a separate layout. Catalog, contacts and their shared assets stay intact.
module.exports = function createEditorialPages(api) {
  const { pageShell, escapeHtml: e, escapeAttr: a, arrowIcon: arrow, viberIcon, VIBER_BASE, PHONE_MAIN, PHONE_MAIN_LABEL, readProducts, productForPublic, formatPrice } = api;
  const naturalSizes = { 'img/kamenotes/services_bykvu-na-pamjatniki.jpg': [360, 240], 'img/kamenotes/services_hudozh-oformlenie.jpg': [324, 216], 'img/kamenotes/bryschatka.jpg': [360, 240], 'img/kamenotes/services_hudozhnik_pamyatnikov.jpg': [1488, 450] };
  const picture = (src, title, options = {}) => `<figure class="ed-photo ${options.className || ''}"><button type="button" class="js-lightbox" data-image="${a(src)}" data-title="${a(title)}" aria-label="Збільшити фото: ${a(title)}"><img src="${a(src)}" alt="${a(title)}" ${options.eager ? 'fetchpriority="high"' : 'loading="lazy"'} width="${options.width || naturalSizes[src]?.[0] || 1200}" height="${options.height || naturalSizes[src]?.[1] || 900}"></button>${options.caption === false ? '' : `<figcaption>${e(title)}</figcaption>`}</figure>`;
  const link = (href, text) => `<a class="ed-link" href="${a(href)}">${e(text)}${arrow()}</a>`;
  const viber = (label = 'Написати у Viber') => `<a class="ed-viber" href="${VIBER_BASE}">${viberIcon()}<span>${e(label)}</span></a>`;
  const contact = (title = 'Обговоримо ваше замовлення', text = 'Надішліть фото або артикул пам’ятника, орієнтовні розміри та населений пункт для встановлення. Ми розрахуємо вартість.') => `<section class="ed-contact"><div class="ed-wrap ed-contact-inner"><div><h2>${title}</h2><p>${text}</p></div><div class="ed-contact-actions">${viber()}<a class="ed-contact-phone" href="tel:${PHONE_MAIN}">${PHONE_MAIN_LABEL}</a></div></div></section>`;
  const heading = (title, text, section = 'Майстерня KAMENOTES') => `<header class="ed-page-head ed-wrap"><p class="ed-eyebrow">${section}</p><h1>${title}</h1>${text ? `<p class="ed-intro">${text}</p>` : ''}</header>`;
  const header = active => {
    const navigation = [['catalog', 'catalog.html', 'Каталог'], ['works', 'vidguky.html', 'Наші роботи'], ['production', 'vyrobnytstvo.html', 'Виробництво'], ['services', 'oformlennya.html', 'Послуги'], ['contacts', 'kontakty.html', 'Контакти']].map(([id, href, text]) => `<a href="${href}"${active === id ? ' aria-current="page"' : ''}>${text}</a>`).join('');
    return `<header class="ed-header"><div class="ed-wrap ed-header-inner"><a class="ed-brand" href="index.html" aria-label="KAMENOTES, головна"><img src="img/suhorez_blade.svg" width="38" height="38" alt=""><span>KAMENOTES</span></a><nav class="ed-desktop-nav" aria-label="Основна навігація">${navigation}</nav><a class="ed-header-phone" href="tel:${PHONE_MAIN}">${PHONE_MAIN_LABEL}</a><a class="ed-header-viber" href="${VIBER_BASE}" aria-label="Написати у Viber">${viberIcon()}<span>Viber</span></a><details class="ed-menu"><summary>Меню<span aria-hidden="true">+</span></summary><nav aria-label="Мобільна навігація">${navigation}</nav></details></div></header>`;
  };
  const shell = (title, description, active, body, pageClass = '') => pageShell({ title: `${title} | KAMENOTES`, description, active, body })
    .replace('<body>', `<body class="ed-site ${pageClass}">`)
    .replace(/<header class="site-header">[\s\S]*?<\/header>/, header(active))
    .replace('</head>', '<link rel="stylesheet" href="css/editorial.css?v=20260915-rebuild">\n</head>')
    .replace('</body>', '<script src="js/editorial.js?v=20260915-rebuild"></script>\n</body>')
    .replace(/<div class="mobile-actions"[\s\S]*?<\/div>/, `<div class="ed-mobile-contact" aria-label="Зв’язатися з майстернею"><a href="tel:${PHONE_MAIN}">Зателефонувати</a>${viber()}</div>`);
  const sectionHead = (title, href, label) => `<div class="ed-section-head"><h2>${title}</h2>${href ? link(href, label) : ''}</div>`;
  const serviceNav = () => `<nav class="ed-services" aria-label="Послуги майстерні">
    <a href="oformlennya.html"><h3>Художнє оформлення</h3><span>Портрети, написи, різьблення</span>${arrow()}</a>
    <a href="montazh.html"><h3>Доставка та встановлення</h3><span>Основа, облицювання, монтаж</span>${arrow()}</a>
    <a href="brukivka.html"><h3>Гранітна бруківка</h3><span>Виробництво та оптові замовлення</span>${arrow()}</a>
  </nav>`;
  const steps = rows => `<ol class="ed-steps">${rows.map(([title, text]) => `<li><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol>`;
  const projectIds = ['vsk-kiev-1', 'km-gal-km-5389', 'km-gal-km-5385', 'vsk-kiev-2', 'vsk-chudniv', 'km-gal-km-5371', 'km-gal-km-5360', 'km-gal-ok-007'];
  const workGallery = (products, limit) => projectIds.map(id => products.find(p => p.id === id)).filter(Boolean).slice(0, limit).map(productForPublic).map(p => picture(p.img, p.title)).join('');

  function home(products) {
    const categories = [
      ['Одинарні', 'odinarni', 'km-1'], ['Подвійні', 'podvijni', 'km-29'],
      ['Військовим', 'vijskovi', 'vsk-71a'], ['Хрести', 'khresti', 'km-gal-kr-001']
    ].map(([name, filter, id]) => {
      const p = products.find(p => p.id === id);
      return p ? `<a class="ed-category" href="catalog.html?filter=${filter}"><div><img src="${a(p.img)}" alt="${a(p.title)}" loading="lazy" width="400" height="400"></div><h3>${name}${arrow()}</h3></a>` : '';
    }).join('');
    const priced = ['km-1', 'km-4', 'km-8', 'km-29'].map(id => products.find(p => p.id === id)).filter(Boolean);
    return shell('Гранітні пам’ятники в Коростишеві', 'Майстерня KAMENOTES: виготовлення гранітних пам’ятників у Коростишеві з 1995 року. Каталог, наші роботи, художнє оформлення та встановлення.', 'home', `
      <header class="ed-home-head ed-wrap">
        <p class="ed-eyebrow">Коростишів · Власне виробництво з 1995 року</p>
        <h1>Гранітні<br>пам’ятники</h1>
        <div class="ed-home-summary"><p>Виготовляємо з граніту, габро та лабрадориту.<br> Оформлюємо й встановлюємо по Україні.</p>${link('catalog.html', 'Каталог та ціни')}</div>
      </header>
      <div class="ed-wrap ed-home-cover">${picture('img/production/workshop_07.jpg', 'Каменеобробний цех KAMENOTES, Коростишів', { eager: true, className: 'ed-panorama', width: 1600, height: 1200 })}</div>
      <section class="ed-section ed-wrap">
        ${sectionHead('Пам’ятники', 'catalog.html', 'Увесь каталог')}
        <div class="ed-categories">${categories}</div>
        <nav class="ed-catalog-extra" aria-label="Інші вироби">${link('vidguky.html#works', 'Меморіальні комплекси')}${link('catalog.html?filter=modeli', 'Моделі майстерні')}${link('catalog.html?filter=ogorozhi', 'Огорожі, столи та лавки')}</nav>
        <div class="ed-price-list"><h3>Приклади вартості</h3><div>${priced.map(p => `<a href="catalog.html?product=${a(p.id)}"><span>${e(p.sku)}</span><strong>${Number(p.price) > 0 ? `від ${formatPrice(p.price)} грн` : 'За прорахунком'}</strong>${arrow()}</a>`).join('')}</div><p>Комплектація — у картці моделі. Оформлення, доставка та монтаж розраховуються окремо.</p></div>
      </section>
      <section class="ed-section ed-work-section"><div class="ed-wrap">
        ${sectionHead('Виготовлено в нашій майстерні', 'vidguky.html', 'Наші роботи')}
        <div class="ed-gallery ed-gallery-three">${workGallery(products, 3)}</div>
      </div></section>
      <section class="ed-section ed-wrap ed-about-home">
        <div class="ed-statement"><h2>Майстерня<br>в Коростишеві</h2><div><p>Працюємо з каменем з 1995 року. Розпилюємо блоки, поліруємо деталі, виконуємо ручне різьблення та гравіювання.</p><p>Можна обрати готову модель або замовити пам’ятник за власним ескізом. Перед виготовленням погоджуємо камінь, розміри та оформлення.</p>${link('vyrobnytstvo.html', 'Про виробництво')}</div></div>
        ${serviceNav()}
      </section>
      <section class="ed-section ed-wrap ed-order-section">
        ${sectionHead('Як замовити пам’ятник')}
        ${steps([['Оберіть модель', 'Назвіть артикул із каталогу або надішліть свій приклад.'], ['Погодимо деталі', 'Матеріал, розміри, макет, вартість і термін фіксуємо в замовленні.'], ['Виготовимо та доставимо', 'Підготуємо комплект; за домовленістю організуємо встановлення.']])}
      </section>
      ${contact()}`, 'ed-home');
  }

  function production() {
    return shell('Виробництво пам’ятників', 'Власний каменеобробний цех KAMENOTES у Коростишеві. Розпил, полірування, різьблення, 3D-проєкти та підготовка пам’ятників до встановлення.', 'production', `
      ${heading('Наша майстерня', 'Виготовляємо пам’ятники та вироби з природного каменю в Коростишеві. Працюємо з приватними й оптовими замовленнями.', 'Коростишів · З 1995 року')}
      <div class="ed-wrap">${picture('img/production/workshop_01.jpg', 'Каменеобробний цех', { eager: true, className: 'ed-panorama' })}</div>
      <section class="ed-section ed-wrap">
        <div class="ed-statement"><h2>Від блоку<br>до готового виробу</h2><div><p>Розпилювання, окантовування, полірування та ручне різьблення виконуємо на власному виробництві. Художник наносить портрети, написи й декоративні елементи.</p><p>У майстерні можна побачити камінь наживо, порівняти колір і фактуру та оглянути готові роботи.</p></div></div>
        <div class="ed-gallery ed-gallery-three ed-process-gallery">
          ${picture('img/production/workshop_03.jpg', 'Розпил каменю')}
          ${picture('img/kamenotes/articles_polirovka-na-stanke.jpg', 'Полірування деталей')}
          ${picture('img/kamenotes/articles_reznue-rabotu-na-kamne.jpg', 'Ручне різьблення')}
        </div>
      </section>
      <section class="ed-section ed-material-section"><div class="ed-wrap">
        ${sectionHead('Камінь та проєкт')}
        <div class="ed-information-columns"><article><h3>Габро, граніт, лабрадорит</h3><p>Чорне габро, сірий граніт Покостівка, червоний Лізник та лабрадорит. Камінь можна поєднувати в одному пам’ятнику.</p></article><article id="proekt"><h3>3D-моделювання</h3><p>Для індивідуального замовлення готуємо проєкт: у ньому видно пропорції, поєднання каменю та розташування деталей до початку роботи.</p></article></div>
        ${picture('img/production/workshop_16.jpg', 'Зразки природного каменю на території майстерні', { className: 'ed-material-photo' })}
      </div></section>
      <section class="ed-section ed-wrap"><div class="ed-statement"><h2>Перед відправленням</h2><p>Погоджуємо комплектацію та спосіб перевезення. Для складних пам’ятників виконуємо попереднє сухе складання на виробництві.</p></div>${serviceNav()}</section>
      ${contact('Приїжджайте до майстерні', 'Коростишів, вул. Партизанська, 117, територія гранітного заводу. Зателефонуйте або напишіть заздалегідь, щоб домовитися про зустріч.')}`);
  }

  function decoration() {
    return shell('Художнє оформлення пам’ятників', 'Ручне гравіювання портретів, написи, епітафії, художнє різьблення та підготовка фотографій для гранітних пам’ятників KAMENOTES.', 'services', `
      ${heading('Художнє оформлення', 'Портрет, імена, дати та різьблені деталі. Узгоджуємо композицію перед нанесенням на камінь.')}
      <nav class="ed-anchor-nav ed-wrap" aria-label="Розділи оформлення"><a href="#portret">Портрет</a><a href="#litery">Написи та епітафії</a><a href="#rizblennya">Різьблення</a><a href="#retush">Підготовка фото</a></nav>
      <section class="ed-section ed-wrap ed-service-section" id="portret">
        ${sectionHead('Портрет на камені')}
        ${picture('img/kamenotes/services_hudozhnik_pamyatnikov.jpg', 'Ручне гравіювання портрета художником', { eager: true, className: 'ed-natural-photo', width: 1488, height: 450 })}
        <div class="ed-information-columns"><p>Художник переносить портрет із фотографії на камінь вручну: опрацьовує риси обличчя, світло та півтіні. Для початку роботи потрібне чітке фото людини.</p><p>Спосіб нанесення портрета залежить від каменю й обраного оформлення. Під час погодження покажемо приклади та допоможемо визначитися.</p></div>
      </section>
      <section class="ed-section ed-wrap ed-service-section" id="litery"><div class="ed-statement"><h2>Написи та епітафії</h2><p>Погоджуємо шрифт, розмір літер і розміщення написів. Перевіряємо імена та дати за текстом, який надає замовник.</p></div>
        <div class="ed-detail-pair">${picture('img/kamenotes/services_bykvu-na-pamjatniki.jpg', 'Приклади написів на граніті', { className: 'ed-natural-photo' })}<div class="ed-prose"><h3>Текст для пам’ятника</h3><p>Можна залишити лише ім’я та дати або додати коротку епітафію, вірш чи слова від родини.</p><p>Надішліть остаточний текст разом із фотографією. Ми розмістимо його в макеті та погодимо перед гравіюванням.</p></div></div>
      </section>
      <section class="ed-section ed-wrap ed-service-section" id="rizblennya">${sectionHead('Різьблення та декоративні елементи')}
        <div class="ed-gallery ed-gallery-two">${picture('img/kamenotes/articles_reznue-rabotu-na-kamne.jpg', 'Ручна різьблена робота на камені')}${picture('img/kamenotes/services_hudozh-oformlenie.jpg', 'Приклади художнього оформлення', { className: 'ed-natural-photo' })}</div>
        <p class="ed-prose">Хрести, квіти, свічки, релігійні образи, орнаменти та барельєфи підбираємо до форми пам’ятника. Складність роботи й вартість обговорюємо за конкретним зразком.</p>
      </section>
      <section class="ed-section ed-wrap ed-service-section" id="retush"><div class="ed-statement"><h2>Підготовка фотографії</h2><div><p>Якщо фото пошкоджене або потребує відновлення, перед гравіюванням може знадобитися ретуш. Вона також дає змогу побачити майбутній портрет у макеті.</p><p>Ретуш виконується окремо, зокрема фахівцями партнерського центру «Ретушер». Обсяг і вартість визначають за вихідною фотографією.</p></div></div></section>
      ${contact('Погодимо оформлення', 'Надішліть фото людини, текст напису та модель пам’ятника. Підкажемо, що потрібно для підготовки макета.')}`);
  }

  function mounting() {
    const stages = [
      ['Підготовка місця', 'Заміряємо ділянку та перевіряємо під’їзд. Враховуємо старі конструкції, дерева й інші перешкоди.', '01'],
      ['Основа та армування', 'Готуємо опалубку й армовану бетонну основу з урахуванням розмірів та навантаження пам’ятника.', '03'],
      ['Цоколь та облицювання', 'Укладаємо гранітні елементи цоколя й плитку. Розміри та матеріали погоджуємо до початку робіт.', '05'],
      ['Складання пам’ятника', 'Монтуємо підставку, стелу та надгробні деталі. Для важких елементів використовуємо підйомну техніку.', '16']
    ];
    return shell('Доставка та встановлення пам’ятників', 'Монтаж пам’ятників KAMENOTES: фотографії підготовки місця, армованої основи, облицювання та встановлення. Доставка з Коростишева.', 'services', `
      ${heading('Доставка та встановлення', 'Організуємо перевезення пам’ятника з Коростишева та монтаж на місці. Обсяг робіт, строки й умови гарантії погоджуємо в договорі.')}
      <section class="ed-wrap ed-mounting-overview"><h2>Встановлення подвійного пам’ятника</h2><p>Фотографії одного замовлення: від підготовки ділянки до готової роботи.</p></section>
      <section class="ed-wrap ed-install-grid" aria-label="Етапи встановлення">${stages.map(([title, text, n]) => `<article>${picture(`img/mounting/montazh-pamyatnika-${n}.jpg`, title, { caption: false, eager: n === '01' })}<h3>${title}</h3><p>${text}</p></article>`).join('')}</section>
      <section class="ed-section ed-wrap">${sectionHead('Завершення встановлення')}<div class="ed-install-finish">${picture('img/mounting/montazh-pamyatnika-12.jpg', 'Цоколь і надгробні плити')}${picture('img/mounting/montazh-pamyatnika-35.jpg', 'Готовий пам’ятник')}</div></section>
      <section class="ed-section ed-wrap ed-logistics"><div class="ed-statement"><h2>Доставка<br>та підготовка</h2><div><p>Якщо замовляєте встановлення, пам’ятник привозимо разом з інструментами для монтажу. Без встановлення спосіб перевезення погоджуємо окремо.</p><p>Для розрахунку потрібні населений пункт, розміри місця поховання та фото ділянки. Повідомте, чи є старий пам’ятник і чи можливий під’їзд автомобіля.</p></div></div>
        <details class="ed-disclosure"><summary>Від чого залежить вартість монтажу?${arrow()}</summary><p>Від габаритів і ваги пам’ятника, стану ділянки, обсягу фундаментних робіт, облицювання, демонтажу та відстані перевезення. Остаточний обсяг погоджуємо після оцінки місця.</p></details>
        <details class="ed-disclosure"><summary>Чи можна замовити без встановлення?${arrow()}</summary><p>Так. Можна забрати готовий комплект із виробництва або домовитися про доставку. Спосіб пакування та перевезення підбираємо до розмірів виробу.</p></details>
      </section>
      ${contact('Розрахуємо доставку та монтаж', 'Надішліть фото ділянки, розміри місця та адресу кладовища. Додайте модель пам’ятника або її артикул.')}`);
  }

  function paving() {
    return shell('Гранітна бруківка від виробника', 'Колота, пиляно-колота, повнопиляна та галтована гранітна бруківка з Коростишева. Габро, Покостівка, Лізник. Оптові замовлення.', 'services', `
      ${heading('Гранітна бруківка', 'Виготовляємо бруківку з чорного габро, сірого граніту Покостівка та червоного Лізника. Приймаємо оптові замовлення.', 'Власне виробництво · Коростишів')}
      <div class="ed-wrap">${picture('img/catalog/brukivka_1.jpg', 'Бруківка з природного каменю', { eager: true, className: 'ed-paving-photo' })}</div>
      <section class="ed-section ed-wrap">${sectionHead('Види бруківки')}
        <dl class="ed-specification"><div><dt>Колота</dt><dd>Природна нерівна поверхня та колоті грані.</dd></div><div><dt>Пиляно-колота</dt><dd>Поєднання пиляних і колотих поверхонь.</dd></div><div><dt>Повнопиляна</dt><dd>Рівна геометрія; верхня поверхня з термообробкою.</dd></div><div><dt>Галтована</dt><dd>Згладжені краї та заокруглена поверхня каменю.</dd></div></dl>
      </section>
      <section class="ed-section ed-wrap"><div class="ed-statement"><h2>Матеріал<br>та розміри</h2><div><p>Колір, формат і товщину підбираємо під ділянку та її призначення: доріжку, двір або майданчик.</p><p>Вартість розраховуємо за площею та видом обробки. Для замовлення вкажіть потрібний обсяг, бажаний камінь і населений пункт доставки.</p></div></div>
        <div class="ed-gallery ed-gallery-two">${picture('img/catalog/brukivka_2.jpg', 'Фактура та обробка бруківки')}${picture('img/kamenotes/bryschatka.jpg', 'Гранітна бруківка', { className: 'ed-natural-photo' })}</div>
      </section>
      ${contact('Розрахуємо ваше замовлення', 'Надішліть площу в м², бажаний розмір і вид бруківки. Уточнимо наявність, термін виготовлення та доставку.')}`);
  }

  function works(reviews) {
    const published = reviews.filter(r => r.published !== false);
    const reviewMarkup = published.map(r => `<article class="ed-review"><header><h3>${e(r.name)}</h3><time datetime="${a(r.date)}">${e(String(r.date).slice(0, 4))}</time></header><blockquote>${e(r.text)}</blockquote>${r.images?.length ? `<div class="ed-review-images">${r.images.map(src => picture(src, r.title, { caption: false })).join('')}</div>` : ''}</article>`).join('');
    return shell('Наші роботи та відгуки', 'Фотографії виготовлених і встановлених пам’ятників KAMENOTES та відгуки замовників.', 'works', `
      ${heading('Наші роботи', 'Гранітні пам’ятники й меморіальні комплекси, виготовлені в нашій майстерні.')}
      <nav class="ed-anchor-nav ed-wrap" aria-label="Розділи сторінки"><a href="#works">Виконані пам’ятники</a><a href="#reviews">Відгуки замовників</a></nav>
      <section class="ed-section ed-wrap" id="works"><div class="ed-gallery ed-gallery-two ed-project-gallery">${workGallery(readProducts(), 8)}</div></section>
      <section class="ed-section ed-wrap ed-reviews" id="reviews">${sectionHead('Відгуки замовників')}<div class="ed-review-list">${reviewMarkup}</div></section>
      ${contact()}`);
  }
  return { home, production, decoration, mounting, paving, works };
};
