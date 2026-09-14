const http = require('http');
const fs = require('fs');
const path = require('path');
const { syncCatalog, PRODUCTS_FILE } = require('./catalog-sync');
const { buildReviewsOnly, REVIEWS_FILE } = require('./build-site');

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, 'site');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // 20MB limit
      if (body.length > 20 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        if (!body.trim()) return resolve({});
        const data = JSON.parse(body);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split('?');
  const reqPath = decodeURI(urlParts[0]);

  // CORS headers for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API ROUTES
  if (reqPath.startsWith('/api/')) {
    try {
      // GET /api/products
      if (reqPath === '/api/products' && req.method === 'GET') {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(data);
        return;
      }

      // POST /api/products
      if (reqPath === '/api/products' && req.method === 'POST') {
        const body = await readJsonBody(req);
        if (!body.sku || !body.title) {
          sendJson(res, 400, { success: false, error: 'Вкажіть артикул та назву моделі' });
          return;
        }

        const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        const newProduct = {
          id: body.id || `km-custom-${Date.now()}`,
          sku: body.sku.trim(),
          title: body.title.trim(),
          img: body.img || 'img/kamenotes/shop_pamyatnik_km50.jpg',
          badge: body.badge ? body.badge.trim() : '',
          price: Number(body.price) || 0,
          category: body.category || 'odinarni',
          specs: Array.isArray(body.specs) ? body.specs : (typeof body.specs === 'string' ? body.specs.split('\n').map(s => s.trim()).filter(Boolean) : [])
        };

        products.unshift(newProduct);
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
        syncCatalog();

        sendJson(res, 201, { success: true, product: newProduct });
        return;
      }

      // PUT /api/products/:id
      if (reqPath.startsWith('/api/products/') && req.method === 'PUT') {
        const productId = decodeURIComponent(reqPath.replace('/api/products/', ''));
        const body = await readJsonBody(req);

        const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        const idx = products.findIndex(p => p.id === productId || p.sku === productId);

        if (idx === -1) {
          sendJson(res, 404, { success: false, error: 'Товар не знайдено' });
          return;
        }

        if (body.price !== undefined) products[idx].price = Number(body.price);
        if (body.title !== undefined) products[idx].title = body.title.trim();
        if (body.sku !== undefined) products[idx].sku = body.sku.trim();
        if (body.badge !== undefined) products[idx].badge = body.badge.trim();
        if (body.category !== undefined) products[idx].category = body.category;
        if (body.img !== undefined) products[idx].img = body.img;
        if (body.specs !== undefined) {
          products[idx].specs = Array.isArray(body.specs)
            ? body.specs
            : body.specs.split('\n').map(s => s.trim()).filter(Boolean);
        }

        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
        syncCatalog();

        sendJson(res, 200, { success: true, product: products[idx] });
        return;
      }

      // DELETE /api/products/:id
      if (reqPath.startsWith('/api/products/') && req.method === 'DELETE') {
        const productId = decodeURIComponent(reqPath.replace('/api/products/', ''));
        const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        const filtered = products.filter(p => p.id !== productId && p.sku !== productId);

        if (filtered.length === products.length) {
          sendJson(res, 404, { success: false, error: 'Товар не знайдено' });
          return;
        }

        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(filtered, null, 2), 'utf8');
        syncCatalog();

        sendJson(res, 200, { success: true, count: filtered.length });
        return;
      }

      // GET /api/reviews
      if (reqPath === '/api/reviews' && req.method === 'GET') {
        const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(data);
        return;
      }

      // POST /api/reviews
      if (reqPath === '/api/reviews' && req.method === 'POST') {
        const body = await readJsonBody(req);
        if (!body.name || !body.text) {
          sendJson(res, 400, { success: false, error: "Вкажіть ім'я та текст відгуку" });
          return;
        }
        const reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
        const review = {
          id: body.id || `review-${Date.now()}`,
          name: String(body.name).trim(),
          title: String(body.title || 'Відгук клієнта').trim(),
          date: String(body.date || new Date().toISOString().slice(0, 10)),
          rating: Math.max(1, Math.min(5, Number(body.rating) || 5)),
          text: String(body.text).trim(),
          images: Array.isArray(body.images) ? body.images.map(String).filter(Boolean) : [],
          published: body.published !== false
        };
        reviews.unshift(review);
        fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
        buildReviewsOnly();
        sendJson(res, 201, { success: true, review });
        return;
      }

      // PUT /api/reviews/:id
      if (reqPath.startsWith('/api/reviews/') && req.method === 'PUT') {
        const reviewId = decodeURIComponent(reqPath.replace('/api/reviews/', ''));
        const body = await readJsonBody(req);
        const reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
        const idx = reviews.findIndex(review => review.id === reviewId);
        if (idx === -1) {
          sendJson(res, 404, { success: false, error: 'Відгук не знайдено' });
          return;
        }
        for (const field of ['name', 'title', 'date', 'text']) {
          if (body[field] !== undefined) reviews[idx][field] = String(body[field]).trim();
        }
        if (body.rating !== undefined) reviews[idx].rating = Math.max(1, Math.min(5, Number(body.rating) || 5));
        if (body.images !== undefined) reviews[idx].images = Array.isArray(body.images) ? body.images.map(String).filter(Boolean) : [];
        if (body.published !== undefined) reviews[idx].published = Boolean(body.published);
        fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
        buildReviewsOnly();
        sendJson(res, 200, { success: true, review: reviews[idx] });
        return;
      }

      // DELETE /api/reviews/:id
      if (reqPath.startsWith('/api/reviews/') && req.method === 'DELETE') {
        const reviewId = decodeURIComponent(reqPath.replace('/api/reviews/', ''));
        const reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
        const filtered = reviews.filter(review => review.id !== reviewId);
        if (filtered.length === reviews.length) {
          sendJson(res, 404, { success: false, error: 'Відгук не знайдено' });
          return;
        }
        fs.writeFileSync(REVIEWS_FILE, JSON.stringify(filtered, null, 2), 'utf8');
        buildReviewsOnly();
        sendJson(res, 200, { success: true, count: filtered.length });
        return;
      }

      // POST /api/upload
      if (reqPath === '/api/upload' && req.method === 'POST') {
        const body = await readJsonBody(req);
        if (!body.data) {
          sendJson(res, 400, { success: false, error: 'Не передано файл зображення' });
          return;
        }

        const base64Data = body.data.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const ext = body.ext || (body.data.startsWith('data:image/png') ? '.png' : '.jpg');
        const safeName = `admin_${Date.now()}${ext}`;
        const targetPath = path.join(PUBLIC_DIR, 'img', 'kamenotes', safeName);

        fs.writeFileSync(targetPath, buffer);
        sendJson(res, 200, {
          success: true,
          url: `img/kamenotes/${safeName}`
        });
        return;
      }

      sendJson(res, 404, { success: false, error: 'Невідомий API маршрут' });
      return;
    } catch (apiErr) {
      console.error('API Error:', apiErr);
      sendJson(res, 500, { success: false, error: apiErr.message });
      return;
    }
  }

  // STATIC FILE ROUTING
  let relativePath = reqPath;
  if (relativePath === '/' || relativePath === '') {
    relativePath = '/index.html';
  } else if (relativePath === '/admin' || relativePath === '/admin/') {
    relativePath = '/admin.html';
  } else if (relativePath === '/reviews' || relativePath === '/reviews/') {
    relativePath = '/vidguky.html';
  }

  let filePath = path.join(PUBLIC_DIR, relativePath);

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (stats && stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Не знайдено</h1>');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('500 Server Error');
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Local server running at http://localhost:${PORT}/`);
  console.log(`Admin panel available at http://localhost:${PORT}/admin`);
});
