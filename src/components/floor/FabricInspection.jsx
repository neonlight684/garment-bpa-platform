import React, { useState } from 'react';
import { ShieldCheck, Plus, Minus } from 'lucide-react';

export default function FabricInspection() {
  const [defects, setDefects] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const totalPoints = defects.A * 1 + defects.B * 2 + defects.C * 3 + defects.D * 4;
  const pointsPer100Yards = ((totalPoints * 3600) / (120 * 58)).toFixed(1);
  const isPassed = pointsPer100Yards <= 28;

  const updateDefect = (key, delta) => setDefects(p => ({ ...p, [key]: Math.max(0, p[key] + delta) }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-left">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            4-Point Fabric Quality Audit
          </h3>
          <p className="text-xs text-slate-400">Roll ID: ROLL-02 | Max Target: 28 pts/100 sq.yd</p>
        </div>
        <div className={`px-3 py-1 rounded-lg text-xs font-bold ${isPassed ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          Score: {pointsPer100Yards} Pts ({isPassed ? 'PASSED' : 'REJECTED'})
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: 'A', label: '1 Pt (<3")', pts: 1 },
          { key: 'B', label: '2 Pts (3"-6")', pts: 2 },
          { key: 'C', label: '3 Pts (6"-9")', pts: 3 },
          { key: 'D', label: '4 Pts (>9")', pts: 4 },
        ].map((item) => (
          <div key={item.key} className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50 text-center">
            <span className="text-[11px] text-slate-400 block">{item.label}</span>
            <span className="text-xl font-bold text-white my-1 block">{defects[item.key]}</span>
            <div className="flex justify-center gap-1">
              <button onClick={() => updateDefect(item.key, -1)} className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded">
                <Minus className="w-3 h-3 text-white" />
              </button>
              <button onClick={() => updateDefect(item.key, 1)} className="px-2 py-0.5 bg-blue-600 hover:bg-blue-500 rounded">
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}