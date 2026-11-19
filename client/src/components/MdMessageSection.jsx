import React from 'react';
import { Quote, Award, CheckCircle2, PhoneCall } from 'lucide-react';

export default function MdMessageSection() {
  return (
    <section id="md-message" className="py-20 bg-[#F8FAFC] text-[#0f172a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
          <Quote className="absolute top-8 right-8 w-20 h-20 text-slate-100 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* MD Profile Card */}
            <div className="md:col-span-4 text-center md:text-left">
              <div className="relative inline-block mb-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-[#0066cc] to-sky-400 p-1 shadow-lg mx-auto">
                  <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-heading font-extrabold text-3xl text-[#0066cc] tracking-tight">
                      MD
                    </span>
                    <span className="text-[10px] uppercase font-mono text-slate-600 font-bold mt-1">
                      Managing Director
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  JOE Leadership
                </div>
              </div>

              <h4 className="text-xl font-bold text-[#0f172a] tracking-tight">
                Managing Director
              </h4>
              <p className="text-xs text-[#0066cc] font-mono mt-0.5 font-bold">
                Jahid Office Equipment (JOE)
              </p>
              <p className="text-[11px] text-[#475569] mt-1">
                Serving the Nation Since 1990
              </p>
            </div>

            {/* Message Body */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold flex items-center gap-2">
                <Award className="w-4 h-4" /> Message From The Managing Director
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] leading-snug">
                "Trust is Earned Through Precision, Genuine Parts, and Unwavering Commitment."
              </h3>

              <div className="space-y-3 text-sm text-[#475569] leading-relaxed font-normal">
                <p>
                  "When we laid the foundation of <strong className="text-[#0f172a] font-semibold">Jahid Office Equipment</strong> back in 1990, our foremost principle was never to compromise on product authenticity. In the office automation domain, an inferior consumable or counterfeit drum unit can halt an entire institution's daily business."
                </p>
                <p>
                  "Over the past 34 years, we have nurtured relationships with Toshiba, Brother, and global leaders to ensure that every machine we deliver—from entry-level 25 PPM copiers to heavy-duty 65 PPM enterprise workhorses—carries genuine Japanese engineering and factory-certified support."
                </p>
                <p>
                  "With our new interactive 3D platform, clients can now look beneath the surface, inspect every internal spare part with complete pricing transparency in BDT, and order with complete confidence. We thank our thousands of corporate and government partners for their continued trust."
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct hotline for MD Office inquiries:</span>
                </div>
                <a
                  href="tel:01713093300"
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-xs font-mono font-extrabold text-[#0066cc] border border-blue-200 flex items-center gap-2 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                  01713-093300
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
