import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  // State variables
  totalMessages: 0,
  averageResponseTime: 0,
  users: [],
  messagesByPeriod: [],

  // Actions to update state
  setTotalMessages: (totalMessages) => set({ totalMessages }),
  setAverageResponseTime: (averageResponseTime) => set({ averageResponseTime }),
  setUsers: (users) => set({ users }),
  setMessagesByPeriod: (messagesByPeriod) => set({ messagesByPeriod }),

  // Combined action to update multiple state variables at once
  setDashboardData: ({
    totalMessages,
    averageResponseTime,
    users,
    messagesByPeriod,
  }) => set({ totalMessages, averageResponseTime, users, messagesByPeriod }),
}));

export default useDashboardStore;
