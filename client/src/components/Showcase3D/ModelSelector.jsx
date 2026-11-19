import React from 'react';
import { Layers, Zap, Gauge, HardDrive } from 'lucide-react';
import { trackModelSelect } from '../../analytics';

export default function ModelSelector({ machines, selectedModel, onSelectModel }) {
  if (!machines || machines.length === 0) return null;

  return (
    <div className="w-full">
      {/* Tab bar header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-1.5 font-semibold">
          <Layers className="w-3.5 h-3.5" /> Select Toshiba Model:
        </span>
        <span className="text-xs text-slate-400">
          Showing <span className="text-white font-semibold">{machines.length}</span> Active MFP Models
        </span>
      </div>

      {/* Models Grid / Pill Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {machines.map((m) => {
          const isSelected = selectedModel?.slug === m.slug;
          return (
            <button
              key={m.slug}
              type="button"
              onClick={() => {
                onSelectModel(m);
                trackModelSelect(m.slug, m.name);
              }}
              className={`relative px-3 py-2.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 text-white shadow-lg shadow-cyan-950/80 ring-1 ring-cyan-400/50 scale-[1.02]'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-1.5 right-2 px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-toshiba-red text-white shadow-sm">
                  Active
                </span>
              )}
              <div>
                <p className="text-[11px] font-mono text-cyan-400/80 leading-none mb-1">
                  {m.name.replace('Toshiba ', '')}
                </p>
                <p className="text-xs font-bold text-white leading-tight">
                  {m.speedA4}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">Base:</span>
                <span className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`}>
                  ৳{m.basePriceBDT?.toLocaleString('en-IN')}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Model Specs HUD */}
      {selectedModel && (
        <div className="mt-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Speed (A4 / A3)</span>
            <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              {selectedModel.speedA4} / {selectedModel.speedA3}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">First Copy Time</span>
            <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              {selectedModel.firstCopy}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Memory / Storage</span>
            <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              {selectedModel.ram} / {selectedModel.ssd}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Control Panel</span>
            <span className="font-semibold text-white mt-0.5 block truncate" title={selectedModel.controlPanel}>
              {selectedModel.controlPanel}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Paper Capacity</span>
            <span className="font-semibold text-white mt-0.5 block truncate" title={selectedModel.paperCapacity}>
              {selectedModel.paperCapacity}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Base Price (BDT)</span>
            <span className="font-extrabold text-emerald-400 text-sm mt-0.5 block">
              ৳{selectedModel.basePriceBDT?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
