import React from 'react';
import { Wrench, PhoneCall, Clock, ShieldCheck, Headphones } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      title: 'Annual Maintenance Contracts (AMC)',
      subtitle: 'Comprehensive & Non-Comprehensive Options',
      description: 'Scheduled preventive servicing, toner replacement, developer calibration, and priority emergency attendance ensuring 99.8% machine uptime.',
      icon: ShieldCheck
    },
    {
      title: 'Emergency On-Site Technical Dispatch',
      subtitle: 'Rapid Response within Dhaka & Nationwide',
      description: 'Factory-certified technicians dispatched with genuine diagnostic kits, resolving paper misfeeds, optical errors, and network print problems.',
      icon: Clock
    },
    {
      title: '100% Genuine Spare Parts Replacement',
      subtitle: 'Original Toshiba & Brand-Specific Spares',
      description: 'Direct access to OEM drum units, fusers, transfer belts, pickup rollers, and DSDF feeder kits with full transparent BDT quotation.',
      icon: Wrench
    },
    {
      title: 'Operator & Staff Training',
      subtitle: 'Hands-on Machine Handling Workshops',
      description: 'Educating your office staff on optimal paper loading, document scanner presets, user authentication codes, and toner installation to prolong machine lifespan.',
      icon: Headphones
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#F8FAFC] text-[#0f172a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold block mb-2">
            Unrivaled After-Sales Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Service &amp; Support Infrastructure
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            A photocopier is only as dependable as the team maintaining it. JOE provides continuous technical maintenance so your operations never miss a deadline.
          </p>
        </div>

        {/* Services Grid (Clean White) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#0066cc] transition duration-200 flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066cc] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-1">{s.title}</h3>
                  <p className="text-xs font-mono text-[#0066cc] mb-3 font-bold">{s.subtitle}</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Breakdown Hotline CTA Box */}
        <div className="p-8 rounded-3xl bg-white border border-blue-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              Machine Jam / Breakdown Hotline
            </div>
            <h3 className="text-2xl font-extrabold text-[#0f172a]">
              Need Urgent Technical Assistance or AMC Renewal?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-xl">
              Our engineering coordination desk is active for all contracted clients. Speak directly with a certified support engineer right now.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:01713093300"
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold font-mono transition shadow-md flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              01713-093300
            </a>
            <a
              href="tel:01922117201"
              className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066cc] text-xs font-bold font-mono transition border border-blue-200 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              01922-117201
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
