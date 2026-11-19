import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    series: { type: String, required: true },
    speedA4: { type: String, required: true },
    speedA3: { type: String, required: true },
    warmUp: { type: String, required: true },
    firstCopy: { type: String, required: true },
    ram: { type: String, required: true },
    ssd: { type: String, required: true },
    weight: { type: String, required: true },
    dimensions: { type: String, required: true },
    paperCapacity: { type: String, required: true },
    controlPanel: { type: String, required: true },
    basePriceBDT: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    shortDesc: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Machine || mongoose.model('Machine', machineSchema);
