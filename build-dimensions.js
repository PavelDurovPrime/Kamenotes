const fs = require('fs');
const path = require('path');

function buildDimensionDiagrams() {
const site = path.join(__dirname, 'site');
const products = JSON.parse(fs.readFileSync(path.join(site, 'data', 'products.json'), 'utf8'));
const output = path.join(site, 'img', 'dimensions');
fs.mkdirSync(output, { recursive: true });

const configs = {
  'km-1': {
    lines: [
      'Стела: 100 × 50 × 8 см',
      'Підставка: 60 × 20 × 15 см',
      'Квітник: 100 × 10 × 8 см (2 шт.)',
      'Поперечина: 50 × 10 × 8 см'
    ],
    photoNote: 'Одинарний комплект'
  },
  'km-29': {
    lines: [
      'Стела: 100 × 60 × 8 см',
      'Кубики: 15 × 15 × 15 см (2 шт.)',
      'Тумба: 100 × 20 × 20 см',
      'Квітник: 100 × 10 × 8 см (3 шт.)'
    ],
    photoNote: 'Подвійний комплект'
  }
};

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

for (const [id, config] of Object.entries(configs)) {
  const item = products.find(product => product.id === id);
  if (!item || !item.overallDimensions || !item.dimensionDiagram) throw new Error('Missing dimensions for ' + id);
  const d = item.overallDimensions;
  const jpg = fs.readFileSync(path.join(site, item.img)).toString('base64');
  const title = esc(item.title);
  const widthArrow = id === 'km-29' ? `<path d="M96 48h145" class="arrow"/><text x="168" y="33" class="label" text-anchor="middle">Ширина ${d.width} см</text>` : '';
  const lines = config.lines.map((line, index) => `<text x="407" y="${293 + index * 28}" class="detail">${esc(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="850" height="450" viewBox="0 0 850 450" role="img" aria-labelledby="title desc">
<title id="title">${title}: розміри комплекту</title>
<desc id="desc">Загальна висота ${d.height} см, ширина ${d.width} см, довжина разом із квітником ${d.length} см. ${esc(config.lines.join('. '))}</desc>
<style>
  .title{font:700 26px Arial,sans-serif;fill:#1c2931}
  .label{font:700 18px Arial,sans-serif;fill:#31576b}
  .value{font:700 27px Arial,sans-serif;fill:#203039}
  .detail{font:16px Arial,sans-serif;fill:#35444b}
  .small{font:14px Arial,sans-serif;fill:#66777e}
  .arrow{stroke:#1686a8;stroke-width:3;fill:none;marker-start:url(#head);marker-end:url(#head)}
</style>
<defs><marker id="head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M10 0 0 5 10 10" fill="none" stroke="#1686a8" stroke-width="1.7"/></marker></defs>
<rect width="850" height="450" rx="12" fill="#f6f8f8"/>
<rect x="59" y="66" width="292" height="292" rx="6" fill="#e8ebed"/>
<image href="data:image/jpeg;base64,${jpg}" x="60" y="67" width="290" height="290"/>
${widthArrow}
<path d="M38 75v274" class="arrow"/>
<text x="11" y="211" transform="rotate(-90 11 211)" class="label" text-anchor="middle">Висота ${d.height} см</text>
<path d="M73 386h265" class="arrow"/>
<text x="206" y="418" class="label" text-anchor="middle">Довжина ${d.length} см</text>
<rect x="385" y="46" width="425" height="356" rx="10" fill="#ffffff" stroke="#d7e0e3"/>
<text x="407" y="84" class="title">${title}</text>
<text x="407" y="111" class="small">${esc(config.photoNote)} · загальні габарити</text>
<path d="M407 125h380" stroke="#d7e0e3"/>
<text x="407" y="156" class="label">Висота з підставкою</text><text x="769" y="156" class="value" text-anchor="end">${d.height} см</text>
<text x="407" y="194" class="label">Ширина</text><text x="769" y="194" class="value" text-anchor="end">${d.width} см</text>
<text x="407" y="232" class="label">Довжина з квітником</text><text x="769" y="232" class="value" text-anchor="end">${d.length} см</text>
<path d="M407 250h380" stroke="#d7e0e3"/>
${lines}
</svg>`;
  fs.writeFileSync(path.join(site, item.dimensionDiagram), svg, 'utf8');
  process.stdout.write(item.dimensionDiagram + '\n');
}


}
module.exports = { buildDimensionDiagrams };
if (require.main === module) buildDimensionDiagrams();
