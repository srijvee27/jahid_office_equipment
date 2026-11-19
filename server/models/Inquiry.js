import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, default: '' },
    itemType: { type: String, enum: ['machine', 'part', 'general'], default: 'part' },
    itemName: { type: String, required: true },
    partNumber: { type: String, default: '' },
    modelSlug: { type: String, default: '' },
    quantity: { type: Number, default: 1 },
    message: { type: String, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'completed'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
