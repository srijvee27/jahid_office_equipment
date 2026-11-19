import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Part from '../models/Part.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

function getLocalParts() {
  const filePath = path.resolve(__dirname, '../../data/parts.json');
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }
  return [];
}

// In-memory cache for updates when Mongo is not connected
let memoryPartsCache = null;

// GET /api/parts
router.get('/', async (req, res) => {
  const { model, layer } = req.query;
  try {
    let parts = [];
    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (layer) query.layer = layer;
      if (model) query.compatibleModels = model;
      parts = await Part.find(query).sort({ layer: 1, priceBDT: -1 });
    }
    if (!parts || parts.length === 0) {
      if (!memoryPartsCache) {
        memoryPartsCache = getLocalParts();
      }
      parts = memoryPartsCache;
      if (layer) {
        parts = parts.filter((p) => p.layer === layer);
      }
      if (model) {
        parts = parts.filter((p) => p.compatibleModels && p.compatibleModels.includes(model));
      }
    }
    return res.json(parts);
  } catch (err) {
    console.error('Error fetching parts:', err);
    return res.status(500).json({ error: 'Failed to fetch parts', fallback: getLocalParts() });
  }
});

// GET /api/parts/:slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const part = await Part.findOne({ slug });
      if (part) return res.json(part);
    }
    const source = memoryPartsCache || getLocalParts();
    const fallback = source.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    if (fallback) return res.json(fallback);
    return res.status(404).json({ error: 'Part not found' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch part' });
  }
});

// PUT /api/parts/:id (Edit price or specs)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await Part.findByIdAndUpdate(id, updates, { new: true });
      if (updated) return res.json(updated);
    }
    // Update in-memory fallback
    if (!memoryPartsCache) {
      memoryPartsCache = getLocalParts();
    }
    const idx = memoryPartsCache.findIndex(
      (p) => (p._id && p._id.toString() === id) || p.slug === id || p.partNumber === id
    );
    if (idx !== -1) {
      memoryPartsCache[idx] = { ...memoryPartsCache[idx], ...updates };
      return res.json(memoryPartsCache[idx]);
    }
    return res.status(404).json({ error: 'Part not found for update' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update part', details: err.message });
  }
});

export default router;
