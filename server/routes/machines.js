import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Machine from '../models/Machine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

function getLocalMachines() {
  const filePath = path.resolve(__dirname, '../../data/machines.json');
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }
  return [];
}

// GET /api/machines
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const machines = await Machine.find().sort({ basePriceBDT: 1 });
      if (machines && machines.length > 0) {
        return res.json(machines);
      }
    }
    // Fallback to JSON
    const fallback = getLocalMachines();
    return res.json(fallback);
  } catch (err) {
    console.error('Error fetching machines:', err);
    return res.status(500).json({ error: 'Failed to fetch machines', fallback: getLocalMachines() });
  }
});

// GET /api/machines/:slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const machine = await Machine.findOne({ slug });
      if (machine) return res.json(machine);
    }
    const fallback = getLocalMachines().find((m) => m.slug.toLowerCase() === slug.toLowerCase());
    if (fallback) return res.json(fallback);
    return res.status(404).json({ error: 'Machine not found' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch machine' });
  }
});

export default router;
