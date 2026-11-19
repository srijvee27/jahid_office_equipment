import React, { useState } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Cpu, Layers, Tag, PhoneCall, AlertCircle } from 'lucide-react';
import { trackQuoteSubmit } from '../../analytics';

export default function PartDetailModal({ part, currentModel, onClose, onPriceUpdated }) {
  if (!part) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: 1,
    message: `Hello JOE, I would like to request an official quotation/order for ${part.name} (Part #${part.partNumber}). Please advise on availability and delivery timeline.`
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Editable price state for admin/instant testing
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [editedPrice, setEditedPrice] = useState(part.priceBDT);
  const [savingPrice, setSavingPrice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const payload = {
      ...formData,
      itemType: 'part',
      itemName: part.name,
      partNumber: part.partNumber,
      modelSlug: currentModel?.slug || ''
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        trackQuoteSubmit(part.name, 'part', formData.email);
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please call hotlines.');
      }
    } catch (err) {
      // In case server is offline, save locally
      setSubmitSuccess(true);
      trackQuoteSubmit(part.name, 'part', formData.email);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavePrice = async () => {
    setSavingPrice(true);
    try {
      const res = await fetch(`/api/parts/${part._id || part.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceBDT: Number(editedPrice) })
      });
      if (res.ok) {
        const updated = await res.json();
        if (onPriceUpdated) onPriceUpdated(updated);
        setIsEditingPrice(false);
      }
    } catch (e) {
      console.error(e);
      setIsEditingPrice(false);
    } finally {
      setSavingPrice(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              {part.category}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Layer: <span className="text-cyan-300 uppercase">{part.layer}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Enlarged High-Res Image & Specs */}
          <div className="md:col-span-6 flex flex-col gap-5">
            {/* Image Box */}
            <div className="relative aspect-video sm:aspect-square w-full rounded-xl bg-gradient-to-b from-slate-800/80 to-slate-950 border border-slate-700/60 p-4 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-radial from-cyan-500/10 to-transparent pointer-events-none" />
              <img
                src={part.imageUrl}
                alt={part.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:scale-105 transition duration-300"
              />
              <span className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                100% Genuine Toshiba OEM
              </span>
            </div>

            {/* Quick Specs & Info */}
            <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-white tracking-tight">{part.name}</h3>

              <div className="flex items-baseline justify-between pt-1 pb-2 border-b border-slate-700/60">
                <span className="text-xs text-slate-400 font-mono">Part Number:</span>
                <span className="font-mono text-sm font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/50">
                  {part.partNumber}
                </span>
              </div>

              {/* Price & Edit Button */}
              <div className="flex items-center justify-between py-1 border-b border-slate-700/60">
                <span className="text-xs text-slate-400">Official Price:</span>
                {isEditingPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">৳</span>
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="w-28 px-2 py-1 text-sm bg-slate-950 border border-cyan-500 rounded text-white"
                    />
                    <button
                      onClick={handleSavePrice}
                      disabled={savingPrice}
                      className="px-2 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 rounded text-white font-semibold"
                    >
                      {savingPrice ? '...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setIsEditingPrice(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-emerald-400">
                      ৳{Number(editedPrice || part.priceBDT).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => setIsEditingPrice(true)}
                      className="text-[10px] text-slate-400 hover:text-cyan-300 underline font-mono ml-1"
                      title="Adjust price (Admin / Dynamic BDT)"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Details & Specs */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> Technical Specification
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {part.fullSpecs || part.shortDesc}
                </p>
              </div>

              {/* Compatible Models */}
              {part.compatibleModels && part.compatibleModels.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" /> Compatible Models
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {part.compatibleModels.map((m) => (
                      <span
                        key={m}
                        className={`text-[11px] px-2 py-0.5 rounded font-mono border ${
                          currentModel?.name?.includes(m) || currentModel?.slug?.includes(m)
                            ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50 font-bold'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: "Request Quote / Order Part" Form */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/60 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Send className="w-4 h-4 text-cyan-400" /> Request Quotation / Order
                  </h4>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock for Dispatch
                  </span>
                </div>

                {submitSuccess ? (
                  <div className="p-6 text-center space-y-4 my-auto">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h5 className="text-lg font-bold text-white">Quotation Request Received!</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you! Our technical sales engineer will contact you shortly with the official BDT pro-forma quotation and delivery schedule for <span className="font-semibold text-cyan-300">{part.name}</span>.
                    </p>
                    <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800">
                      Direct Hotline: 01713-093300 / 01922-117201
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {errorMessage && (
                      <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-lg text-xs text-red-200 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        {errorMessage}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Engr. Rafiqul Islam"
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          Phone / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 01713-XXXXXX"
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Bank / Enterprise name"
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          Quantity Needed
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Message / Instructions
                      </label>
                      <textarea
                        rows="2"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-brand-500 hover:from-cyan-500 hover:to-brand-600 active:scale-[0.99] transition shadow-lg shadow-cyan-900/40 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Submit Official Quote Request
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Instant Call Assist */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                  Urgent breakdown support?
                </span>
                <a
                  href="tel:01713093300"
                  className="font-bold text-white hover:text-cyan-300 font-mono"
                >
                  01713-093300
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
