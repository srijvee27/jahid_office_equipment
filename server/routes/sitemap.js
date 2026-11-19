import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://www.jahidoffice.com';
  const lastMod = new Date().toISOString().split('T')[0];

  let machines = [];
  let parts = [];

  try {
    const machinesFile = path.resolve(__dirname, '../../data/machines.json');
    if (fs.existsSync(machinesFile)) {
      machines = JSON.parse(fs.readFileSync(machinesFile, 'utf-8'));
    }
    const partsFile = path.resolve(__dirname, '../../data/parts.json');
    if (fs.existsSync(partsFile)) {
      parts = JSON.parse(fs.readFileSync(partsFile, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading sitemap data files:', e);
  }

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/#showcase`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/#about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/#md-message`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/#products`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/#clients`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/#partners`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/#services`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/#gallery`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${baseUrl}/#contact`, priority: '0.8', changefreq: 'monthly' }
  ];

  const machineUrls = machines.map((m) => ({
    loc: `${baseUrl}/#model-${m.slug}`,
    priority: '0.85',
    changefreq: 'weekly'
  }));

  const partUrls = parts.map((p) => ({
    loc: `${baseUrl}/#part-${p.slug}`,
    priority: '0.75',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticUrls, ...machineUrls, ...partUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  return res.send(xml);
});

export default router;
