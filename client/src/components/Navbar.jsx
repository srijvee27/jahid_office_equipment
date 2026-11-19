import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Layers, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: '3D Showcase', href: '#showcase', highlight: true },
    { name: 'About Us', href: '#about' },
    { name: 'MD Message', href: '#md-message' },
    { name: 'Products', href: '#products' },
    { name: 'Clients', href: '#clients' },
    { name: 'Partners', href: '#partners' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2.5'
          : 'bg-white/95 backdrop-blur-sm border-b border-slate-200 py-3'
      }`}
    >
      <div className="w-full max-w-[1480px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Est. 1990 — Guaranteed Single Line with whitespace-nowrap */}
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0066cc] p-0.5 shadow-md flex items-center justify-center shrink-0">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-wider font-heading">
                JOE
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm sm:text-base xl:text-lg font-extrabold text-[#0f172a] tracking-tight font-heading whitespace-nowrap leading-tight">
                JAHID OFFICE EQUIPMENT
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#0066cc] uppercase font-bold whitespace-nowrap leading-tight mt-0.5">
                Established 1990 • 34+ Years of Trust
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links — Guaranteed Single Line */}
          <nav className="hidden xl:flex items-center gap-1.5 xl:gap-2 2xl:gap-3.5 text-xs font-semibold text-slate-700 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap transition-colors duration-150 hover:text-[#0066cc] px-2 py-1 rounded-md ${
                  link.highlight
                    ? 'text-[#0066cc] font-bold flex items-center gap-1 bg-[#e0f2fe] px-2.5 py-1 rounded-full border border-sky-200 shadow-xs'
                    : ''
                }`}
              >
                {link.highlight && <Layers className="w-3.5 h-3.5 animate-pulse text-[#0066cc] shrink-0" />}
                <span className="whitespace-nowrap">{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Right Action: Hotlines & Request Quote — Guaranteed Single Line */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            <a
              href="tel:01713093300"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#0066cc] text-xs font-mono text-[#0066cc] transition shadow-xs font-bold shrink-0 whitespace-nowrap"
              title="Call Sales Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-rose-600 animate-bounce shrink-0" />
              <span className="whitespace-nowrap">01713-093300</span>
            </a>
            <a
              href="#showcase"
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#0066cc] hover:bg-[#0052a3] text-white transition shadow-sm shrink-0 whitespace-nowrap flex items-center"
            >
              <span className="whitespace-nowrap">3D Exploded View</span>
            </a>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0066cc] shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-1.5 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center justify-between whitespace-nowrap ${
                  link.highlight
                    ? 'bg-[#e0f2fe] text-[#0066cc]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0066cc]'
                }`}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  {link.highlight && <Layers className="w-4 h-4 text-[#0066cc]" />}
                  {link.name}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          {/* Mobile Hotlines */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <a
              href="tel:01713093300"
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[#0066cc] font-bold flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              <span className="whitespace-nowrap">01713-093300</span>
            </a>
            <a
              href="tel:01922117201"
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[#0066cc] font-bold flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              <span className="whitespace-nowrap">01922-117201</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
