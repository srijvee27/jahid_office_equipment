import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import machinesRouter from './routes/machines.js';
import partsRouter from './routes/parts.js';
import inquiriesRouter from './routes/inquiries.js';
import sitemapRouter from './routes/sitemap.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection with non-blocking fallback
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 4000 })
    .then(() => {
      console.log('✅ Connected to MongoDB Atlas successfully.');
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB connection failed. Running in resilient local JSON mode:', err.message);
    });
} else {
  console.log('ℹ️ No MONGODB_URI provided. Running in resilient local JSON seed mode.');
}

// Routes
app.use('/api/machines', machinesRouter);
app.use('/api/parts', partsRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/', sitemapRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    company: 'Jahid Office Equipment (JOE)',
    mongoConnected: mongoose.connection.readyState === 1,
    time: new Date().toISOString()
  });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 JOE Backend Server running at http://localhost:${PORT}`);
  });
}

export default app;
