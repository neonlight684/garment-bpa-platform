import React from 'react';
import { Globe, FileCheck, ShieldCheck, Truck, DollarSign } from 'lucide-react';

export default function TradeCompliance() {
  const complianceAudits = [
    { name: 'BSCI / SEDEX', type: 'Social Compliance', status: 'VALID', expiry: '2027-03-15' },
    { name: 'WRAP Certification', type: 'Factory Standards', status: 'VALID', expiry: '2026-11-30' },
    { name: 'OEKO-TEX Standard 100', type: 'Chemical Safety', status: 'VALID', expiry: '2027-01-20' },
    { name: 'GOTS (Organic Fabric)', type: 'Raw Material', status: 'PENDING RENEWAL', expiry: '2026-09-10' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Document & LC Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-4">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          Export Commercial Documentation & LC Track
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Proforma Invoice (PI)</span>
            <span className="text-sm font-semibold text-emerald-400">PI-2026-0988 (VERIFIED)</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Letter of Credit (LC)</span>
            <span className="text-sm font-semibold text-blue-400">LC-HSBC-441092</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Customs Clearance (EDI)</span>
            <span className="text-sm font-semibold text-amber-400">ASYCUDA Pending</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Bill of Lading (BL)</span>
            <span className="text-sm font-semibold text-slate-300">Awaiting Stuffing</span>
          </div>
        </div>
      </div>

      {/* Compliance Audits Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          Sustainability & Social Compliance Audits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {complianceAudits.map((audit) => (
            <div key={audit.name} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <span className="text-xs font-bold text-slate-200 block">{audit.name}</span>
              <span className="text-[10px] text-slate-400 block mb-2">{audit.type}</span>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                audit.status === 'VALID' ? 'bg-emerald-950/80 text-emerald-400' : 'bg-amber-950/80 text-amber-400'
              }`}>
                {audit.status} ({audit.expiry})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}