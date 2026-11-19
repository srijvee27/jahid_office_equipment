import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Machine from './models/Machine.js';
import Part from './models/Part.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log('No MONGODB_URI found in .env. Seed skipped (using data/*.json directly).');
    process.exit(0);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Atlas for seeding.');

    const machinesData = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../data/machines.json'), 'utf-8')
    );
    const partsData = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../data/parts.json'), 'utf-8')
    );

    await Machine.deleteMany({});
    await Machine.insertMany(machinesData);
    console.log(`✅ Seeded ${machinesData.length} machines successfully.`);

    await Part.deleteMany({});
    await Part.insertMany(partsData);
    console.log(`✅ Seeded ${partsData.length} parts successfully.`);

    await mongoose.disconnect();
    console.log('Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
