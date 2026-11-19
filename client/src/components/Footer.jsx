import React from 'react';
import { Phone, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-[#475569] border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0066cc] p-0.5 flex items-center justify-center shadow-sm">
                <span className="font-extrabold text-base text-white font-heading">
                  JOE
                </span>
              </div>
              <div>
                <span className="text-base font-extrabold text-[#0f172a] tracking-tight block font-heading">
                  JAHID OFFICE EQUIPMENT
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#0066cc] uppercase font-bold">
                  Established 1990 • Dhaka, Bangladesh
                </span>
              </div>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              Nationwide authorized distributor of Toshiba Multifunction Photocopiers, genuine spare parts, Unibind steel binding systems, and heavy-duty office machinery.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#0066cc] font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Authorized Japanese OEM Distributor</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0f172a] font-bold">
              Core Navigation
            </h4>
            <ul className="space-y-2 font-medium">
              {[
                { name: 'Home', href: '#home' },
                { name: '3D Photocopier Showcase', href: '#showcase' },
                { name: 'About Us (Est. 1990)', href: '#about' },
                { name: 'Message from Managing Director', href: '#md-message' },
                { name: 'Products & Equipment', href: '#products' },
                { name: 'Our Prestigious Clients', href: '#clients' },
                { name: 'Business Partners', href: '#partners' },
                { name: 'Service & Support (AMC)', href: '#services' },
                { name: 'Photo Gallery', href: '#gallery' },
                { name: 'Contact Us', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#0066cc] transition flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Spare Parts */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0f172a] font-bold">
              Key Lineup
            </h4>
            <ul className="space-y-2 font-medium text-slate-600">
              <li>Toshiba e-STUDIO MFPs</li>
              <li>Dual Scan Feeders (DSDF)</li>
              <li>Drum &amp; Developer Units</li>
              <li>High-Temp Fuser Units</li>
              <li>Original Black Toners</li>
              <li>Digital Super G3 Fax</li>
              <li>Unibind Steel Binding</li>
              <li>Bio system Paper Shredders</li>
              <li>Thermal Laminating</li>
            </ul>
          </div>

          {/* Hotlines & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0f172a] font-bold">
              Direct Contact &amp; Hotlines
            </h4>
            <div className="space-y-2">
              <a
                href="tel:01713093300"
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#0066cc] text-[#0f172a] font-mono flex items-center gap-2.5 transition shadow-sm"
              >
                <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#475569] block font-sans font-medium">Hotline 1 (Sales)</span>
                  <span className="font-extrabold text-sm text-[#0066cc]">01713-093300</span>
                </div>
              </a>

              <a
                href="tel:01922117201"
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#0066cc] text-[#0f172a] font-mono flex items-center gap-2.5 transition shadow-sm"
              >
                <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#475569] block font-sans font-medium">Hotline 2 (Technical)</span>
                  <span className="font-extrabold text-sm text-[#0066cc]">01922-117201</span>
                </div>
              </a>

              <div className="pt-2 text-[11px] text-[#475569] space-y-1">
                <p>Motijheel / Paltan Commercial Area, Dhaka - 1000</p>
                <p>Website: www.jahidoffice.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with exact required copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#475569]">
          <p className="font-bold text-[#0f172a]">
            © 2026 JAHID OFFICE EQUIPMENT (JOE) All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" className="hover:text-[#0066cc] transition">
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
