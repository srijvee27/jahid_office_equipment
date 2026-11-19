import React, { useState } from 'react';
import { Printer, FileText, BookOpen, Scissors, Layers, Shield, ArrowRight, Check } from 'lucide-react';

export default function ProductsCatalogSection({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('all');

  const products = [
    {
      id: 'photocopy',
      category: 'Photocopy',
      title: 'Digital Multifunction Photocopiers',
      brand: 'TOSHIBA e-STUDIO Series',
      speed: '25 to 65 PPM',
      description: 'Full range of Toshiba black & white and full-colour A3/A4 MFPs equipped with e-BRIDGE Next controller, dual-scan document feeder, and cloud print integration.',
      features: ['Dual-Scan Duplex 240 ipm', '10.1" Tablet Touch Panel', 'Self-Encrypting Secure SSD', 'Heavy Duty Steel Chassis'],
      icon: Printer,
      image: '/images/machine-full-configured.png',
      popular: true
    },
    {
      id: 'fax',
      category: 'Digital Fax',
      title: 'Digital High-Speed Super G3 Fax Systems',
      brand: 'Brother / Toshiba e-STUDIO Fax Module',
      speed: '33.6 Kbps (JBIG)',
      description: 'Dedicated enterprise fax machines and network fax server units for government departments, defense, and legal document exchange with transmission verification.',
      features: ['Dual-Line Super G3', 'Paperless PC Faxing', 'Encrypted PDF Transmission', 'Quick Dial Memory'],
      icon: FileText,
      image: '/images/part-fax-board.png'
    },
    {
      id: 'steel-binding',
      category: 'Steel Binding Machine',
      title: 'Heavy Duty Thermal & Steel Binding Machines',
      brand: 'Unibind Belgium',
      speed: 'Up to 340 Sheets / cycle',
      description: 'Premium resin steel crystal binding systems engineered in Belgium for executive audit reports, legal tenders, project proposals, and bank portfolios.',
      features: ['Steel Spine Reinforcement', 'No Hole Punching Required', 'Lies Completely Flat', '100% Secure Spine Hold'],
      icon: BookOpen,
      image: '/images/part-paper-pedestal.png'
    },
    {
      id: 'paper-shredder',
      category: 'Paper Shredder',
      title: 'High-Security Cross-Cut Paper Shredders',
      brand: 'Bio system / Quality German Standard',
      speed: 'DIN Level P-4 / P-5',
      description: 'Heavy duty commercial paper, credit card, and CD shredders designed for continuous duty in banking branches, accounts departments, and embassies.',
      features: ['Cross-Cut Micro Shredding', 'Continuous Duty Motor', 'Silent Operation <58 dB', 'Auto Anti-Jam Reverse'],
      icon: Scissors,
      image: '/images/part-pickup-roller.png'
    },
    {
      id: 'spiral-machine',
      category: 'Spiral Machine',
      title: 'Heavy-Duty Comb & Wire Spiral Binding Machines',
      brand: 'Quality / JOE Heavy Series',
      speed: 'Up to 500 Sheets',
      description: 'Manual and electric comb and wire spiral machines for universities, training institutes, documentation centers, and commercial print shops.',
      features: ['Hardened Steel Punch Pins', 'Adjustable Margin Depth', 'Electric Wire Closer', 'All-Metal Heavy Base'],
      icon: Layers,
      image: '/images/part-finisher-unit.png'
    },
    {
      id: 'laminating',
      category: 'Laminating Machine',
      title: 'Professional Hot & Cold Roll Laminating Machines',
      brand: 'Bio system / JOE Thermal Series',
      speed: 'A4, A3 & Wide Format',
      description: 'Multi-roller heating systems for bubble-free encapsulation of identity cards, certificates, official orders, blueprints, and promotional posters.',
      features: ['4 to 6 Silicon Rollers', 'Digital Temperature Display', 'Fast 1-Min Warm-up', 'Reverse Function for Jam-Free'],
      icon: Shield,
      image: '/images/part-fuser-unit.png'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Products' },
    { key: 'Photocopy', label: 'Photocopy' },
    { key: 'Digital Fax', label: 'Digital Fax' },
    { key: 'Steel Binding Machine', label: 'Steel Binding' },
    { key: 'Paper Shredder', label: 'Paper Shredder' },
    { key: 'Spiral Machine', label: 'Spiral Machine' },
    { key: 'Laminating Machine', label: 'Laminating' }
  ];

  const filtered = activeTab === 'all' ? products : products.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-20 bg-white text-[#0f172a] relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold block mb-2">
            Comprehensive Equipment Lineup
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Complete Office Automation &amp; Finishing Solutions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            From premier Japanese Toshiba photocopiers to Belgian steel binding and German-standard security shredders, JOE equips modern organizations for supreme productivity.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActiveTab(c.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                  activeTab === c.key
                    ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#0066cc] hover:text-[#0066cc]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (Clean White) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prod) => {
            return (
              <div
                key={prod.id}
                className="rounded-2xl bg-white border border-slate-200 hover:border-[#0066cc] transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Category and Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066cc] font-bold">
                      {prod.category}
                    </span>
                    {prod.popular && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-600 text-white shadow-sm">
                        Flagship
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-44 w-full rounded-xl bg-slate-50 border border-slate-100 p-4 mb-5 flex items-center justify-center overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.1)] group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#0066cc] transition">
                    {prod.title}
                  </h3>
                  <p className="text-xs font-mono text-[#0066cc] mt-0.5 mb-2 font-bold">
                    Brand: {prod.brand} • {prod.speed}
                  </p>
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-4">
                    {prod.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    {prod.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-[#0f172a] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-[#475569] font-mono font-medium">
                    Warranty &amp; AMC Included
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (prod.id === 'photocopy') {
                        const el = document.getElementById('showcase');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else if (onOpenQuote) {
                        onOpenQuote(prod.title, prod.category);
                      } else {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0066cc] hover:bg-[#0052a3] text-white transition flex items-center gap-1.5 shadow-sm"
                  >
                    {prod.id === 'photocopy' ? 'View 3D Model' : 'Inquire Price'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
