import { create } from 'zustand';

export const useBPAStore = create((set) => ({
  activeOrder: {
    id: 'WO-8842',
    buyer: 'H&M',
    totalQuantity: 25000,
    smv: 18.5,
  },
  bottlenecks: [
    { id: 1, stage: 'Merch -> Cutting', message: 'Fabric shade-band approval pending from buyer', delayHours: 14 },
    { id: 2, stage: 'Trade Compliance', message: 'Original Bill of Lading pending freight forwarder release', delayHours: 8 },
  ],
  resolveBottleneck: (id) =>
    set((state) => ({
      bottlenecks: state.bottlenecks.filter((item) => item.id !== id),
    })),
}));