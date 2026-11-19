import React from 'react';
import { ShieldCheck, Phone, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0066cc]">
                Authorized Toshiba Distributor in Bangladesh
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-blue-100">
                Est. 1990
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f172a] leading-[1.15]">
              Jahid Office Equipment <br />
              <span className="text-[#0066cc]">
                Toshiba 3D Photocopiers
              </span>{' '}
              & Genuine Spares
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              For over <strong className="text-[#0f172a] font-semibold">34 years</strong>, JAHID OFFICE EQUIPMENT (JOE) has powered Bangladesh's leading banks, corporations, universities, and government ministries with genuine Toshiba multifunction copiers, original consumables, and 24/7 technical engineering support.
            </p>

            {/* Hotlines & CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#showcase"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition shadow-md shadow-blue-500/20 flex items-center gap-2 group active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition" />
                <span>Launch 3D Exploded-View</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="#contact"
                className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0066cc] bg-white hover:bg-slate-50 border border-blue-200 transition flex items-center gap-2 shadow-sm"
              >
                <span>Request BDT Quote</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading">
                  34+ <span className="text-[#0066cc] text-lg font-bold">Years</span>
                </p>
                <p className="text-xs text-[#475569] mt-0.5">Established 1990</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading">
                  2,500+
                </p>
                <p className="text-xs text-[#475569] mt-0.5">Active Deployments</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading">
                  100%
                </p>
                <p className="text-xs text-[#475569] mt-0.5">Genuine OEM Parts</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card (Clean Studio White) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-white border border-slate-200 p-6 shadow-xl overflow-hidden group">
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#0f172a]">
                    Toshiba e-STUDIO6528A Series
                  </span>
                </div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider font-mono bg-rose-50 px-2 py-0.5 rounded">
                  OEM Certified
                </span>
              </div>

              {/* Central Machine Preview */}
              <div className="py-6 flex items-center justify-center relative">
                <img
                  src="/images/machine-full-configured.png"
                  alt="Toshiba e-STUDIO Multifunction Photocopier"
                  className="max-h-72 object-contain filter drop-shadow-[0_15px_25px_rgba(15,23,42,0.12)] group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Floating Features Pill */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-[#475569] uppercase block font-mono font-bold">Print Speed</span>
                  <span className="font-bold text-[#0f172a]">25 - 65 PPM A4</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-[#475569] uppercase block font-mono font-bold">Control Panel</span>
                  <span className="font-bold text-[#0f172a]">10.1" Multi-Touch</span>
                </div>
              </div>

              {/* Hotlines Banner */}
              <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <span className="text-xs text-[#0066cc] flex items-center gap-1.5 font-bold">
                  <Phone className="w-3.5 h-3.5 text-rose-600" /> Hotlines:
                </span>
                <span className="text-xs font-mono font-extrabold text-[#0f172a]">
                  01713-093300 / 01922-117201
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
