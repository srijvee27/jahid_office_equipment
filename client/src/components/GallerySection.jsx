import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      title: 'Toshiba e-STUDIO High-Speed Flagship',
      category: 'Multifunction Copiers',
      image: '/images/machine-full-configured.png',
      caption: 'Full-configured departmental MFP with DSDF 300-sheet scanner and booklet finisher.'
    },
    {
      title: 'Toshiba Compact Workgroup Series',
      category: 'Office MFPs',
      image: '/images/machine-compact-series.png',
      caption: 'Space-saving 25/30 PPM MFP configuration for branch banks and corporate departments.'
    },
    {
      title: '10.1" Tablet Touch Control Panel',
      category: 'Sub-Assemblies',
      image: '/images/part-touch-panel-10inch.png',
      caption: 'Tiltable multi-touch high resolution e-BRIDGE Next user interface.'
    },
    {
      title: 'Dual Scan Document Feeder (DSDF)',
      category: 'Modular Options',
      image: '/images/part-dsdf-feeder.png',
      caption: 'High-speed dual optical sensor scanning 240 duplex images per minute.'
    },
    {
      title: 'Imaging Drum & Developer Process Unit',
      category: 'Original Spares',
      image: '/images/part-drum-developer.png',
      caption: 'Long-life organic photoconductor drum ensuring sharp text and dense blacks.'
    },
    {
      title: 'High-Temperature Fuser Fixing Assembly',
      category: 'Internal Units',
      image: '/images/part-fuser-unit.png',
      caption: 'Precision ceramic heating fuser assembly for permanent toner bonding.'
    },
    {
      title: 'Original Toshiba Black Toner Cartridge',
      category: 'Consumables',
      image: '/images/part-toner-cartridge.png',
      caption: 'Genuine micro-fine laser toner yielding up to 36,000 pages at 5% coverage.'
    },
    {
      title: 'Multi-Position Inner Finisher MJ-1048',
      category: 'Finishing Options',
      image: '/images/part-finisher-unit.png',
      caption: 'Internal 600-sheet stapling finisher maintaining minimal office footprint.'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white text-[#0f172a] relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0066cc] font-bold block mb-2">
            Visual Equipment Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Photo Gallery &amp; Installations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            A glimpse into our machine configurations, modular finishing units, and genuine spare parts distributed throughout Bangladesh.
          </p>
        </div>

        {/* Gallery Grid (Clean White) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden cursor-pointer shadow-sm hover:border-[#0066cc] hover:shadow-xl transition duration-300"
            >
              <div className="h-52 w-full p-6 flex items-center justify-center bg-slate-50 group-hover:scale-105 transition duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.1)]"
                />
              </div>

              {/* Overlay Details */}
              <div className="p-4 bg-white border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0066cc] block mb-1 font-bold">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-[#0f172a] group-hover:text-[#0066cc] transition truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-[#475569] mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              {/* Hover Badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-lg bg-[#0066cc] text-white shadow-md">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Image Zoom Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden shadow-2xl text-[#0f172a]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>

              <div className="h-80 w-full flex items-center justify-center bg-slate-50 rounded-xl p-6 mb-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xl"
                />
              </div>

              <span className="text-xs font-mono text-[#0066cc] uppercase tracking-wider block mb-1 font-bold">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold text-[#0f172a]">{selectedImage.title}</h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
