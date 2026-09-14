// Keep the established generator and admin rebuild hooks as the single source.
const { buildAll } = require('./build-site');

if (require.main === module) {
  const result = buildAll();
  console.log(`KAMENOTES: generated ${result.count} catalog items.`);
}

module.exports = { buildAll };
