import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';

export default function PartnersSection() {
  const partners = [
    {
      name: 'TOSHIBA',
      origin: 'Japan',
      role: 'Authorized Multifunction Photocopier Partner',
      tagline: 'Leading Innovation in e-BRIDGE Next Document Solutions',
      logoText: 'TOSHIBA',
      badge: 'Principal OEM Partner',
      bgClass: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      name: 'Brother',
      origin: 'Japan',
      role: 'Digital Printing & Super G3 Fax Solutions',
      tagline: 'At Your Side – Precision Laser Printers & Document Scanners',
      logoText: 'brother',
      badge: 'Authorized Distributor',
      bgClass: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      name: 'Unibind Belgium',
      origin: 'Belgium',
      role: 'Premium Steel Binding & Hardcover Finishing',
      tagline: 'World Leader in Resin Steel Binding Systems',
      logoText: 'Unibind',
      badge: 'Exclusive Importer',
      bgClass: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      name: 'Bio system',
      origin: 'Taiwan / Singapore',
      role: 'Heavy Duty Paper Shredders & Time Recorders',
      tagline: 'High Security Shredding & Biometric Office Systems',
      logoText: 'bio system',
      badge: 'Official Distributor',
      bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      name: 'Quality',
      origin: 'Germany / International',
      role: 'Heavy Duty Spiral & Thermal Laminating Equipment',
      tagline: 'Engineered Precision for Commercial Print Centers',
      logoText: 'Quality',
      badge: 'Certified Partner',
      bgClass: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ];

  return (
    <section id="partners" className="py-20 bg-white text-[#0f172a] relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold block mb-2">
            Global Engineering Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Our Global Business Partners
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            Jahid Office Equipment bridges world-class manufacturers from Japan, Belgium, and Europe with organizations across Bangladesh, ensuring 100% genuine equipment and factory warranty.
          </p>
        </div>

        {/* Partners Grid (Clean White) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="rounded-2xl bg-white border border-slate-200 hover:border-[#0066cc] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl group"
            >
              <div>
                {/* Logo Banner Placeholder */}
                <div className={`h-20 w-full rounded-xl border flex items-center justify-center p-3 mb-4 shadow-sm group-hover:scale-105 transition duration-300 ${partner.bgClass}`}>
                  <span className="font-heading font-black text-2xl tracking-wider">
                    {partner.logoText}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#0066cc] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1 font-bold">
                    <Globe className="w-2.5 h-2.5" />
                    {partner.origin}
                  </span>
                  <span className="text-[10px] font-semibold text-[#475569]">
                    {partner.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0f172a] group-hover:text-[#0066cc] transition">
                  {partner.name}
                </h3>
                <p className="text-xs font-semibold text-slate-700 mt-1 mb-2">
                  {partner.role}
                </p>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  {partner.tagline}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Distribution</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
