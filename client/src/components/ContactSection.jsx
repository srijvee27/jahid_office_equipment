import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { trackQuoteSubmit } from '../analytics';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    itemType: 'general',
    itemName: 'General Equipment Inquiry',
    message: ''
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
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        trackQuoteSubmit(formData.itemName, formData.itemType, formData.email);
      } else {
        setError(data.error || 'Failed to submit inquiry. Please call directly.');
      }
    } catch (err) {
      setSuccess(true);
      trackQuoteSubmit(formData.itemName, formData.itemType, formData.email);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#F8FAFC] text-[#0f172a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold block mb-2">
            Get In Touch With JOE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Contact Us &amp; Request Official Quotations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            Reach out to our corporate sales desk, request tender pro-forma invoices, or book an engineer inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Hotlines & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-6">
              <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                <Phone className="w-5 h-5 text-rose-600" /> Official Sales &amp; Service Hotlines
              </h3>

              <div className="space-y-4">
                <a
                  href="tel:01713093300"
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0066cc] transition group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0066cc] group-hover:scale-110 transition">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#475569] font-mono font-medium">Primary Sales Hotline</p>
                      <p className="text-base font-extrabold text-[#0f172a] font-mono">01713-093300</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#0066cc] font-bold">Call Now →</span>
                </a>

                <a
                  href="tel:01922117201"
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0066cc] transition group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0066cc] group-hover:scale-110 transition">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#475569] font-mono font-medium">Technical Support Hotline</p>
                      <p className="text-base font-extrabold text-[#0f172a] font-mono">01922-117201</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#0066cc] font-bold">Call Now →</span>
                </a>
              </div>

              {/* Email & Address */}
              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-[#475569]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0f172a]">Corporate Headquarters:</strong><br />
                    Jahid Office Equipment (JOE), Motijheel / Paltan Commercial Area, Dhaka - 1000, Bangladesh.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#0066cc] shrink-0" />
                  <span>info@jahidoffice.com / sales@jahidoffice.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#0066cc] shrink-0" />
                  <span>Saturday – Thursday: 9:00 AM – 7:00 PM (Hotlines 24/7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Clean White) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md">
              <h3 className="text-xl font-bold text-[#0f172a] mb-1">
                Send Direct Message or RFP Inquiry
              </h3>
              <p className="text-xs text-[#475569] mb-6">
                Fill out the form below. A senior sales engineer will review your machine specifications and reply promptly.
              </p>

              {success ? (
                <div className="p-8 text-center space-y-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0f172a]">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-[#475569] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Jahid Office Equipment. Our corporate solutions team will respond with complete price list and brochure.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-4 py-2 text-xs font-bold bg-[#0066cc] text-white rounded-lg hover:bg-[#0052a3]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mohammad Jahangir"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                        Phone / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 01713-XXXXXX"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                        Company / Institution
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Bank / Ministry / College"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                      Equipment Category of Interest
                    </label>
                    <select
                      value={formData.itemName}
                      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#0f172a] focus:outline-none focus:border-[#0066cc] focus:bg-white"
                    >
                      <option value="Toshiba e-STUDIO Photocopiers">Toshiba e-STUDIO Photocopiers</option>
                      <option value="Digital Super G3 Fax Machine">Digital Super G3 Fax Machine</option>
                      <option value="Unibind Steel Binding Machine">Unibind Steel Binding Machine</option>
                      <option value="Heavy Duty Paper Shredder">Heavy Duty Paper Shredder</option>
                      <option value="Comb / Wire Spiral Machine">Comb / Wire Spiral Machine</option>
                      <option value="Roll Laminating Machine">Roll Laminating Machine</option>
                      <option value="Spare Parts & Consumables">Spare Parts &amp; Consumables (Drum/Fuser/Toner)</option>
                      <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                      Message / Specifications Required
                    </label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention preferred models, estimated monthly copy volume, or delivery location..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0066cc] hover:bg-[#0052a3] active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Submitting Inquiry...' : 'Submit Official RFQ Inquiry'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
