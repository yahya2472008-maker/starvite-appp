// Back end Starvite v2: tanpa dependensi. Butuh Node.js 22.13 atau lebih baru.
// Menyimpan undangan di SQLite dan melayani halaman tamu lewat tautan pendek /u/<kode>.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { pipeline } = require('node:stream/promises');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'ajak.db');
const PUBLIC = path.join(__dirname, 'public');
const MAX_BODY = 8 * 1024 * 1024; // cukup untuk 8 foto yang sudah dikecilkan dan satu lagu

const db = new DatabaseSync(DB_FILE);
db.exec(`CREATE TABLE IF NOT EXISTS undangan (
  kode TEXT PRIMARY KEY,
  kunci TEXT NOT NULL,
  data TEXT NOT NULL,
  tamu TEXT NOT NULL,
  dibuat TEXT NOT NULL,
  diubah TEXT NOT NULL
)`);

const q = {
  ambil: db.prepare('SELECT * FROM undangan WHERE kode = ?'),
  baru: db.prepare('INSERT INTO undangan (kode, kunci, data, tamu, dibuat, diubah) VALUES (?, ?, ?, ?, ?, ?)'),
  ubah: db.prepare('UPDATE undangan SET data = ?, tamu = ?, diubah = ? WHERE kode = ?'),
};

const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';
function kodeBaru() {
  for (;;) {
    let k = '';
    const b = crypto.randomBytes(8);
    for (let i = 0; i < 8; i++) k += ALPHABET[b[i] % ALPHABET.length];
    if (!q.ambil.get(k)) return k;
  }
}

// Hanya kolom undangan yang dikenal yang disimpan, dengan tipe string dan batas panjang.
const FIELDS = ['type', 'title', 'host', 'opening', 'closing', 'date', 'start', 'end', 'tz', 'venue', 'address', 'maps', 'dress', 'note', 'contactName', 'contactPhone', 'style', 'g1b', 'g1n', 'g1a', 'g2b', 'g2n', 'g2a', 'rundown'];
function bersihkan(body) {
  if (!body || typeof body !== 'object' || !body.data || typeof body.data !== 'object') return null;
  const d = {};
  for (const k of FIELDS) if (typeof body.data[k] === 'string') d[k] = body.data[k].slice(0, 2000);
  if (typeof body.data.countdown === 'boolean') d.countdown = body.data.countdown;
  // Galeri foto: maksimal 8, hanya data URL gambar jpeg/png/webp, maksimal 400 KB per foto.
  d.music = typeof body.data.music === 'string' && body.data.music.length <= 2300000 && /^data:audio\/(mpeg|mp3|ogg|wav|webm|mp4|aac|x-m4a);base64,[A-Za-z0-9+/=]+$/.test(body.data.music) ? body.data.music : '';
  d.musicName = typeof body.data.musicName === 'string' ? body.data.musicName.slice(0, 80) : '';
  d.musicUrl = typeof body.data.musicUrl === 'string' && /^https?:\/\/\S{3,490}$/i.test(body.data.musicUrl) ? body.data.musicUrl : '';
  d.musicFile = typeof body.data.musicFile === 'string' && /^\/musik\/[a-z0-9]{8}(\?v=\d{1,15})?$/.test(body.data.musicFile) ? body.data.musicFile : '';
  d.photos = Array.isArray(body.data.photos)
    ? body.data.photos.filter((p) => typeof p === 'string' && p.length <= 400000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(p)).slice(0, 8)
    : [];
  const g = Array.isArray(body.guests) ? body.guests.filter((x) => typeof x === 'string').map((x) => x.trim().slice(0, 80)).filter(Boolean).slice(0, 500) : [];
  return { d, g };
}

