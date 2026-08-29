import React, { useState } from 'react';
import { useBPAStore } from './store/useBPAStore';
import { Factory, Globe, Cpu, AlertTriangle, Layers, Radio, Sparkles } from 'lucide-react';

// Sub-components Import
import TechPackBOM from './components/preproduction/TechPackBOM';
import FabricInspection from './components/floor/FabricInspection';
import CuttingSpreading from './components/floor/CuttingSpreading';
import LineBalancing from './components/floor/LineBalancing';
import PackingList from './components/floor/PackingList';
import TradeCompliance from './components/trade/TradeCompliance';
import KPIIntegration from './components/floor/KPIIntegration';
import LiveFloorDashboard from './components/floor/LiveFloorDashboard';
import AICopilotPanel from './components/common/AICopilotPanel';
import MultiWarehouseStock from './components/common/MultiWarehouseStock';

export default function App() {
  const [activePhase, setActivePhase] = useState('phase1');
  const { activeOrder, bottlenecks } = useBPAStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">GarmentBPA Platform</h1>
              <p className="text-xs text-slate-400">Garment Manufacturing & Export Operations</p>
            </div>
          </div>

          {/* Active Order Summary Widget */}
          <div className="hidden md:flex items-center space-x-6 text-sm bg-slate-800/60 px-4 py-1.5 rounded-lg border border-slate-700/50">
            <div>
              <span className="text-slate-400 block text-xs">Work Order</span>
              <span className="font-semibold text-blue-400">{activeOrder.id}</span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 block text-xs">Buyer</span>
              <span className="font-semibold text-white">{activeOrder.buyer}</span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 block text-xs">Qty / SMV</span>
              <span className="font-semibold text-emerald-400">
                {activeOrder.totalQuantity.toLocaleString()} pcs | {activeOrder.smv}m
              </span>
            </div>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <nav className="flex max-w-7xl mx-auto px-4 space-x-2 overflow-x-auto">
          <button
            onClick={() => setActivePhase('phase1')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors shrink-0 ${
              activePhase === 'phase1'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Phase 1: Operational Factory Floor</span>
          </button>

          <button
            onClick={() => setActivePhase('phase2')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors shrink-0 ${
              activePhase === 'phase2'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Phase 2: Export & Trade Compliance</span>
          </button>

          <button
            onClick={() => setActivePhase('phase3')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors shrink-0 ${
              activePhase === 'phase3'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Phase 3: IT Integration & KPIs</span>
          </button>

          <button
            onClick={() => setActivePhase('iot')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors shrink-0 ${
              activePhase === 'iot'
                ? 'border-green-500 text-green-400 bg-green-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Radio className="w-4 h-4 text-green-400 animate-pulse" />
            <span>Live IoT Floor Stream</span>
          </button>

          <button
            onClick={() => setActivePhase('copilot')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors shrink-0 ${
              activePhase === 'copilot'
                ? 'border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
            <span>AI Co-pilot</span>
          </button>
        </nav>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Global Bottleneck Warning Banner */}
        {bottlenecks.length > 0 && activePhase !== 'iot' && activePhase !== 'copilot' && (
          <div className="mb-6 p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-amber-400">
                  Active Operational Bottlenecks ({bottlenecks.length})
                </h3>
              </div>
              <div className="mt-2 space-y-1">
                {bottlenecks.map((item) => (
                  <p key={item.id} className="text-xs text-slate-300 flex justify-between">
                    <span>• [{item.stage}] {item.message}</span>
                    <span className="text-rose-400 font-mono">+{item.delayHours}h impact</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Phase 1 View: Factory Floor & Pre-production */}
        {activePhase === 'phase1' && (
          <div className="space-y-6">
            <TechPackBOM />
            <MultiWarehouseStock />
            <FabricInspection />
            <CuttingSpreading />
            <LineBalancing />
            <PackingList />
          </div>
        )}

        {/* Phase 2 View: Export, Trade & Audits */}
        {activePhase === 'phase2' && (
          <TradeCompliance />
        )}

        {/* Phase 3 View: IT Blueprint & Analytics */}
        {activePhase === 'phase3' && (
          <KPIIntegration />
        )}

        {/* Live IoT Floor Stream View */}
        {activePhase === 'iot' && (
          <LiveFloorDashboard />
        )}

        {/* AI Co-pilot Panel View */}
        {activePhase === 'copilot' && (
          <div className="max-w-3xl mx-auto">
            <AICopilotPanel />
          </div>
        )}
      </main>
    </div>
  );
}