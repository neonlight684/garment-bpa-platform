import React from 'react';
import { Cpu, Activity, AlertTriangle, TrendingUp } from 'lucide-react';

export default function KPIIntegration() {
  const linePerformance = [
    { line: 'Sewing Line 01', smv: '18.5m', dhu: '1.8%', efficiency: 84, bottleneck: 'Sleeve Attachment' },
    { line: 'Sewing Line 02', smv: '18.5m', dhu: '2.4%', efficiency: 78, bottleneck: 'Waistband Sticking' },
    { line: 'Sewing Line 03', smv: '18.5m', dhu: '1.2%', efficiency: 91, bottleneck: 'None (Optimal)' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* System Integration Blueprint */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
          <Cpu className="w-5 h-5 text-purple-400" />
          System Integration Architecture (To-Be ERP Blueprint)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="font-bold text-blue-400 block mb-1">PLM (Product Lifecycle)</span>
            <p className="text-slate-400 text-[11px]">Centralizes Tech Packs, grading patterns, and design specs to prevent CAD mismatch.</p>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="font-bold text-emerald-400 block mb-1">APS (Planning & Scheduling)</span>
            <p className="text-slate-400 text-[11px]">Synchronizes sewing line SMV and line capacity against buyer target delivery dates.</p>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="font-bold text-purple-400 block mb-1">WMS (Warehouse Tracking)</span>
            <p className="text-slate-400 text-[11px]">Barcode/RFID tracking for fabric rolls, accessories, and finished packed cartons.</p>
          </div>
        </div>
      </div>

      {/* Live Sewing Line KPI Monitor */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-400" />
          Real-Time Factory Efficiency & Output Visualizer
        </h3>
        <div className="space-y-4">
          {linePerformance.map((row) => (
            <div key={row.line} className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/50">
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="font-bold text-slate-200">{row.line}</span>
                <span className="text-slate-400">Target SMV: <span className="text-white font-mono">{row.smv}</span> | DHU: <span className="text-amber-400 font-mono">{row.dhu}</span></span>
                <span className="font-bold text-emerald-400 font-mono">{row.efficiency}% Efficiency</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${row.efficiency >= 85 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  style={{ width: `${row.efficiency}%` }}
                />
              </div>
              <div className="flex items-center text-[11px] text-slate-400 gap-1">
                {row.bottleneck !== 'None (Optimal)' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                <span>Bottleneck: {row.bottleneck}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}