import React from 'react';
import { History, Award, Wrench, ShieldCheck, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      title: 'Established in 1990',
      description: 'Over three decades of unbroken service excellence in office automation and document workflow solutions.',
      icon: History
    },
    {
      title: 'Authorized Toshiba Partner',
      description: 'Direct distribution of genuine Toshiba e-STUDIO multifunction printers, original toners, and OEM components.',
      icon: Award
    },
    {
      title: 'Nationwide Service Fleet',
      description: 'Factory-trained technicians providing prompt on-site diagnostics, preventive maintenance, and emergency repair.',
      icon: Wrench
    },
    {
      title: 'Guaranteed OEM Spares',
      description: 'Every drum, fuser, developer, and roller kit is 100% original, backed by standard warranty and BDT pricing.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about" className="py-20 bg-white text-[#0f172a] relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Card with Company Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#F8FAFC] p-8 border border-slate-200 shadow-md">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0f172a]">JAHID OFFICE EQUIPMENT</h3>
                  <p className="text-xs font-mono text-[#0066cc] mt-0.5 uppercase tracking-wider font-bold">
                    Registration & Trust Since 1990
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066cc] font-extrabold text-sm font-mono shadow-sm">
                  34Y+
                </div>
              </div>

              <div className="py-6 space-y-4">
                <p className="text-sm text-[#475569] leading-relaxed">
                  Founded in 1990, <strong className="text-[#0f172a] font-semibold">Jahid Office Equipment (JOE)</strong> has grown to become Bangladesh's foremost supplier of advanced digital photocopiers, printing presses, and office machinery.
                </p>
                <p className="text-sm text-[#475569] leading-relaxed">
                  We supply critical infrastructure to central banks, premier corporate headquarters, armed forces, national universities, and multinational organizations who depend on flawless document duplication.
                </p>
              </div>

              {/* Verified Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-slate-200">
                {[
                  '100% Original Japanese Technology & Spares',
                  'Dedicated Technical Support Engineers across Divisions',
                  'Rapid Hotline Response (01713-093300, 01922-117201)',
                  'Custom Annual Maintenance Contracts (AMC)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0f172a] font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold block mb-2">
                About Our Organization
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                Empowering Bangladesh's Document Ecosystem For Over 34 Years
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
                At JOE, we believe that an office copier is not merely a piece of hardware — it is the lifeline of institutional records, examinations, financial vouchers, and corporate agreements. Our mission is to keep your workflows running continuously with zero downtime.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0066cc] transition duration-200 group shadow-sm hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066cc] mb-3 group-hover:scale-110 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#0f172a] mb-1.5">{h.title}</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">{h.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
