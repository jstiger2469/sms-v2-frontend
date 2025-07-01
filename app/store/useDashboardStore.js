import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  totalMessages: 0,
  setTotalMessages: (totalMessages) => set({ totalMessages }),
  averageResponseTime: '',
  setAverageResponseTime: (averageResponseTime) => set({ averageResponseTime }),
}));

export default useDashboardStore; 