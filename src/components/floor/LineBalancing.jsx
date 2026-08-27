import React, { useState } from 'react';
import { Sliders, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useBPAStore } from '../../store/useBPAStore';

export default function LineBalancing() {
  const resolveBottleneckStore = useBPAStore((state) => state.resolveBottleneck);
  const [operations, setOperations] = useState([
    { id: 1, name: 'Front Pocket Join', targetSec: 45, actualSec: 48 },
    { id: 2, name: 'Zipper Fly Attachment', targetSec: 60, actualSec: 78 },
    { id: 3, name: 'Inseam Stitching', targetSec: 50, actualSec: 49 },
    { id: 4, name: 'Waistband Sticking', targetSec: 55, actualSec: 54 },
  ]);

  const pitchTime = 52;

  const handleResolve = (id) => {
    setOperations((prev) =>
      prev.map((op) => (op.id === id ? { ...op, actualSec: op.targetSec } : op))
    );
    resolveBottleneckStore(1); // Clears active floor bottleneck from top banner
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-left mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            Sewing Line Balancing & Pitch Diagram
          </h3>
          <p className="text-xs text-slate-400">Line 01 | Target Pitch Time: {pitchTime}s / Operation</p>
        </div>
      </div>

      <div className="space-y-3">
        {operations.map((op) => {
          const isBottleneck = op.actualSec > pitchTime + 5;
          return (
            <div key={op.id} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex items-center justify-between">
              <div className="w-1/3">
                <span className="text-xs font-bold text-slate-200 block">{op.name}</span>
                <span className="text-[10px] text-slate-400">Target: {op.targetSec}s | Actual: {op.actualSec}s</span>
              </div>
              <div className="w-1/3 px-4">
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isBottleneck ? 'bg-rose-500' : op.actualSec > op.targetSec ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, (op.actualSec / 90) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="w-1/3 text-right">
                {isBottleneck ? (
                  <button
                    onClick={() => handleResolve(op.id)}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 rounded text-[11px] font-semibold text-white inline-flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3 h-3" /> Rebalance Helper
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Balanced
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}