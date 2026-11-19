import express from 'express';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();
const memoryInquiries = [];

// POST /api/inquiries
router.post('/', async (req, res) => {
  const { name, email, phone, company, itemType, itemName, partNumber, modelSlug, quantity, message } = req.body;

  if (!name || !email || !phone || !itemName) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, phone, and itemName are required.'
    });
  }

  const inquiryData = {
    name,
    email,
    phone,
    company: company || '',
    itemType: itemType || 'part',
    itemName,
    partNumber: partNumber || '',
    modelSlug: modelSlug || '',
    quantity: Number(quantity) || 1,
    message: message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    if (mongoose.connection.readyState === 1) {
      const doc = new Inquiry(inquiryData);
      await doc.save();
      return res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', inquiry: doc });
    }
    // Fallback store in memory
    inquiryData._id = 'mem_' + Date.now();
    memoryInquiries.unshift(inquiryData);
    return res.status(201).json({
      success: true,
      message: 'Inquiry recorded successfully (offline/in-memory mode)!',
      inquiry: inquiryData
    });
  } catch (err) {
    console.error('Inquiry submission error:', err);
    return res.status(500).json({ error: 'Failed to submit inquiry', details: err.message });
  }
});

// GET /api/inquiries
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Inquiry.find().sort({ createdAt: -1 });
      return res.json(items);
    }
    return res.json(memoryInquiries);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

export default router;
