import React, { useState } from 'react';
import { Package, Box, CheckCircle2 } from 'lucide-react';

export default function PackingList() {
  const [cartonsPacked, setCartonsPacked] = useState(450);
  const totalCartons = 500;
  const pcsPerCarton = 50;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-left mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            Finishing & Carton Packing Monitor
          </h3>
          <p className="text-xs text-slate-400">Destination Warehouse: H&M Distribution Center, Hamburg | Ratio: Solid Color</p>
        </div>
        <div className="bg-emerald-950/80 border border-emerald-800/50 px-3 py-1 rounded-lg text-xs font-semibold text-emerald-400">
          Packing Progress: {((cartonsPacked / totalCartons) * 100).toFixed(0)}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carton Counter Controls */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between">
          <span className="text-xs text-slate-400">Cartons Packed / Total</span>
          <div className="flex items-center justify-between my-2">
            <button
              onClick={() => setCartonsPacked((c) => Math.max(0, c - 10))}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs font-bold"
            >
              -10
            </button>
            <span className="text-xl font-black text-white">{cartonsPacked} / {totalCartons}</span>
            <button
              onClick={() => setCartonsPacked((c) => Math.min(totalCartons, c + 10))}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold"
            >
              +10
            </button>
          </div>
          <span className="text-[10px] text-slate-400">Standard: {pcsPerCarton} pcs per master carton</span>
        </div>

        {/* Packed Pieces Info */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-center items-center text-center">
          <Box className="w-5 h-5 text-emerald-400 mb-1" />
          <span className="text-xs text-slate-400">Total Packed Garments</span>
          <span className="text-2xl font-black text-emerald-400">{(cartonsPacked * pcsPerCarton).toLocaleString()} <span className="text-xs font-normal text-slate-400">pcs</span></span>
        </div>

        {/* Dispatch Status */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-center">
          <span className="text-xs text-slate-400 block mb-1">Container Stuffing Status</span>
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> 40HC Container Scheduled for Sept 02
          </div>
          <span className="text-[10px] text-slate-500 mt-1">Seal #SL-990231 assigned</span>
        </div>
      </div>
    </div>
  );
}