import React, { useEffect, useState } from 'react';
import { Warehouse, AlertTriangle, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

export default function MultiWarehouseStock() {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/inventory/ai-prediction/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPredictionData(data.aiPredictions);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching inventory AI prediction:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Warehouse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Multi-Warehouse Stock & AI Prediction</h2>
            <p className="text-xs text-slate-400">Real-time inventory distribution and AI shortage risk analysis</p>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center space-x-1 text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Stock</span>
        </button>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-slate-400">WH-01</span>
            <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Optimal</span>
          </div>
          <h3 className="font-semibold text-sm text-white mb-1">Main Central Hub - Dhaka</h3>
          <p className="text-2xl font-bold text-blue-400">340 <span className="text-xs font-normal text-slate-400">Rolls</span></p>
        </div>

        <div className="bg-slate-950/60 border border-amber-900/40 p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-amber-400">WH-02</span>
            <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">Low Stock Risk</span>
          </div>
          <h3 className="font-semibold text-sm text-white mb-1">Ctg Export Processing Zone</h3>
          <p className="text-2xl font-bold text-amber-400">120 <span className="text-xs font-normal text-slate-400">Rolls</span></p>
        </div>

        <div className="bg-slate-950/60 border border-purple-900/40 p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-purple-400">WH-03</span>
            <span className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Overstocked</span>
          </div>
          <h3 className="font-semibold text-sm text-white mb-1">Uttara Trims Depot</h3>
          <p className="text-2xl font-bold text-purple-400">580 <span className="text-xs font-normal text-slate-400">Units</span></p>
        </div>
      </div>

      {/* AI Prediction Box */}
      <div className="bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-slate-900 border border-purple-500/30 rounded-xl p-5">
        <div className="flex items-center space-x-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-semibold text-purple-300">AI Inventory Shortage Prediction</h3>
          {predictionData && (
            <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30 font-mono">
              Confidence: {predictionData.confidenceScore}
            </span>
          )}
        </div>

        {loading ? (
          <p className="text-xs text-slate-400 italic">Analyzing multi-warehouse telemetry...</p>
        ) : predictionData ? (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Critical Shortage Risk Item:</span>
              </span>
              <span className="font-semibold text-amber-300">{predictionData.shortageRiskItem}</span>
            </div>

            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Predicted Stock Depletion:</span>
              <span className="font-semibold text-rose-400">{predictionData.predictedDepletionDays} Days Remaining</span>
            </div>

            <div className="bg-blue-950/40 border border-blue-900/50 p-3 rounded-lg flex items-start space-x-3">
              <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-blue-300 block mb-0.5">AI Recommended Action:</span>
                <p className="text-slate-300">{predictionData.recommendedAction}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-rose-400">Failed to load AI prediction metrics.</p>
        )}
      </div>
    </div>
  );
}