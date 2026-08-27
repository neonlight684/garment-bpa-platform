import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function TechPackBOM() {
  const exportBOMCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Category,Item Description,Consumption,Supplier,Status\n" +
      "Fabric,100% Cotton Denim 12oz,1.45 yds,Mills Co.,Approved\n" +
      "Trims,YKK Metal Zipper 5#,1 pcs,YKK Corp,Pending Lab Test\n" +
      "Thread,Core Spun Polyester 20/3,180 meters,Coats,Approved";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "TechPack_BOM_WO-8842.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bomItems = [
    { category: 'Fabric', desc: '100% Cotton Denim 12oz', consumption: '1.45 yds', supplier: 'Mills Co.', status: 'Approved', statusColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' },
    { category: 'Trims', desc: 'YKK Metal Zipper 5#', consumption: '1 pcs', supplier: 'YKK Corp', status: 'Pending Lab Test', statusColor: 'text-amber-400 bg-amber-950/80 border-amber-800' },
    { category: 'Thread', desc: 'Core Spun Polyester 20/3', consumption: '180 meters', supplier: 'Coats', status: 'Approved', statusColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-left mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Tech Pack #TP-8842-V3 | Slim Fit Denim
          </h3>
          <p className="text-xs text-slate-400">Bill of Materials (BOM) & Grading Specification</p>
        </div>
        <button
          onClick={exportBOMCSV}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Export BOM CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="pb-2.5 font-semibold">CATEGORY</th>
              <th className="pb-2.5 font-semibold">ITEM DESCRIPTION</th>
              <th className="pb-2.5 font-semibold">CONSUMPTION</th>
              <th className="pb-2.5 font-semibold">SUPPLIER</th>
              <th className="pb-2.5 font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {bomItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30">
                <td className="py-3 font-medium text-blue-400">{item.category}</td>
                <td className="py-3 text-slate-200">{item.desc}</td>
                <td className="py-3 text-slate-300 font-mono">{item.consumption}</td>
                <td className="py-3 text-slate-400">{item.supplier}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}