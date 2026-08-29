import { create } from 'zustand';
import { io } from 'socket.io-client';

// Connect to backend Socket.io server
export const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to Backend Real-time Server:', socket.id);
});

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
  
  // Send live floor updates via socket
  sendFloorUpdate: (floorData) => {
    socket.emit('floor_data_update', floorData);
  }
}));