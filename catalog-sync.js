const { buildCatalogOnly, renderProductCard, PRODUCTS_FILE, CATALOG_HTML_FILE } = require('./build-site');

function syncCatalog() {
  try {
    const result = buildCatalogOnly();
    console.log(`Synced catalog.html with ${result.count} products.`);
    return true;
  } catch (error) {
    console.error('Catalog sync failed:', error);
    return false;
  }
}

module.exports = { syncCatalog, renderProductCard, PRODUCTS_FILE, CATALOG_HTML_FILE };

if (require.main === module && !syncCatalog()) process.exitCode = 1;
