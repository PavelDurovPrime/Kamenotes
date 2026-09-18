// Public pages with a separate layout. Catalog, contacts and their shared assets stay intact.
module.exports = function createEditorialPages(api) {
  const { pageShell, escapeHtml: e, escapeAttr: a, arrowIcon: arrow, arrowRightIcon: arrowRight, phoneIcon, viberIcon, VIBER_BASE, PHONE_MAIN, PHONE_MAIN_LABEL } = api;
  const naturalSizes = { 'img/kamenotes/services_bykvu-na-pamjatniki.jpg': [360, 240], 'img/kamenotes/services_hudozh-oformlenie.jpg': [324, 216], 'img/kamenotes/bryschatka.jpg': [360, 240], 'img/kamenotes/services_hudozhnik_pamyatnikov.jpg': [1488, 450] };
  const picture = (src, title, options = {}) => `<figure class="ed-photo ${options.className || ''}"><button type="button" class="js-lightbox" data-image="${a(src)}" data-title="${a(title)}" aria-label="Збільшити фото: ${a(title)}"><img src="${a(src)}" alt="${a(title)}" ${options.eager ? 'fetchpriority="high"' : 'loading="lazy"'} width="${options.width || naturalSizes[src]?.[0] || 1200}" height="${options.height || naturalSizes[src]?.[1] || 900}"></button>${options.caption === false ? '' : `<figcaption>${e(title)}</figcaption>`}</figure>`;
  const link = (href, text) => `<a class="ed-link" href="${a(href)}">${e(text)}${arrowRight()}</a>`;
  const button = (href, text, style = 'primary') => `<a class="ed-button ed-button-${style}" href="${a(href)}"><span>${e(text)}</span>${style === 'primary' ? arrowRight() : ''}</a>`;
  const viber = (label = 'Написати у Viber') => `<a class="ed-viber" href="${VIBER_BASE}">${viberIcon()}<span>${e(label)}</span></a>`;
  const contact = (title = 'Обговоримо ваше замовлення', text = 'Надішліть фото або артикул пам’ятника, орієнтовні розміри та населений пункт для встановлення. Ми розрахуємо вартість.') => `<section class="ed-contact"><div class="ed-wrap ed-contact-inner"><div><h2>${title}</h2><p>${text}</p></div><div class="ed-contact-actions">${viber()}<a class="ed-contact-phone" href="tel:${PHONE_MAIN}">${phoneIcon ? phoneIcon() : ''}<span>${PHONE_MAIN_LABEL}</span></a></div></div></section>`;
  const heading = (title, text, section = 'Майстерня KAMENOTES') => `<header class="ed-page-head ed-wrap">${section ? `<p class="ed-eyebrow">${section}</p>` : ''}<h1>${title}</h1>${text ? `<p class="ed-intro">${text}</p>` : ''}</header>`;
  const shell = (title, description, active, body, pageClass = '') => pageShell({ title: `${title} | KAMENOTES`, description, active, body })
    .replace('<body>', `<body class="ed-site ${pageClass}">`)
    .replace('</head>', '<link rel="stylesheet" href="css/editorial.css?v=20260918-v8">\n</head>')
    .replace('</body>', '<script src="js/editorial.js?v=20260918-v2"></script>\n<script type="module" src="js/motion-animations.js?v=20260918-v3"></script>\n</body>');
  const sectionHead = (title, href, label) => `<div class="ed-section-head"><h2>${title}</h2>${href ? link(href, label) : ''}</div>`;
  const ALL_SERVICES = [
    {
      slug: 'portret',
      title: 'Портрет у художника',
      badge: 'Ручна робота',
      shortDesc: 'Портрет на пам’ятник виконується професійним художником вручну. 100% схожість обличчя, живий погляд і стійкість на віки.',
      img: 'img/services/card-portret-hq.jpg',
      cta: 'Детальніше про послугу',
      url: 'portret.html'
    },
    {
      slug: 'litery',
      title: 'Букви на пам’ятник',
      badge: 'Шрифти та золото',
      shortDesc: 'Традиційне вирубування скарпеллю вручну, піскоструминний спосіб, верстатне гравірування та покриття сусальним золотом.',
      img: 'img/services/card-litery-hq.jpg',
      cta: 'Детальніше про послугу',
      url: 'litery.html'
    },
    {
      slug: 'oformlennya',
      title: 'Художнє оформлення',
      badge: 'Каталог символів',
      shortDesc: 'Каталог ритуальних образів та символів: ікони святих, розп’яття, квіти, свічки пам’яті, пейзажі та художні сюжети.',
      img: 'img/services/card-oformlennya-hq.jpg',
      cta: 'Детальніше про послугу',
      url: 'oformlennya.html'
    },
    {
      slug: 'brukivka',
      title: 'Гранітна бруківка',
      badge: 'Власне виробництво',
      shortDesc: 'Власне виробництво всіх видів бруківки: колота, пиляно-колота, повнопиляна та галтована шашка безпосередньо з цеху.',
      img: 'img/services/card-brukivka-hq.jpg',
      cta: 'Детальніше про послугу',
      url: 'brukivka.html'
    }
  ];

  const serviceNav = (excludeSlug = null) => {
    const items = excludeSlug
      ? ALL_SERVICES.filter(s => s.slug !== excludeSlug)
      : ALL_SERVICES;
    return `<nav class="ed-service-links" aria-label="Послуги майстерні">
      <ul class="ed-service-links-list">
        ${items.map(s => `
          <li>
            <a class="ed-service-links-item" href="${s.url}">
              <div class="ed-service-links-content">
                <span class="ed-service-links-title">${s.title}</span>
                <span class="ed-service-links-desc">${s.shortDesc}</span>
              </div>
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>`;
  };
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
      <section class="ed-section ed-wrap">
        ${sectionHead('Послуги майстерні', 'poslugy.html', 'Всі послуги')}
        ${serviceNav()}
      </section>
      ${orderStages()}
      <section class="ed-section ed-wrap ed-about-home">
        <div class="ed-statement">
          <h2>Майстерня граніту <br>в Коростишеві</h2>
          <div>
            <p>Виготовляємо пам’ятники з якісного українського граніту, габро та лабрадориту. Контролюємо весь цикл виробництва — від розпилу блоків до фінішного полірування та художнього оформлення.</p>
            <p>У нашій майстерні ви можете замовити як класичний одинарний або подвійний пам’ятник, так і меморіальний комплекс за індивідуальним проєктом.</p>
            ${link('vyrobnytstvo.html', 'Про виробництво')}
          </div>
        </div>
      </section>
      ${contact()}`, 'ed-home');
  }

  function production() {
    return shell('Виробництво пам’ятників', 'Власний каменеобробний цех KAMENOTES у Коростишеві. Розпил, полірування, різьблення, 3D-проєкти та підготовка пам’ятників до встановлення.', 'production', `
      <section class="ed-section ed-wrap">
        <div class="ed-statement ed-production-statement"><h1 class="ed-production-title">Від блоку <br>до готового виробу</h1><div><p>Розпилювання, окантовування, полірування та ручне різьблення виконуємо на власному виробництві. Художник наносить портрети, написи й декоративні елементи.</p><p>У майстерні можна побачити камінь наживо, порівняти колір і фактуру та оглянути готові роботи.</p></div></div>
        <div class="ed-gallery ed-gallery-three ed-process-gallery">
          ${picture('img/production/workshop_03.jpg', 'Розпил каменю')}
          ${picture('img/kamenotes/articles_polirovka-na-stanke.jpg', 'Полірування деталей')}
          ${picture('img/kamenotes/articles_reznue-rabotu-na-kamne.jpg', 'Ручне різьблення')}
          ${picture('img/production/workshop_05.jpg', 'Окантування та розкрій слябів')}
          ${picture('img/production/workshop_06.jpg', 'Контроль розпилу каменю')}
          ${picture('img/production/workshop_08.jpg', 'Виробництво гранітної бруківки')}
          ${picture('img/production/workshop_13.jpg', 'Готові поліровані сляби')}
          ${picture('img/production/workshop_17.jpg', 'Граніт Лізник та Покостівка')}
          ${picture('img/production/workshop_18.jpg', 'Деталі та заготовки пам’ятників')}
        </div>
      </section>
      <section class="ed-section ed-material-section"><div class="ed-wrap">
        ${sectionHead('Камінь та проєкт')}
        <div class="ed-information-columns"><article><h3>Габро, граніт, лабрадорит</h3><p>Чорне габро, сірий граніт Покостівка, червоний Лізник та лабрадорит. Камінь можна поєднувати в одному пам’ятнику.</p></article><article id="proekt"><h3>3D-моделювання</h3><p>Для індивідуального замовлення готуємо проєкт: у ньому видно пропорції, поєднання каменю та розташування деталей до початку роботи.</p></article></div>
        ${picture('img/production/workshop_16.jpg', 'Зразки природного каменю на території майстерні', { className: 'ed-material-photo' })}
      </div></section>
      <section class="ed-section ed-wrap">
        <div class="ed-statement"><h2>Перед відправленням</h2><p>Погоджуємо комплектацію та спосіб перевезення. Для складних пам’ятників виконуємо попереднє сухе складання на виробництві.</p></div>
        ${serviceNav()}
      </section>
      ${contact('Приїжджайте до майстерні', 'м. Коростишів, вул. Партизанська-117, Коростишівський гранітний завод. Зателефонуйте або напишіть заздалегідь, щоб домовитися про зустріч.')}`);
  }

  function decoration() {
    return shell('Художнє оформлення пам’ятників, каталог картинок для гравірування', 'Каталог ритуальних картинок для гравірування на пам’ятниках: образи святих, хрестики, квіти, свічки, пейзажі та зразки на камені. Майстерня KAMENOTES у Коростишеві.', 'services', `
      ${heading('Художнє оформлення', 'Каталог ритуальних зображень для гравірування на камені, образи святих, хрестики, квіти, свічки та пейзажі.', 'Майстерня KAMENOTES · Каталог малюнків')}
      
      <section class="ed-section ed-wrap">
        <div class="ed-statement">
          <h2>Художнє оформлення пам’ятників, <br>каталог картинок для гравірування</h2>
          <div>
            <p>Нижче Ви бачите основні категорії ритуальних зображень, які ми використовуємо для нанесення на камінь. Будь-яку картинку можна нанести гравіювальним станком під управлінням комп’ютера, а можна скористатися послугою професійного художника по каменю, який нанесе малюнок вручну. Ручна робота завжди цінувалася і цінується більше, ніж комп’ютерна. Тому якщо Ви хочете дійсно якісне гравіювання, то ми дуже рекомендуємо нашого <a class="ed-link" href="portret.html"><strong>ХУДОЖНИКА з гравірування на камені</strong></a>.</p>
            <p>Картинки можуть бути вибиті як на передній частині арки або стели пам’ятника (квіти, свічки, хрестики), так і на тильній стороні (пейзажі та ін.). Вам варто лише вибрати картинку, що сподобалася, і запам’ятати її номер, для того щоб повідомити нас.</p>
          </div>
        </div>

        <div class="ed-decor-catalog-grid" role="region" aria-label="6 каталогів зображень для гравірування">
          <article class="ed-decor-catalog-card">
            <a href="decor-catalog.html?category=obrazy" class="ed-decor-card-link">
              <div class="ed-decor-card-media">
                <img src="img/services/obrazy.jpg" loading="lazy" alt="Образи святих на пам’ятник">
              </div>
              <div class="ed-decor-card-body">
                <h3 class="ed-decor-card-title">Образи святих</h3>
                <p class="ed-decor-card-count">202 зразки · Ісус, Богородиця, святі, ангели</p>
              </div>
            </a>
          </article>

          <article class="ed-decor-catalog-card">
            <a href="decor-catalog.html?category=krestiki" class="ed-decor-card-link">
              <div class="ed-decor-card-media">
                <img src="img/services/krestiki.jpg" loading="lazy" alt="Хрестики на пам’ятник">
              </div>
              <div class="ed-decor-card-body">
                <h3 class="ed-decor-card-title">Хрестики</h3>
                <p class="ed-decor-card-count">34 зразки · Православні, католицькі, розп’яття</p>
              </div>
            </a>
          </article>

          <article class="ed-decor-catalog-card">
            <a href="decor-catalog.html?category=cvety" class="ed-decor-card-link">
              <div class="ed-decor-card-media">
                <img src="img/services/cvety.jpg" loading="lazy" alt="Квіти на пам’ятник">
              </div>
              <div class="ed-decor-card-body">
                <h3 class="ed-decor-card-title">Квіти</h3>
                <p class="ed-decor-card-count">35 зразків · Троянди, гвоздики, тюльпани, кольорові</p>
              </div>
            </a>
          </article>

          <article class="ed-decor-catalog-card">
            <a href="decor-catalog.html?category=svichky" class="ed-decor-card-link">
              <div class="ed-decor-card-media">
                <img src="img/services/svechi.jpg" loading="lazy" alt="Свічки та свічки з квітами для гравіювання на камені">
              </div>
              <div class="ed-decor-card-body">
                <h3 class="ed-decor-card-title">Свічки / Свічки з квітами</h3>
                <p class="ed-decor-card-count">40 зразків · Свічки пам’яті та композиції з квітами</p>
              </div>
            </a>
          </article>

          <article class="ed-decor-catalog-card">
            <a href="decor-catalog.html?category=peyzazh" class="ed-decor-card-link">
              <div class="ed-decor-card-media">
                <img src="img/services/peyzazh.jpg" loading="lazy" alt="Пейзажі, природа на пам’ятник">
              </div>
              <div class="ed-decor-card-body">
                <h3 class="ed-decor-card-title">Пейзажі, природа</h3>
                <p class="ed-decor-card-count">23 зразки · Ліси, річки, озера, гори на тильну сторону</p>
              </div>
            </a>
          </article>

          <article class="ed-decor-catalog-card">
            <a href="decor-catalog.html?category=na-kameni" class="ed-decor-card-link">
              <div class="ed-decor-card-media">
                <img src="img/decor/phoca_thumb_l_KH-01.jpg" loading="lazy" alt="Зразки на камені">
              </div>
              <div class="ed-decor-card-body">
                <h3 class="ed-decor-card-title">Зразки на камені</h3>
                <p class="ed-decor-card-count">15 зразків · Фото готового гравіювання на граніті</p>
              </div>
            </a>
          </article>
        </div>
      </section>

      <section class="ed-section ed-wrap ed-service-section" id="rizblennya">
        ${sectionHead('Ручне різьблення та барельєфи по каменю')}
        <div class="ed-detail-pair">
          <div class="ed-prose">
            <h3>Об’ємні елементи з природного каменю</h3>
            <p>Окрім плоского гравірування, наші майстри виконують ручне різьблення: об'ємні хрести на стелі, барельєфи троянд, драпування плащаницею, фаски та хвилясті фігурні фаски.</p>
            <p>Ручна обробка каменю надає пам’ятнику індивідуального авторського характеру та підкреслює шляхетну фактуру граніту.</p>
          </div>
          <div class="ed-gallery ed-gallery-two">
            ${picture('img/kamenotes/articles_reznue-rabotu-na-kamne.jpg', 'Ручна різьблена робота на граніті')}
            ${picture('img/kamenotes/gallery_khresti_KR-006.jpg', 'Рельєфний хрест ручної роботи майстра')}
          </div>
        </div>
      </section>

      <section class="ed-section ed-wrap">
        ${sectionHead('Інші послуги майстерні', 'poslugy.html', 'Всі послуги')}
        ${serviceNav('oformlennya')}
      </section>

      ${contact('Погодимо оформлення', 'Надішліть побажання щодо малюнків та модель пам’ятника. Художник допоможе підібрати композицію та погодить макет перед нанесенням на камінь.')}`);
  }

  function mounting() {
    return shell('Доставка та встановлення пам’ятників', 'Монтаж пам’ятників KAMENOTES у Коростишеві та по Україні: підготовка місця, армований бетонний фундамент, цоколь та встановлення під ключ. Гарантія.', 'services', `
      ${heading('Доставка та встановлення', 'Організуємо дбайливе перевезення виготовленого пам’ятника з Коростишева та надійний монтаж на кладовищі під ключ.')}

      <section class="ed-wrap ed-foundation-section">
        <div class="ed-foundation-card">
          <div class="ed-foundation-lead">
            <span class="ed-foundation-tag">Технологія монтажу</span>
            <h2>Надійний фундамент — <br>основа вічності пам’ятника</h2>
          </div>
          <div class="ed-foundation-content">
            <p>Встановлення гранітного монумента вимагає суворого дотримання інженерних норм. Граніт має велику питому вагу, тому неякісний монтаж без правильного армування може призвести до просідання та перекосу через кілька сезонів.</p>
            <p>Майстри KAMENOTES з 1995 року відпрацювали технологію капітального монтажу: від глибинної подушки до фінального полірування на кладовищі.</p>
          </div>
        </div>
      </section>

      <!-- ВІДЦЕНТРОВАНИЙ БЛОК: ЗАВЕРШЕННЯ ВСТАНОВЛЕННЯ -->
      <section class="ed-section ed-wrap">
        <div class="ed-mount-finish-centered">
          <h2>Завершення встановлення</h2>
          <p>Фінішне розшивання всіх стиків водостійким еластичним герметиком, захисна обробка граніту, фінальне полірування та повне прибирання будівельного сміття з ділянки. Пам’ятник здається замовнику в бездоганному стані.</p>
        </div>
        <div class="ed-mount-finish-photos">
          ${picture('img/mounting/montazh-pamyatnika-12.jpg', 'Укладання цоколя та надгробних плит')}
          ${picture('img/mounting/montazh-pamyatnika-01.jpg', 'Підготовчі роботи на ділянці')}
        </div>
      </section>

      <section class="ed-section ed-wrap ed-logistics">
        <div class="ed-statement">
          <h2>Доставка з Коростишева <br>по всій Україні</h2>
          <div>
            <p>Доставляємо пам'ятники власним вантажним транспортом або перевіреними службами доставки. Комплект надійно фіксується на дерев'яних піддонах з м'якими прокладками, що унеможливлює подряпини чи сколи полірування при перевезенні.</p>
            <p>При замовленні монтажу бригада приїжджає на місце з усіма необхідними матеріалами, бетоном та спеціальним підйомним інструментом.</p>
          </div>
        </div>
        <details class="ed-disclosure"><summary>Від чого залежить вартість монтажу?${arrow()}</summary><p>Від габаритів і ваги пам’ятника, рельєфу та стану ділянки, обсягу земляних і бетонних робіт, площі гранітного облицювання, необхідності демонтажу старої конструкції та відстані до кладовища.</p></details>
        <details class="ed-disclosure"><summary>Чи можна замовити пам'ятник без встановлення?${arrow()}</summary><p>Так. Ви можете забрати готовий пам’ятник самовивозом безпосередньо з нашого цеху в Коростишеві або замовити доставку до вашого міста без монтажних робіт.</p></details>
      </section>

      <section class="ed-section ed-wrap">
        ${sectionHead('Інші послуги майстерні', 'poslugy.html', 'Всі послуги')}
        ${serviceNav('montazh')}
      </section>

      ${contact('Розрахуємо доставку та монтаж', 'Надішліть фото ділянки, розміри місця та адресу кладовища. Додайте модель пам’ятника або її артикул для точного розрахунку.')}`);
  }

  function paving() {
    return shell('Гранітна бруківка від виробника', 'Виробництво гранітної бруківки всіх видів у Коростишеві: колота гранітна бруківка, пиляно-колота бруківка, згладжена бруківка (галтована бруківка) з габро, покостівки та лізника. Оптові поставки.', 'services', `
      ${heading('Гранітна бруківка', 'Наше підприємство має відділ з виробництва бруківки всіх видів: колота гранітна бруківка, пиляно-колота бруківка, згладжена бруківка (галтована бруківка) з габро, покостівки та лізника.', 'Власне виробництво · Коростишів')}



      <section class="ed-section ed-wrap">
        <div class="ed-statement">
          <h2>Оптові поставки <br>та економія 30%</h2>
          <div>
            <p><strong>Купити бруківку оптом</strong> — означає заощадити 30% своїх фінансів та гарантувати собі надійність та якість безпосередньо від виробника. Запорука стійкості дорожнього покриття, довговічності та збереження всіх його якостей — це коли матеріалом служить натуральна гранітна бруківка.</p>
            <p>Приймаємо оптові замовлення на <strong>виготовлення гранітної бруківки</strong> у будь-яких об'ємах із чорного габро, сірого граніту Покостівського родовища та бруківки із червоного каменю Лізники.</p>
          </div>
        </div>
      </section>

      <section class="ed-section ed-wrap">
        ${sectionHead('Види гранітної бруківки')}
        <dl class="ed-specification">
          <div><dt>Колота бруківка</dt><dd>Природна колота фактура всіх граней. Максимальна міцність, природне зчеплення та класичний вигляд мощення.</dd></div>
          <div><dt>Пиляно-колота</dt><dd>Поєднання гладких пиляних боків і колотої лицьової поверхні. Дозволяє отримати рівні, акуратні шви при укладанні.</dd></div>
          <div><dt>Повнопиляна з термообробкою</dt><dd>Ідеальна геометрія брусків. Лицьова грань обпалюється вогнем для протиковзкої шорсткої фактури.</dd></div>
          <div><dt>Галтована (згладжена шашка)</dt><dd>Камінь обробляється в барабанах: закруглені краї та плавний рельєф, що нагадує старовинні європейські площі.</dd></div>
        </dl>
      </section>

      <section class="ed-section ed-wrap">
        <div class="ed-statement">
          <h2>Розрахунок вартості <br>та ціни на бруківку</h2>
          <div>
            <p>Вартість гранітної бруківки підрахуємо вам за квадратурою. Колота та пиляно-колота бруківка із граніту продається по квадратних метрах. Ціни в прайсі на повнопиляну бруківку з термообробкою та галтовану шашку також рахуються в квадратних метрах (м²).</p>
            <p>Виробництво бруківки з каменю відбувається в Коростишівському цеху без посередників. Організовуємо доставку партій по всій Україні власним автотранспортом або залізничними вагонами.</p>
          </div>
        </div>
        <div class="ed-gallery ed-gallery-two">
          ${picture('img/services/bruschatka-01.jpg', 'Виробництво та фасування бруківки на заводі в Коростишеві')}
          ${picture('img/catalog/brukivka_2.jpg', 'Партії колотої та пиляної бруківки від цеху Коростишева')}
        </div>
      </section>

      <section class="ed-section ed-wrap">
        ${sectionHead('Інші послуги майстерні', 'poslugy.html', 'Всі послуги')}
        ${serviceNav('brukivka')}
      </section>

      ${contact('Замовити партію бруківки', 'Вкажіть потрібний вид бруківки, сорт каменю та орієнтовну площу в м². Прорахуємо точну вартість партії та доставку з цеху.')}`);
  }

  function servicesOverview(services) {
    const list = (Array.isArray(services) && services.length)
      ? services.filter(s => s.published !== false)
      : ALL_SERVICES;

    const cardsHtml = list.map(item => {
      const cover = item.coverImage || item.img || 'img/services/card-portret-hq.jpg';
      const title = item.title || '';
      const desc = item.shortDesc || '';
      const url = item.url || `${item.slug}.html`;
      const cta = item.cta || 'Детальніше про послугу';

      return `
        <a class="ed-service-card" href="${a(url)}">
          <figure class="ed-service-card-media">
            <img src="${a(cover)}" alt="${a(title)}" loading="lazy" width="960" height="600">
          </figure>
          <div class="ed-service-card-body">
            <h2 class="ed-service-card-title">${e(title)}</h2>
            <p class="ed-service-card-desc">${e(desc)}</p>
            <div class="ed-service-card-action">
              <span class="ed-service-card-cta">${e(cta)}</span>
              <span class="ed-service-card-arrow" aria-hidden="true">
                ${arrowRight()}
              </span>
            </div>
          </div>
        </a>`;
    }).join('');

    return shell('Послуги майстерні', 'Повний комплекс послуг каменеобробної майстерні KAMENOTES у Коростишеві: ручний портрет художника, букви та написи на граніті, художнє оформлення, гранітна бруківка, виготовлення та монтаж пам’ятників.', 'services', `
      ${heading('Послуги майстерні', 'Повний комплекс робіт з обробки природного каменю в Коростишеві: від розпилювання гранітних блоків і художнього різьблення до ручного портрета художника, рубаних літер із золоченням, власної бруківки та монтажу пам’ятників по Україні.', 'Каменеобробне виробництво · Коростишів')}

      <section class="ed-section ed-wrap ed-services-section">
        <div class="ed-section-head">
          <h2>Основні напрямки робіт</h2>
        </div>
        <div class="ed-services-grid" role="region" aria-label="Послуги майстерні">
          ${cardsHtml}
        </div>
      </section>

      <section class="ed-section ed-material-section">
        <div class="ed-wrap">
          ${sectionHead('Стандарти та технології майстерні')}
          <div class="ed-information-columns">
            <article>
              <h3>Ручна робота проти станка</h3>
              <p>На відміну від поверхневого гравірування голкою станка, художник пробиває камінь глибше в товщу габро, передаючи об’єм і живий погляд. Ручний портрет і вирубані скарпеллю літери не змиваються часом і чітко читаються навіть у дощову негоду.</p>
            </article>
            <article>
              <h3>Контрольне сухе складання</h3>
              <p>Перед відправленням замовнику кожен пам’ятник обов’язково збирається «на суху» на території нашого цеху. Ми перевіряємо точність прилягання всіх деталей, рівність площин, фаски та діагоналі до початку виїзду на кладовище.</p>
            </article>
            <article>
              <h3>100% природний граніт</h3>
              <p>Працюємо лише з перевіреними родовищами України: Букинське чорне габро, світло-сірий Покостівський граніт, червоний Лізник та лабрадорит з іризацією. Ми не використовуємо хімічні барвники чи смоли для штучного тонування каменю.</p>
            </article>
            <article>
              <h3>Капітальний монтаж на віки</h3>
              <p>Гранітні комплекси мають велику вагу, тому монтаж вимагає інженерного розрахунку: копаємо траншеї нижче рівня промерзання ґрунту, зварюємо міцний арматурний каркас і заливаємо монолітний заводський бетон.</p>
              <div style="margin-top: 14px;">${link('montazh.html', 'Технологія монтажу та етапи робіт')}</div>
            </article>
          </div>
        </div>
      </section>

      <section class="ed-section ed-wrap ed-services-faq">
        <div class="ed-statement">
          <h2>Практичні запитання <br>щодо послуг</h2>
          <div>
            <p>Відповідаємо на запитання, які найчастіше виникають у замовників перед початком робіт з каменем та оформленням пам’ятників.</p>
          </div>
        </div>
        <div class="ed-faq-list" style="margin-top: 32px;">
          <details class="ed-disclosure">
            <summary>Чи можна замовити лише художнє оформлення, якщо пам’ятник уже встановлений?${arrow()}</summary>
            <p>Так. Наші майстри можуть виїхати безпосередньо на кладовище для добивання нових дат, написів чи додаткових епітафій на вже встановленому пам’ятнику. Також ви можете привезти зняту стелу до нашого цеху в Коростишеві для повної реставрації або нанесення нового портрета.</p>
          </details>
          <details class="ed-disclosure">
            <summary>Яка фотографія потрібна для нанесення портрета на камінь?${arrow()}</summary>
            <p>Підійде будь-яке збережене фото: паперове з сімейного архіву, фото з паспорта чи посвідчення, або цифровий знімок з телефону. Наш художник особисто оцінює чіткість, за потреби вручну відновлює риси обличчя та обов’язково погоджує з вами розташування портрета на стелі перед початком роботи на камені.</p>
          </details>
          <details class="ed-disclosure">
            <summary>У чому різниця між машинними, піскоструминними та рубаними буквами?${arrow()}</summary>
            <p>Верстатне нанесення — швидкий та бюджетний варіант. Піскоструминний спосіб дає рівний матовий контур на полірованому камені. Рубані букви майстер вирубує вручну скарпеллю з глибоким трикутним V-профілем у товщу граніту — вони мають виразну світлотінь, вічну стійкість і саме на них наноситься натуральне сусальне золото.</p>
          </details>
          <details class="ed-disclosure">
            <summary>Скільки часу займає виконання замовлення?${arrow()}</summary>
            <p>Художнє оформлення арки (портрет, написи, хрестик та квіти) виконується за 3–7 робочих днів. Повний цикл виготовлення пам’ятника з нуля разом із розпилом, поліруванням деталей та сухим контрольним збиранням займає від 2 до 4 тижнів залежно від складності композиції.</p>
          </details>
          <details class="ed-disclosure">
            <summary>Чи здійснюєте доставку та монтаж у віддалені населені пункти?${arrow()}</summary>
            <p>Так. Доставляємо виготовлені комплекти власним транспортом або перевіреними службами доставки по всій Україні. При замовленні встановлення наша бригада приїжджає на кладовище з усім необхідним матеріалом, бетонним розчином, арматурою та підйомним інструментом для капітального монтажу під ключ.</p>
          </details>
        </div>
      </section>

      ${contact('Обговоримо ваше замовлення', 'Надішліть фотографію або ескіз пам\'ятника, побажання щодо оформлення та населений пункт. Ми запропонуємо оптимальні варіанти та прорахуємо кошторис.')}`);
  }

  function portretPage(service) {
    const s = service || {};
    const gallery = Array.isArray(s.gallery) ? s.gallery : [];
    const advantages = Array.isArray(s.advantages) ? s.advantages : [];

    const galleryHtml = gallery.map(item => `
      <div class="ed-process-item">
        ${picture(item.src, item.title, { caption: true })}
      </div>
    `).join('');

    return shell('Портрет на пам’ятник художником вручну', 'Ручне гравіювання портрета на пам’ятник у Коростишеві: професійний художник з академічною освітою, 100% схожість, портрет видно навіть у дощ, 20 років досвіду.', 'services', `
      ${heading('Портрет у художника', 'Ручне нанесення портрета на граніт професійним художником. Висока деталізація, живий погляд і гарантована стійкість на віки.', 'Художня майстерня · Ручна робота')}
      <div class="ed-wrap">${picture('img/services/services_hudozhnik_pamyatnikov.jpg', 'Художник наносить портрет на гранітний пам\'ятник вручну', { eager: true, className: 'ed-panorama' })}</div>
      
      <section class="ed-section ed-wrap">
        <div class="ed-statement">
          <h2>Художник з вищою <br>академічною освітою</h2>
          <div>
            <p>Після завершення виготовлення пам’ятника виконується його художнє оформлення — завершальний і найвідповідальніший процес, від якого залежить зовнішній вигляд та виразність усієї меморіальної композиції.</p>
            <p>Наш художник має вищу художню освіту. У 2002 році закінчила Головинське вище училище нерудних технологій за спеціальністю «Розпилювач каменю (обробка каменю) — шліфувальник-полірувальник виробів із природних гранітів». У 2003 році вступила до Косівського державного інституту прикладного та декоративного мистецтва від Львівської національної академії мистецтв, здобувши диплом спеціаліста з декоративно-прикладного, образотворчого мистецтва та дизайну.</p>
            <p>Близько 20 років щоденної роботи дозволили піднести майстерність до бездоганного професіоналізму. Роботи художниці отримали визнання замовників в Україні та за кордоном.</p>
          </div>
        </div>
      </section>

      <section class="ed-section ed-material-section">
        <div class="ed-wrap">
          ${sectionHead('Чому ручне гравіювання перевершує станок')}
          <div class="ed-information-columns">
            <article>
              <h3>5 переваг ручної роботи</h3>
              <ul class="ed-bullet-list">
                ${advantages.map(adv => `<li>${e(adv)}</li>`).join('')}
              </ul>
            </article>
            <article>
              <h3>Вимоги до фотографії</h3>
              <p>Для нанесення портрета підходить будь-яке чітке фото: цифрове, паперове, з паспорта або сімейного архіву. Перед початком роботи художник уважно оглядає знімок, оцінює різкість і за потреби проконсультує щодо оптимального розташування образу на стелі.</p>
              <p>На ручному портреті майстер виводить усе до найдрібніших деталей: півтіні, форму очей, зморшки та глибину погляду, яку не здатна передати автоматика станка.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="ed-section ed-wrap" id="dozhdi">
        ${sectionHead('Порівняння: ручний портрет та станок у негоду')}
        <div class="ed-detail-pair">
          <div class="ed-prose">
            <h3>Ручний портрет видно навіть у дощ!</h3>
            <p>Комп'ютерний гравірувальний станок пробиває камінь дуже мілко (лише тонкий поверхневий шар полірування). Тому в будь-яку вологу погоду чи під час дощу портрет, вибитий комп'ютером, зливається з полірованою поверхнею арки.</p>
            <p>Художник вибиває портрет набагато глибше, формуючи глибокий світлотіньовий рельєф у граніті. Завдяки цьому ручний портрет залишається чітким, контрастним і світлим за будь-якої погоди.</p>
          </div>
          <div class="ed-gallery ed-gallery-two">
            ${picture('img/services/portrety-solnce.jpg', 'Портрети за сонячної погоди')}
            ${picture('img/services/portrety-dozhdi.jpg', 'Портрети в дощову погоду: ручний портрет справа залишається чітким')}
          </div>
        </div>
      </section>

      <section class="ed-section ed-wrap">
        ${sectionHead('Фото процесу гравірування портретів художником вручну')}
        <div class="ed-gallery ed-gallery-three ed-process-gallery">
          ${galleryHtml}
        </div>
      </section>

      <section class="ed-section ed-wrap">
        ${sectionHead('Інші послуги майстерні', 'poslugy.html', 'Всі послуги')}
        ${serviceNav('portret')}
      </section>

      ${contact('Замовте консультацію художника', 'Надішліть фотографію людини, вкажіть модель пам’ятника або розмір стели. Художник оцінить якість знімка та підкаже деталі оформлення.')}`);
  }

  function literyPage(service) {
    const s = service || {};
    return shell('Букви на пам\'ятник: види літер та нанесення', 'Види та способи нанесення літер на пам\'ятник у Коростишеві: піскоструминні літери, рубані скарпеллю, сусальне золото. Зразки робіт KAMENOTES.', 'services', `
      ${heading('Букви на пам\'ятник', 'Художнє оформлення написів: від доступного гравірування до монументальних рубаних літер, покритих сусальним золотом.', 'Художнє оформлення · Написи')}
      <div class="ed-wrap">${picture('img/services/bykvu-ryb-sysalnue.jpg', 'Рубані літери на граніті, покриті натуральним сусальним золотом', { eager: true, className: 'ed-panorama' })}</div>

      <section class="ed-section ed-wrap">
        <div class="ed-statement">
          <h2>Спосіб нанесення літер <br>визначає характер монумента</h2>
          <div>
            <p>Художнє оформлення пам'ятника, як головний процес завершення робіт у циклі етапів його виготовлення, на сьогоднішній день має багато варіантів за технологіями виконання. Кожен з цих варіантів гравіювання має свої переваги та недоліки.</p>
            <p>Ми вважаємо, що кожен замовник повинен чітко розуміти, що він обирає: простоту та фінансову вигоду або якість і солідність. Нижче представлені всі 4 способи нанесення з детальними фотографіями кожного виду робіт.</p>
          </div>
        </div>

        <nav class="ed-anchor-nav" aria-label="Розділи сторінки">
          <a href="#mashynni">
            <span>Літери станком</span>
            <svg class="ed-anchor-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg>
          </a>
          <a href="#piskostryi">
            <span>Піскоструминні</span>
            <svg class="ed-anchor-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg>
          </a>
          <a href="#rubani">
            <span>Рубані</span>
            <svg class="ed-anchor-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg>
          </a>
          <a href="#zoloto">
            <span>Сусальне золото</span>
            <svg class="ed-anchor-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg>
          </a>
        </nav>

        <!-- 1. Машинне нанесення -->
        <div class="ed-letter-chapter ed-service-section" id="mashynni">
          <h2>Літери машинного нанесення (звичайна гравіровка станком)</h2>
          <p class="ed-letter-desc">Класичне гравірування на комп'ютерному верстаті за узгодженим цифровим макетом. Алмазна або ударна голка знімає тонкий поверхневий шар полірування граніту. Забезпечує точну геометрію ліній, ідеальний контур та акуратне нанесення стандартних шрифтів, ПІБ і дат за найбільш доступною вартістю.</p>
          <div class="ed-letter-photos-full">
            ${picture('img/services/hudozhka-14.jpg', 'Комп\'ютерне нанесення літер та написів на гранітний пам\'ятник')}
          </div>
        </div>

        <!-- 2. Піскоструминні літери -->
        <div class="ed-letter-chapter ed-service-section" id="piskostryi">
          <h2>Літери піскоструминні (гравіровка піскоструйним апаратом)</h2>
          <p class="ed-letter-desc">Нанесення тексту за допомогою абразивного піскоструминного апарату під високим тиском через щільний захисний трафарет. Літери отримують чіткий контур, приємну оксамитово-матову фактуру та пробиваються глибше, ніж верстатом. Напис чудово читається на полірованому чорному чи кольоровому камені при бічному освітленні.</p>
          <div class="ed-letter-photos-full">
            ${picture('img/services/bykvu-peskostryi-01.jpg', 'Букви на камінь піскоструминні — приклад нанесення на граніті')}
            ${picture('img/services/bykvu-peskostryi-02.jpg', 'Букви на пам\'ятник піскоструминні — зразок чіткості шрифту')}
          </div>
        </div>

        <!-- 3. Рубані літери -->
        <div class="ed-letter-chapter ed-service-section" id="rubani">
          <h2>Букви РУБАНІ (рублені вручну майстром-каменотесом скарпеллю)</h2>
          <p class="ed-letter-desc">Традиційний старовинний спосіб нанесення букв майстром-каменотесом вручну за допомогою скарпелі. Кожна літера вирубується в товщу граніту з трикутним V-подібним профілем. Завдяки виразній глибокій світлотіні такі написи виглядають монументально, солідно й ніколи не змиваються часом, негодою чи дощем.</p>
          <div class="ed-letter-photos-full">
            ${picture('img/services/bykvu-ryblennue-01.jpg', 'Рубані літери на пам\'ятнику майстром вручну')}
            ${picture('img/services/bykvu-ryblennue-02.jpg', 'Літери рубані заглиблені в товщу граніту (V-подібний профіль)')}
          </div>
        </div>

        <!-- 4. Сусальне золото -->
        <div class="ed-letter-chapter ed-service-section" id="zoloto">
          <h2>Букви рублені і покриті натуральним сусальним золотом</h2>
          <p class="ed-letter-desc">Найбільш урочистий, довговічний та статусний спосіб меморіального оформлення. Глибокі вирубані літери ґрунтуються спеціальним стійким лаком та покриваються найтоншими листами натурального сусального золота. Золочені написи яскраво сяють на чорному граніті габро, не тьмяніють на відкритому повітрі десятиліттями та надають меморіалу виняткової величі.</p>
          <div class="ed-letter-photos-full">
            ${picture('img/services/bykvu-ryb-sysalnue.jpg', 'Літери рубані покриті натуральним сусальним золотом')}
          </div>
        </div>
      </section>


      <section class="ed-section ed-wrap">
        ${sectionHead('Інші послуги майстерні', 'poslugy.html', 'Всі послуги')}
        ${serviceNav('litery')}
      </section>

      ${contact('Узгодимо написи та шрифт', 'Надішліть ПІБ, дати та текст епітафії. Ми покажемо приклади шрифтів та погодимо макет перед нанесенням на камінь.')}`);
  }

  function works(reviews) {
    const published = reviews.filter(r => r.published !== false);
    const reviewPhotos = review => review.images?.length ? `<div class="ed-review-images">${review.images.map(src => picture(src, review.title, { caption: false })).join('')}</div>` : '';
    const featured = published[0];
    const featuredMarkup = featured ? `<article class="ed-review-featured">
      <div class="ed-review-quote"><span class="ed-quote-mark" aria-hidden="true">“</span><blockquote>${e(featured.text)}</blockquote><footer><strong>${e(featured.name)}${featured.email ? ` <span class="ed-review-email">(${e(featured.email)})</span>` : ''}</strong><time datetime="${a(featured.date)}">${e(String(featured.date).slice(0, 4))}</time></footer></div>
      ${reviewPhotos(featured)}
    </article>` : '';
    const reviewMarkup = published.slice(1).map(r => `<article class="ed-review-card"><header><h2>${e(r.name)}${r.email ? ` <span class="ed-review-email">(${e(r.email)})</span>` : ''}</h2><time datetime="${a(r.date)}">${e(String(r.date).slice(0, 4))}</time></header><blockquote>${e(r.text)}</blockquote>${reviewPhotos(r)}</article>`).join('');
    return shell('Відгуки замовників', 'Відгуки замовників KAMENOTES про виготовлення, художнє оформлення, доставку та встановлення гранітних пам’ятників.', 'reviews', `
      ${heading('Відгуки замовників', 'Слова людей, для яких ми виготовляли, оформлювали та встановлювали пам’ятники.')}
      <section class="ed-section ed-wrap ed-reviews" id="reviews">${featuredMarkup}<div class="ed-review-grid">${reviewMarkup}</div></section>
      ${contact()}`);
  }
  return { home, production, servicesOverview, portretPage, literyPage, decoration, mounting, paving, works };
};
