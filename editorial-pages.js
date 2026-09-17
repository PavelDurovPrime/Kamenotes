// Public pages with a separate layout. Catalog, contacts and their shared assets stay intact.
module.exports = function createEditorialPages(api) {
  const { pageShell, escapeHtml: e, escapeAttr: a, arrowIcon: arrow, arrowRightIcon: arrowRight, phoneIcon, viberIcon, VIBER_BASE, PHONE_MAIN, PHONE_MAIN_LABEL } = api;
  const naturalSizes = { 'img/kamenotes/services_bykvu-na-pamjatniki.jpg': [360, 240], 'img/kamenotes/services_hudozh-oformlenie.jpg': [324, 216], 'img/kamenotes/bryschatka.jpg': [360, 240], 'img/kamenotes/services_hudozhnik_pamyatnikov.jpg': [1488, 450] };
  const picture = (src, title, options = {}) => `<figure class="ed-photo ${options.className || ''}"><button type="button" class="js-lightbox" data-image="${a(src)}" data-title="${a(title)}" aria-label="Збільшити фото: ${a(title)}"><img src="${a(src)}" alt="${a(title)}" ${options.eager ? 'fetchpriority="high"' : 'loading="lazy"'} width="${options.width || naturalSizes[src]?.[0] || 1200}" height="${options.height || naturalSizes[src]?.[1] || 900}"></button>${options.caption === false ? '' : `<figcaption>${e(title)}</figcaption>`}</figure>`;
  const link = (href, text) => `<a class="ed-link" href="${a(href)}">${e(text)}${arrowRight()}</a>`;
  const button = (href, text, style = 'primary') => `<a class="ed-button ed-button-${style}" href="${a(href)}"><span>${e(text)}</span>${style === 'primary' ? arrowRight() : ''}</a>`;
  const viber = (label = 'Написати у Viber') => `<a class="ed-viber" href="${VIBER_BASE}">${viberIcon()}<span>${e(label)}</span></a>`;
  const contact = (title = 'Обговоримо ваше замовлення', text = 'Надішліть фото або артикул пам’ятника, орієнтовні розміри та населений пункт для встановлення. Ми розрахуємо вартість.') => `<section class="ed-contact"><div class="ed-wrap ed-contact-inner"><div><h2>${title}</h2><p>${text}</p></div><div class="ed-contact-actions">${viber()}<a class="ed-contact-phone" href="tel:${PHONE_MAIN}">${phoneIcon ? phoneIcon() : ''}<span>${PHONE_MAIN_LABEL}</span></a></div></div></section>`;
  const heading = (title, text, section = 'Майстерня KAMENOTES') => `<header class="ed-page-head ed-wrap"><p class="ed-eyebrow">${section}</p><h1>${title}</h1>${text ? `<p class="ed-intro">${text}</p>` : ''}</header>`;
  const shell = (title, description, active, body, pageClass = '') => pageShell({ title: `${title} | KAMENOTES`, description, active, body })
    .replace('<body>', `<body class="ed-site ${pageClass}">`)
    .replace('</head>', '<link rel="stylesheet" href="css/editorial.css?v=20260917-v1">\n</head>')
    .replace('</body>', '<script src="js/editorial.js?v=20260917-v1"></script>\n</body>');
  const sectionHead = (title, href, label) => `<div class="ed-section-head"><h2>${title}</h2>${href ? link(href, label) : ''}</div>`;
  const serviceNav = () => `<nav class="ed-services" aria-label="Послуги майстерні">
    <a href="oformlennya.html"><span class="ed-service-number">01</span><div><h3>Художнє оформлення</h3><span>Портрети, написи, різьблення</span></div><span class="ed-service-arrow" aria-hidden="true">${arrowRight()}</span></a>
    <a href="montazh.html"><span class="ed-service-number">02</span><div><h3>Доставка та встановлення</h3><span>Основа, облицювання, монтаж</span></div><span class="ed-service-arrow" aria-hidden="true">${arrowRight()}</span></a>
    <a href="brukivka.html"><span class="ed-service-number">03</span><div><h3>Гранітна бруківка</h3><span>Виробництво та оптові замовлення</span></div><span class="ed-service-arrow" aria-hidden="true">${arrowRight()}</span></a>
  </nav>`;
  const orderStages = () => `<section class="ed-section ed-order-section" aria-labelledby="order-stages-title">
    <div class="ed-wrap">
      <div class="ed-order-header">
        <span class="ed-order-divider" aria-hidden="true"></span>
        <h2 id="order-stages-title" class="ed-order-title">Етапи замовлення</h2>
        <span class="ed-order-divider" aria-hidden="true"></span>
      </div>
      <div class="ed-order-grid">
        <div class="ed-order-item">
          <div class="ed-order-icon-wrap" aria-hidden="true">
            <svg class="ed-order-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 8h22a4 4 0 0 1 4 4v28a4 4 0 0 0-4-4H10V8z"/>
              <path d="M10 36a4 4 0 0 1 4-4h22"/>
              <path d="M10 8v28"/>
              <path d="M16 16h14M16 22h10"/>
            </svg>
          </div>
          <h3>1. Оберіть модель</h3>
          <p>Оберіть модель у каталозі або надішліть свій ескіз, креслення чи фото бажаного пам’ятника.</p>
        </div>
        <div class="ed-order-item">
          <div class="ed-order-icon-wrap" aria-hidden="true">
            <svg class="ed-order-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="21" cy="21" r="13"/>
              <path d="M30.5 30.5L41 41"/>
              <circle cx="16" cy="21" r="1.5" fill="currentColor"/>
              <circle cx="21" cy="21" r="1.5" fill="currentColor"/>
              <circle cx="26" cy="21" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <h3>2. Узгодження деталей</h3>
          <p>Погоджуємо розміри, сорт каменю, оформлення портрета, написи та точний кошторис.</p>
        </div>
        <div class="ed-order-item">
          <div class="ed-order-icon-wrap" aria-hidden="true">
            <svg class="ed-order-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 34V14a2 2 0 0 1 2-2h18v22H6z"/>
              <path d="M26 20h8l6 6v8h-14V20z"/>
              <rect x="10" y="16" width="6" height="8" rx="1"/>
              <rect x="18" y="16" width="6" height="8" rx="1"/>
              <circle cx="14" cy="35" r="4"/>
              <circle cx="34" cy="35" r="4"/>
              <path d="M18 35h12M6 35H4M38 35h4"/>
            </svg>
          </div>
          <h3>3. Доставка та встановлення</h3>
          <p>Виготовляємо пам’ятник у Коростишеві, доставляємо та надійно монтуємо по всій Україні.</p>
        </div>
      </div>
    </div>
  </section>`;
  function home() {
    return shell('Гранітні пам’ятники в Коростишеві', 'Майстерня KAMENOTES: виготовлення гранітних пам’ятників у Коростишеві з 1995 року, художнє оформлення, доставка та встановлення.', 'home', `
      <section class="ed-home-hero" aria-labelledby="home-hero-title">
        <img class="ed-home-hero-bg" src="img/hero-bg.jpg" alt="" width="1600" height="1200" fetchpriority="high">
        <div class="ed-home-hero-shade" aria-hidden="true"></div>
        <div class="ed-wrap ed-home-hero-inner">
          <header class="ed-home-hero-copy">
            <p class="ed-eyebrow">Власне виробництво · Коростишів</p>
            <h1 id="home-hero-title">Пам’ятники з природного каменю</h1>
            <p class="ed-home-lead">Виготовляємо, оформлюємо, доставляємо та встановлюємо по Україні.</p>
          </header>
          <div class="ed-hero-benefits" aria-label="Переваги KAMENOTES">
            <article class="ed-hero-benefit">
              <svg class="ed-benefit-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="25" r="17"/><path d="m22 25 7 7 14-15M22 40l-5 16 15-8 15 8-5-16"/></svg>
              <h2>Надійність</h2>
              <span aria-hidden="true"></span>
              <p>Працюємо з природним каменем з 1995 року</p>
            </article>
            <article class="ed-hero-benefit">
              <svg class="ed-benefit-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M23 48h18M20 42h24M24 40v-9a8 8 0 0 1 16 0v9M28 26v-9h8v9M18 38l-6-7 3-16 5 2 1 11M46 38l6-7-3-16-5 2-1 11"/></svg>
              <h2>Сервіс</h2>
              <span aria-hidden="true"></span>
              <p>Допомагаємо з вибором, оформленням, доставкою та монтажем</p>
            </article>
            <article class="ed-hero-benefit">
              <svg class="ed-benefit-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M17 48h30l-3-25-12-9-12 9-3 25Z"/><path d="M25 19 32 7l7 12M26 48V33h12v15"/></svg>
              <h2>Власний цех</h2>
              <span aria-hidden="true"></span>
              <p>Виготовляємо у Коростишеві без зайвих посередників</p>
            </article>
          </div>
          <div class="ed-hero-actions">${button('catalog.html', 'Перейти до каталогу')}</div>
        </div>
      </section>
      <section class="ed-section ed-wrap ed-about-home">
        <div class="ed-statement"><h2>Наша майстерня</h2><div><p>Працюємо з каменем з 1995 року. Розпилюємо блоки, поліруємо деталі, виконуємо ручне різьблення та гравіювання.</p><p>Можна обрати готову модель або замовити пам’ятник за власним ескізом. Перед виготовленням погоджуємо камінь, розміри та оформлення.</p>${link('vyrobnytstvo.html', 'Про виробництво')}</div></div>
        ${serviceNav()}
      </section>
      ${orderStages()}
      ${contact()}`, 'ed-home');
  }

  function production() {
    return shell('Виробництво пам’ятників', 'Власний каменеобробний цех KAMENOTES у Коростишеві. Розпил, полірування, різьблення, 3D-проєкти та підготовка пам’ятників до встановлення.', 'production', `
      ${heading('Наша майстерня', 'Виготовляємо пам’ятники та вироби з природного каменю в Коростишеві. Працюємо з приватними й оптовими замовленнями.', 'Коростишів · З 1995 року')}
      <div class="ed-wrap">${picture('img/production/workshop_01.jpg', 'Каменеобробний цех', { eager: true, className: 'ed-panorama' })}</div>
      <section class="ed-section ed-wrap">
        <div class="ed-statement"><h2>Від блоку <br>до готового виробу</h2><div><p>Розпилювання, окантовування, полірування та ручне різьблення виконуємо на власному виробництві. Художник наносить портрети, написи й декоративні елементи.</p><p>У майстерні можна побачити камінь наживо, порівняти колір і фактуру та оглянути готові роботи.</p></div></div>
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
      ${contact('Приїжджайте до майстерні', 'м. Коростишів, вул. Партизанська-117, Коростишівський гранітний завод. Зателефонуйте або напишіть заздалегідь, щоб домовитися про зустріч.')}`);
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
      <section class="ed-section ed-wrap ed-service-section" id="retush"><div class="ed-statement"><h2>Підготовка фотографії</h2><div><p>Якщо фото пошкоджене або потребує відновлення, перед гравіюванням може знадобитися ретуш. Вона також дає змогу побачити майбутній портрет у макеті.</p><p>Після перегляду вихідної фотографії скажемо, чи потрібна додаткова підготовка, і погодимо її до початку художньої роботи.</p></div></div></section>
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
      <section class="ed-section ed-wrap ed-logistics"><div class="ed-statement"><h2>Доставка <br>та підготовка</h2><div><p>Якщо замовляєте встановлення, пам’ятник привозимо разом з інструментами для монтажу. Без встановлення спосіб перевезення погоджуємо окремо.</p><p>Для розрахунку потрібні населений пункт, розміри місця поховання та фото ділянки. Повідомте, чи є старий пам’ятник і чи можливий під’їзд автомобіля.</p></div></div>
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
      <section class="ed-section ed-wrap"><div class="ed-statement"><h2>Матеріал <br>та розміри</h2><div><p>Колір, формат і товщину підбираємо під ділянку та її призначення: доріжку, двір або майданчик.</p><p>Вартість розраховуємо за площею та видом обробки. Для замовлення вкажіть потрібний обсяг, бажаний камінь і населений пункт доставки.</p></div></div>
        <div class="ed-gallery ed-gallery-two">${picture('img/catalog/brukivka_2.jpg', 'Фактура та обробка бруківки')}${picture('img/kamenotes/bryschatka.jpg', 'Гранітна бруківка', { className: 'ed-natural-photo' })}</div>
      </section>
      ${contact('Розрахуємо ваше замовлення', 'Надішліть площу в м², бажаний розмір і вид бруківки. Уточнимо наявність, термін виготовлення та доставку.')}`);
  }

  function works(reviews) {
    const published = reviews.filter(r => r.published !== false);
    const reviewPhotos = review => review.images?.length ? `<div class="ed-review-images">${review.images.map(src => picture(src, review.title, { caption: false })).join('')}</div>` : '';
    const featured = published[0];
    const featuredMarkup = featured ? `<article class="ed-review-featured">
      <div class="ed-review-quote"><span class="ed-quote-mark" aria-hidden="true">“</span><blockquote>${e(featured.text)}</blockquote><footer><strong>${e(featured.name)}</strong><time datetime="${a(featured.date)}">${e(String(featured.date).slice(0, 4))}</time></footer></div>
      ${reviewPhotos(featured)}
    </article>` : '';
    const reviewMarkup = published.slice(1).map(r => `<article class="ed-review-card"><header><h2>${e(r.name)}</h2><time datetime="${a(r.date)}">${e(String(r.date).slice(0, 4))}</time></header><blockquote>${e(r.text)}</blockquote>${reviewPhotos(r)}</article>`).join('');
    return shell('Відгуки замовників', 'Відгуки замовників KAMENOTES про виготовлення, художнє оформлення, доставку та встановлення гранітних пам’ятників.', 'works', `
      ${heading('Відгуки замовників', 'Слова людей, для яких ми виготовляли, оформлювали та встановлювали пам’ятники.')}
      <section class="ed-section ed-wrap ed-reviews" id="reviews">${featuredMarkup}<div class="ed-review-grid">${reviewMarkup}</div></section>
      ${contact()}`);
  }
  return { home, production, decoration, mounting, paving, works };
};
