import React, { useState } from 'react';
import { Scissors, Layers, CheckCircle } from 'lucide-react';

export default function CuttingSpreading() {
  const [plies, setPlies] = useState(120);
  const maxPlies = 150;
  const markerEfficiency = 86.4; // %
  const totalRatio = { S: 1, M: 2, L: 2, XL: 1 }; // Ratio 1:2:2:1

  const calculatedPcs = plies * Object.values(totalRatio).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-left mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-cyan-400" />
            Cutting Room & Spreading Control
          </h3>
          <p className="text-xs text-slate-400">Marker ID: MK-DENIM-09 | Width: 58" | Table 04</p>
        </div>
        <div className="bg-cyan-950/80 border border-cyan-800/50 px-3 py-1 rounded-lg text-xs font-semibold text-cyan-400">
          Marker Efficiency: {markerEfficiency}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Plies Adjustment */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between">
          <span className="text-xs text-slate-400">Spreading Plies (Layers)</span>
          <div className="flex items-center justify-between my-2">
            <button
              onClick={() => setPlies((p) => Math.max(10, p - 10))}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs font-bold"
            >
              -10
            </button>
            <span className="text-xl font-black text-white">{plies} / {maxPlies}</span>
            <button
              onClick={() => setPlies((p) => Math.min(maxPlies, p + 10))}
              className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-xs font-bold"
            >
              +10
            </button>
          </div>
          <span className="text-[10px] text-slate-400">Max table height limit check: OK</span>
        </div>

        {/* Size Ratio Breakdown */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-2">Size Ratio & Cut Output</span>
          <div className="grid grid-cols-4 gap-1 text-center">
            {Object.entries(totalRatio).map(([size, ratio]) => (
              <div key={size} className="bg-slate-900/80 p-1.5 rounded border border-slate-700/40">
                <span className="text-[10px] text-slate-400 block">{size} ({ratio}x)</span>
                <span className="text-xs font-bold text-emerald-400">{plies * ratio} pcs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Production Summary */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-center items-center text-center">
          <Layers className="w-5 h-5 text-cyan-400 mb-1" />
          <span className="text-xs text-slate-400">Total Cut Ready</span>
          <span className="text-2xl font-black text-white">{calculatedPcs.toLocaleString()} <span className="text-xs font-normal text-slate-400">pcs</span></span>
        </div>
      </div>
    </div>
  );
}