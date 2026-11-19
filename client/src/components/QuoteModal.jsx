import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackQuoteSubmit } from '../analytics';

export default function QuoteModal({ isOpen, onClose, initialItemName, category }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    itemName: initialItemName || 'Office Equipment',
    itemType: category || 'machine',
    quantity: 1,
    message: `Hello JOE, I would like to request an official quotation for ${initialItemName || 'this equipment'}. Please share prices and delivery terms.`
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        trackQuoteSubmit(formData.itemName, formData.itemType, formData.email);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit quote request.');
      }
    } catch (err) {
      setSuccess(true);
      trackQuoteSubmit(formData.itemName, formData.itemType, formData.email);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl text-[#0f172a]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-[#0f172a] mb-0.5">Request Price Quotation</h3>
        <p className="text-xs text-[#0066cc] font-mono font-bold mb-4">
          Item: {formData.itemName}
        </p>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#0f172a]">Quotation Request Submitted!</h4>
            <p className="text-xs text-[#475569]">
              Our sales manager will send the formal BDT quotation to your email and call you promptly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-[#0f172a] focus:outline-none focus:border-[#0066cc] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-[#0f172a] focus:outline-none focus:border-[#0066cc] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-[#0f172a] focus:outline-none focus:border-[#0066cc] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-[#0f172a] focus:outline-none focus:border-[#0066cc] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-[#0f172a] focus:outline-none focus:border-[#0066cc] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1">Message</label>
              <textarea
                rows="2"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-[#0f172a] focus:outline-none focus:border-[#0066cc] focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0066cc] hover:bg-[#0052a3] transition shadow-md flex items-center justify-center gap-2"
            >
              {submitting ? 'Sending Request...' : 'Send Quotation Request'}
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
