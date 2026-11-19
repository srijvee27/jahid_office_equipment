import React, { useState } from 'react';
import { Landmark, Building2, Shield, GraduationCap, CheckCircle } from 'lucide-react';

export default function ClientsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const clientCategories = [
    {
      id: 'banks',
      name: 'Banks & Financial Institutions',
      icon: Landmark,
      count: '35+ Banks',
      description: 'Major state-owned and scheduled commercial private banks relying on high-security document printing.',
      clients: [
        'Sonali Bank PLC',
        'Janata Bank PLC',
        'Agrani Bank PLC',
        'Dutch-Bangla Bank PLC',
        'Eastern Bank PLC',
        'Islami Bank Bangladesh PLC',
        'BRAC Bank PLC',
        'Prime Bank PLC',
        'Mutual Trust Bank PLC',
        'City Bank PLC'
      ]
    },
    {
      id: 'corporate',
      name: 'Corporate & MNCs',
      icon: Building2,
      count: '120+ Enterprises',
      description: 'Top industrial conglomerates, telecom operators, pharmaceuticals, and manufacturing giants.',
      clients: [
        'BEXIMCO Group',
        'Square Pharmaceuticals',
        'Grameenphone Head Office',
        'Akij Group',
        'Pran-RFL Group',
        'Summit Power Corporation',
        'Bashundhara Group',
        'ACI Limited',
        'Walton Digi-Tech',
        'Robi Axiata Ltd'
      ]
    },
    {
      id: 'government',
      name: 'Government & Defense',
      icon: Shield,
      count: '50+ Ministries & Agencies',
      description: 'National secretariats, defense directorates, judicial departments, and municipal corporations.',
      clients: [
        'Ministry of Finance',
        'Ministry of Public Administration',
        'Bangladesh Armed Forces Division',
        'Bangladesh Police Headquarters',
        'National Board of Revenue (NBR)',
        'Bangladesh Railway Central',
        'Dhaka North City Corporation',
        'Export Promotion Bureau (EPB)'
      ]
    },
    {
      id: 'education',
      name: 'Universities & Colleges',
      icon: GraduationCap,
      count: '80+ Institutions',
      description: 'Public & private university examination controllers, libraries, and central administrative wings.',
      clients: [
        'University of Dhaka',
        'BUET Central Controller',
        'Jahangirnagar University',
        'North South University (NSU)',
        'BRAC University',
        'Independent University Bangladesh (IUB)',
        'Dhaka Medical College',
        'Notre Dame College Dhaka'
      ]
    }
  ];

  const filteredCategories =
    activeCategory === 'all'
      ? clientCategories
      : clientCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="clients" className="py-20 bg-[#F8FAFC] text-[#0f172a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold block mb-2">
            Trusted By The Nation's Elite
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Our Prestigious Clients Across Bangladesh
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            For more than three decades, Jahid Office Equipment (JOE) has served as the mission-critical printing partner for top-tier institutions.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                activeCategory === 'all'
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-[#0066cc]'
              }`}
            >
              All Sectors
            </button>
            {clientCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                  activeCategory === cat.id
                    ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-[#0066cc]'
                }`}
              >
                {cat.name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Client Categories Cards (Clean White) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066cc]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0f172a]">{cat.name}</h3>
                        <p className="text-xs font-mono text-[#0066cc] font-bold">{cat.count}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#475569] mb-5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Badges / Client Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.clients.map((c, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-lg bg-slate-50 border border-slate-200 text-[#0f172a] font-medium hover:border-[#0066cc] hover:text-[#0066cc] transition flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-[#475569] flex items-center justify-between font-medium">
                  <span>Standard 99.8% SLA Maintenance</span>
                  <span className="text-[#0066cc] font-bold">Direct Contract Partner</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