// Pembatas sederhana: maksimal 20 pembuatan undangan per menit per alamat IP.
const percobaan = new Map();
// Di balik proxy atau CDN (Nginx, Cloudflare, dsb.) jalankan dengan TRUST_PROXY=1 agar IP tamu dibaca dari X-Forwarded-For.
function ipKlien(req) {
  if (process.env.TRUST_PROXY === '1') {
    const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    if (xf) return xf;
  }
  return req.socket.remoteAddress || '';
}
function terlaluBanyak(ip) {
  const now = Date.now();
  const arr = (percobaan.get(ip) || []).filter((t) => now - t < 60000);
  arr.push(now);
  percobaan.set(ip, arr);
  if (percobaan.size > 5000) percobaan.clear();
  return arr.length > 20;
}
function kunciCocok(row, kunci) {
  const a = Buffer.from(String(kunci || ''));
  const b = Buffer.from(row.kunci);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}


// ---- Musik latar: file lagu disimpan di folder musik/ (tanpa batas ukuran dari aplikasi) ----
const MUSIK_DIR = process.env.MUSIK_DIR || path.join(__dirname, 'musik');
const MIME_AUDIO = /^audio\/(mpeg|mp3|ogg|wav|x-wav|wave|webm|mp4|aac|x-m4a|m4a|flac)$/i;
const berkasMusik = (kode) => path.join(MUSIK_DIR, kode + '.bin');
const metaMusik = (kode) => path.join(MUSIK_DIR, kode + '.json');
async function simpanMusik(kode, req) {
  const mime = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (!MIME_AUDIO.test(mime)) { req.resume(); return { error: 'Jenis file bukan audio yang didukung', status: 415 }; }
  fs.mkdirSync(MUSIK_DIR, { recursive: true });
  const tmp = berkasMusik(kode) + '.' + Date.now() + '.tmp';
  try {
    await pipeline(req, fs.createWriteStream(tmp));
    const ukuran = fs.statSync(tmp).size;
    if (ukuran === 0) { fs.rmSync(tmp, { force: true }); return { error: 'File kosong', status: 400 }; }
    fs.renameSync(tmp, berkasMusik(kode));
    let nama = '';
    try { nama = decodeURIComponent(String(req.headers['x-nama'] || '')).slice(0, 80); } catch (e) {}
    fs.writeFileSync(metaMusik(kode), JSON.stringify({ mime, nama, ukuran }));
    return { ok: true, ukuran };
  } catch (e) {
    fs.rmSync(tmp, { force: true });
    return { error: 'Gagal menyimpan file', status: 500 };
  }
}
function hapusMusik(kode) { fs.rmSync(berkasMusik(kode), { force: true }); fs.rmSync(metaMusik(kode), { force: true }); }
function sajikanMusik(req, res, kode) {
  let meta, size;
  try { meta = JSON.parse(fs.readFileSync(metaMusik(kode), 'utf8')); size = fs.statSync(berkasMusik(kode)).size; }
  catch (e) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Tidak ditemukan'); return; }
  const h = { 'Content-Type': meta.mime, 'Accept-Ranges': 'bytes', 'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff' };
  let start = 0, end = size - 1, status = 200;
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  if (m && (m[1] || m[2])) {
    if (m[1] === '') start = Math.max(0, size - Number(m[2]));
    else { start = Number(m[1]); if (m[2]) end = Math.min(Number(m[2]), size - 1); }
    if (start > end || start >= size) { res.writeHead(416, { 'Content-Range': 'bytes */' + size }); res.end(); return; }
    status = 206; h['Content-Range'] = 'bytes ' + start + '-' + end + '/' + size;
  }
  h['Content-Length'] = String(end - start + 1);
  res.writeHead(status, h);
  if (req.method === 'HEAD') { res.end(); return; }
  fs.createReadStream(berkasMusik(kode), { start, end }).pipe(res);
}

function kirimJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}

function bacaBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(new Error('terlalu besar')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

function sajikanStatis(res, urlPath) {
  const rel = urlPath === '/' ? '/index.html' : urlPath;
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC + path.sep)) { res.writeHead(403); res.end('Dilarang'); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Tidak ditemukan'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}

// Halaman tamu = index.html dengan data undangan tertanam; aplikasi otomatis masuk mode tamu.
function sajikanTamu(res, kode) {
  const row = q.ambil.get(kode);
  if (!row) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Undangan tidak ditemukan'); return; }
  let html = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');
  const json = JSON.stringify({ d: JSON.parse(row.data), g: JSON.parse(row.tamu) }).replace(/</g, '\\u003c');
  html = html.replace('<head>', '<head><base href="/">'); // supaya style.css dan app.js dimuat dari akar
  html = html.replace(/(<script id="inv-data" type="application\/json">)[\s\S]*?(<\/script>)/, (m, a, b) => a + json + b);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' });
  res.end(html);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  try {
    if (req.method === 'GET' && p === '/api/health') return kirimJson(res, 200, { ok: true });

    if (req.method === 'POST' && p === '/api/undangan') {
      if (terlaluBanyak(ipKlien(req))) return kirimJson(res, 429, { error: 'Terlalu banyak percobaan, coba lagi sebentar' });
      const bersih = bersihkan(await bacaBody(req));
      if (!bersih) return kirimJson(res, 400, { error: 'Data undangan tidak valid' });
      const kode = kodeBaru();
      const kunci = crypto.randomBytes(16).toString('hex');
      const now = new Date().toISOString();
      q.baru.run(kode, kunci, JSON.stringify(bersih.d), JSON.stringify(bersih.g), now, now);
      return kirimJson(res, 201, { kode, kunci });
    }

    const mu = /^\/api\/undangan\/([a-z0-9]{8})\/musik$/.exec(p);
    if (mu && (req.method === 'PUT' || req.method === 'DELETE')) {
      const row = q.ambil.get(mu[1]);
      if (!row) return kirimJson(res, 404, { error: 'Undangan tidak ditemukan' });
      if (!kunciCocok(row, req.headers['x-kunci'])) return kirimJson(res, 403, { error: 'Kunci salah' });
      if (req.method === 'DELETE') { hapusMusik(mu[1]); return kirimJson(res, 200, { ok: true }); }
      const r = await simpanMusik(mu[1], req);
      return r.error ? kirimJson(res, r.status, { error: r.error }) : kirimJson(res, 200, { ok: true, ukuran: r.ukuran });
    }
    const mg = /^\/musik\/([a-z0-9]{8})$/.exec(p);
    if (mg && (req.method === 'GET' || req.method === 'HEAD')) return sajikanMusik(req, res, mg[1]);

    let m = /^\/api\/undangan\/([a-z0-9]{8})$/.exec(p);
    if (m && req.method === 'PUT') {
      const row = q.ambil.get(m[1]);
      if (!row) return kirimJson(res, 404, { error: 'Undangan tidak ditemukan' });
      const body = await bacaBody(req);
      if (!kunciCocok(row, body.kunci)) return kirimJson(res, 403, { error: 'Kunci salah' });
      const bersih = bersihkan(body);
      if (!bersih) return kirimJson(res, 400, { error: 'Data undangan tidak valid' });
      q.ubah.run(JSON.stringify(bersih.d), JSON.stringify(bersih.g), new Date().toISOString(), m[1]);
      return kirimJson(res, 200, { kode: m[1] });
    }
    if (m && req.method === 'GET') {
      const row = q.ambil.get(m[1]);
      if (!row) return kirimJson(res, 404, { error: 'Undangan tidak ditemukan' });
      return kirimJson(res, 200, { d: JSON.parse(row.data), g: JSON.parse(row.tamu) }); // kunci tidak pernah dikirim
    }

    m = /^\/u\/([a-z0-9]{8})\/?$/.exec(p);
    if (req.method === 'GET' && m) return sajikanTamu(res, m[1]);

    if (req.method === 'GET') return sajikanStatis(res, p);
    res.writeHead(405); res.end();
  } catch (e) {
    kirimJson(res, 400, { error: 'Permintaan tidak valid' });
  }
});

server.requestTimeout = 0; // unggahan lagu besar tidak boleh terpotong waktu
server.listen(PORT, () => console.log('Starvite berjalan di http://localhost:' + PORT));