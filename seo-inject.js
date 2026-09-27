/**
 * SEO Optimizer для KAMENOTES
 * Додає Schema markup, Open Graph теги, canonical до всіх HTML сторінок
 * Запуск: node seo-inject.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://kamenotes.com';
const SITE_DIR = path.join(__dirname, 'site');

// === Конфігурація сторінок ===
const pages = {
  'index.html': {
    canonical: `${SITE_URL}/`,
    og: {
      title: "Гранітні пам'ятники в Коростишеві | KAMENOTES",
      description: "Майстерня KAMENOTES: виготовлення гранітних пам'ятників у Коростишеві з 1995 року, художнє оформлення, доставка та встановлення.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#organization`,
        name: 'KAMENOTES',
        url: SITE_URL,
        logo: `${SITE_URL}/img/logo-s1.png`,
        image: `${SITE_URL}/img/og-image.jpg`,
        description: "Власне виробництво гранітних пам'ятників у Коростишеві з 1995 року. Виготовлення, художнє оформлення, доставка та встановлення по всій Україні.",
        foundingDate: '1995',
        telephone: '+380977157915',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'вул. Партизанська, 117',
          addressLocality: 'Коростишів',
          addressRegion: 'Житомирська область',
          postalCode: '12500',
          addressCountry: 'UA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.3167,
          longitude: 29.0667,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
            opens: '08:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '15:00',
          },
        ],
        areaServed: { '@type': 'Country', name: 'Україна' },
        sameAs: [],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Каталог пам\'ятників та послуг',
          url: `${SITE_URL}/catalog.html`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'KAMENOTES',
        inLanguage: 'uk',
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/catalog.html?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  },

  'catalog.html': {
    canonical: `${SITE_URL}/catalog.html`,
    og: {
      title: "Каталог гранітних пам'ятників | KAMENOTES",
      description: "Понад 1960 моделей гранітних пам'ятників: одинарні, подвійні, військові, дитячі, VIP. Фільтр за ціною, розміром, матеріалом.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/catalog.html`,
        name: "Каталог гранітних пам'ятників",
        url: `${SITE_URL}/catalog.html`,
        description: "Повний каталог гранітних пам'ятників KAMENOTES — понад 1960 моделей різних типів.",
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'uk',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${SITE_URL}/catalog.html` },
        ],
      },
    ],
  },

  'poslugy.html': {
    canonical: `${SITE_URL}/poslugy.html`,
    og: {
      title: 'Послуги каменеобробної майстерні | KAMENOTES',
      description: "Виготовлення пам'ятників, художній портрет, гравіювання написів, монтаж, доставка. KAMENOTES — Коростишів, Україна.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_URL}/poslugy.html`,
        name: "Виготовлення гранітних пам'ятників",
        url: `${SITE_URL}/poslugy.html`,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Україна' },
        description: "Повний комплекс послуг: виготовлення пам'ятників, художній портрет, гравіювання, монтаж.",
        inLanguage: 'uk',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Послуги', item: `${SITE_URL}/poslugy.html` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: "Скільки коштує гранітний пам'ятник?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Вартість гранітного пам'ятника залежить від моделі, розміру, якості каменю та складності оформлення. Базові моделі починаються від 5 900 грн. Для точного розрахунку зверніться до нашого відділу продажу за телефоном 097 715 79 15.",
            },
          },
          {
            '@type': 'Question',
            name: "Чи здійснюєте доставку і монтаж по всій Україні?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Так, KAMENOTES здійснює доставку та монтаж гранітних пам'ятників по всій Україні. Вартість і терміни доставки розраховуються індивідуально залежно від регіону.",
            },
          },
          {
            '@type': 'Question',
            name: "Які терміни виготовлення пам'ятника?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Стандартний термін виготовлення пам'ятника складає від 14 до 30 днів залежно від складності замовлення. Терміновий виробіток можливий за додаткову оплату.",
            },
          },
          {
            '@type': 'Question',
            name: "Чи можна приїхати подивитись на виробництво?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Так, ми запрошуємо відвідати наше виробництво у Коростишеві (вул. Партизанська, 117). При замовленні ми повернемо витрати на дорогу. Попередньо зателефонуйте: 097 715 79 15.",
            },
          },
        ],
      },
    ],
  },

  'kontakty.html': {
    canonical: `${SITE_URL}/kontakty.html`,
    og: {
      title: 'Контакти та проїзд до заводу | KAMENOTES Коростишів',
      description: "Контакти KAMENOTES: м. Коростишів, вул. Партизанська-117, телефони керівництва, відділу продажу, цеху, email і точна карта проїзду.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#organization`,
        name: 'KAMENOTES',
        url: SITE_URL,
        telephone: '+380977157915',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'вул. Партизанська, 117',
          addressLocality: 'Коростишів',
          addressRegion: 'Житомирська область',
          postalCode: '12500',
          addressCountry: 'UA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.3167,
          longitude: 29.0667,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
            opens: '08:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '15:00',
          },
        ],
        hasMap: 'https://maps.google.com/?q=Коростишів,+вул.+Партизанська+117',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Контакти', item: `${SITE_URL}/kontakty.html` },
        ],
      },
    ],
  },

  'vyrobnytstvo.html': {
    canonical: `${SITE_URL}/vyrobnytstvo.html`,
    og: {
      title: "Виробництво гранітних пам'ятників | KAMENOTES",
      description: "Власне виробництво KAMENOTES у Коростишеві: сучасне обладнання, природний граніт, повний цикл — від заготовки до встановлення.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}/vyrobnytstvo.html`,
        name: "Виробництво гранітних пам'ятників",
        url: `${SITE_URL}/vyrobnytstvo.html`,
        description: "Власне виробництво KAMENOTES: технологія виготовлення, матеріали, обладнання.",
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'uk',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Виробництво', item: `${SITE_URL}/vyrobnytstvo.html` },
        ],
      },
    ],
  },

  'vidguky.html': {
    canonical: `${SITE_URL}/vidguky.html`,
    og: {
      title: "Відгуки клієнтів | KAMENOTES",
      description: "Реальні відгуки замовників гранітних пам'ятників KAMENOTES з усієї України. Читайте досвід клієнтів про якість і сервіс.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}/vidguky.html`,
        name: 'Відгуки клієнтів KAMENOTES',
        url: `${SITE_URL}/vidguky.html`,
        description: "Відгуки клієнтів KAMENOTES про виготовлення та встановлення гранітних пам'ятників.",
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'uk',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Відгуки', item: `${SITE_URL}/vidguky.html` },
        ],
      },
    ],
  },

  'portret.html': {
    canonical: `${SITE_URL}/portret.html`,
    og: {
      title: 'Художній портрет на граніті | KAMENOTES',
      description: "Ручний гравірований портрет на граніті від досвідченого художника. KAMENOTES — Коростишів.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Художній портрет на граніті',
        url: `${SITE_URL}/portret.html`,
        provider: { '@id': `${SITE_URL}/#organization` },
        description: 'Ручне гравіювання портрету на граніті від досвідченого художника.',
        areaServed: { '@type': 'Country', name: 'Україна' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Послуги', item: `${SITE_URL}/poslugy.html` },
          { '@type': 'ListItem', position: 3, name: 'Художній портрет', item: `${SITE_URL}/portret.html` },
        ],
      },
    ],
  },

  'litery.html': {
    canonical: `${SITE_URL}/litery.html`,
    og: {
      title: 'Літери та написи на граніті | KAMENOTES',
      description: "Гравіювання букв, написів, епітафій та дат на гранітних пам'ятниках. KAMENOTES — Коростишів.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Літери та написи на граніті',
        url: `${SITE_URL}/litery.html`,
        provider: { '@id': `${SITE_URL}/#organization` },
        description: 'Гравіювання букв, написів та епітафій на граніті.',
        areaServed: { '@type': 'Country', name: 'Україна' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Послуги', item: `${SITE_URL}/poslugy.html` },
          { '@type': 'ListItem', position: 3, name: 'Літери та написи', item: `${SITE_URL}/litery.html` },
        ],
      },
    ],
  },

  'oformlennya.html': {
    canonical: `${SITE_URL}/oformlennya.html`,
    og: {
      title: "Художнє оформлення пам'ятників | KAMENOTES",
      description: "Художнє оформлення гранітних пам'ятників: декор, орнаменти, флористика. KAMENOTES — власне виробництво у Коростишеві.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: "Художнє оформлення пам'ятників",
        url: `${SITE_URL}/oformlennya.html`,
        provider: { '@id': `${SITE_URL}/#organization` },
        description: "Декоративне художнє оформлення гранітних пам'ятників.",
        areaServed: { '@type': 'Country', name: 'Україна' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Послуги', item: `${SITE_URL}/poslugy.html` },
          { '@type': 'ListItem', position: 3, name: 'Художнє оформлення', item: `${SITE_URL}/oformlennya.html` },
        ],
      },
    ],
  },

  'montazh.html': {
    canonical: `${SITE_URL}/montazh.html`,
    og: {
      title: "Монтаж та встановлення пам'ятників | KAMENOTES",
      description: "Професійний монтаж та встановлення гранітних пам'ятників по всій Україні. KAMENOTES — Коростишів.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: "Монтаж пам'ятників",
        url: `${SITE_URL}/montazh.html`,
        provider: { '@id': `${SITE_URL}/#organization` },
        description: "Професійне встановлення та монтаж гранітних пам'ятників по всій Україні.",
        areaServed: { '@type': 'Country', name: 'Україна' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Послуги', item: `${SITE_URL}/poslugy.html` },
          { '@type': 'ListItem', position: 3, name: 'Монтаж', item: `${SITE_URL}/montazh.html` },
        ],
      },
    ],
  },

  'brukivka.html': {
    canonical: `${SITE_URL}/brukivka.html`,
    og: {
      title: 'Гранітна бруківка | KAMENOTES',
      description: "Виготовлення та укладання гранітної бруківки. KAMENOTES — власне виробництво у Коростишеві з 1995 року.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Гранітна бруківка',
        url: `${SITE_URL}/brukivka.html`,
        provider: { '@id': `${SITE_URL}/#organization` },
        description: 'Виготовлення та укладання гранітної бруківки.',
        areaServed: { '@type': 'Country', name: 'Україна' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Послуги', item: `${SITE_URL}/poslugy.html` },
          { '@type': 'ListItem', position: 3, name: 'Гранітна бруківка', item: `${SITE_URL}/brukivka.html` },
        ],
      },
    ],
  },

  'decor-catalog.html': {
    canonical: `${SITE_URL}/decor-catalog.html`,
    og: {
      title: 'Каталог декорів та оздоблень | KAMENOTES',
      description: "Каталог декоративних елементів для гранітних пам'ятників: орнаменти, квіти, символіка. KAMENOTES — Коростишів.",
      type: 'website',
      image: `${SITE_URL}/img/og-image.jpg`,
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Каталог декорів',
        url: `${SITE_URL}/decor-catalog.html`,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'uk',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Каталог декорів', item: `${SITE_URL}/decor-catalog.html` },
        ],
      },
    ],
  },
};

// === Функція генерації SEO-блоку ===
function buildSeoBlock(config) {
  const { canonical, og, schema } = config;
  const lines = [];

  // Canonical
  lines.push(`  <link rel="canonical" href="${canonical}">`);

  // Open Graph
  lines.push(`  <meta property="og:type" content="${og.type}">`);
  lines.push(`  <meta property="og:url" content="${canonical}">`);
  lines.push(`  <meta property="og:title" content="${og.title}">`);
  lines.push(`  <meta property="og:description" content="${og.description}">`);
  lines.push(`  <meta property="og:image" content="${og.image}">`);
  lines.push(`  <meta property="og:locale" content="uk_UA">`);
  lines.push(`  <meta property="og:site_name" content="KAMENOTES">`);

  // Twitter Card
  lines.push(`  <meta name="twitter:card" content="summary_large_image">`);
  lines.push(`  <meta name="twitter:title" content="${og.title}">`);
  lines.push(`  <meta name="twitter:description" content="${og.description}">`);
  lines.push(`  <meta name="twitter:image" content="${og.image}">`);

  // Schema JSON-LD
  const schemaArr = Array.isArray(schema) ? schema : [schema];
  for (const s of schemaArr) {
    lines.push(`  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`);
  }

  return lines.join('\n');
}

// === Обробка файлів ===
let processed = 0;
let skipped = 0;

for (const [filename, config] of Object.entries(pages)) {
  const filePath = path.join(SITE_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Файл не знайдено: ${filename}`);
    skipped++;
    continue;
  }

  // Читаємо як Buffer і конвертуємо явно в UTF-8
  const rawBuffer = fs.readFileSync(filePath);
  let html = rawBuffer.toString('utf8');

  // Перевіряємо чи вже є SEO-блок
  if (html.includes('<!-- SEO-KAMENOTES -->')) {
    // Замінюємо існуючий блок
    html = html.replace(/<!-- SEO-KAMENOTES -->[\s\S]*?<!-- \/SEO-KAMENOTES -->/,
      `<!-- SEO-KAMENOTES -->\n${buildSeoBlock(config)}\n  <!-- /SEO-KAMENOTES -->`);
    console.log(`🔄 Оновлено: ${filename}`);
  } else {
    // Вставляємо перед </head>
    const seoBlock = `<!-- SEO-KAMENOTES -->\n${buildSeoBlock(config)}\n  <!-- /SEO-KAMENOTES -->`;
    html = html.replace('</head>', `${seoBlock}\n</head>`);
    console.log(`✅ Додано: ${filename}`);
  }

  // Записуємо як Buffer UTF-8 (без BOM)
  fs.writeFileSync(filePath, Buffer.from(html, 'utf8'));
  processed++;
}

console.log(`\n=== Готово ===`);
console.log(`Оброблено: ${processed} сторінок`);
console.log(`Пропущено: ${skipped} сторінок`);
