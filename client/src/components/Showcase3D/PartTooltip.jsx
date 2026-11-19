import React from 'react';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

export default function PartTooltip({ part, isMobile, onOpenModal }) {
  if (!part) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onOpenModal(part);
      }}
      className="pointer-events-auto select-none w-64 md:w-72 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-slate-100 shadow-2xl shadow-cyan-950/80 transition-all duration-200 hover:border-cyan-400 hover:scale-105 cursor-pointer -translate-y-12"
    >
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-2">
        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 flex items-center gap-1">
          <Tag className="w-2.5 h-2.5" />
          {part.category}
        </span>
        <span className="text-xs font-bold text-emerald-400 tracking-tight">
          ৳{part.priceBDT?.toLocaleString('en-IN')}
        </span>
      </div>

      <h4 className="text-sm font-bold text-white leading-tight mb-1">
        {part.name}
      </h4>

      <p className="text-[11px] font-mono text-cyan-200/80 mb-1.5">
        Part #: <span className="text-white font-medium">{part.partNumber}</span>
      </p>

      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
        {part.shortDesc}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
        <span className="text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          {isMobile ? 'Tap again to inspect' : 'Click to inspect'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(part);
          }}
          className="text-cyan-400 font-semibold hover:text-cyan-300 flex items-center gap-0.5 underline-offset-2 hover:underline"
        >
          Details <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
