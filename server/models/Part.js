import mongoose from 'mongoose';

const partSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    partNumber: { type: String, required: true },
    category: { type: String, required: true },
    layer: { type: String, enum: ['external', 'internal'], required: true },
    priceBDT: { type: Number, required: true },
    shortDesc: { type: String, required: true },
    fullSpecs: { type: String, required: true },
    compatibleModels: [{ type: String }],
    imageUrl: { type: String, required: true },
    meshName: { type: String, required: true },
    explodeOffset: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.models.Part || mongoose.model('Part', partSchema);
