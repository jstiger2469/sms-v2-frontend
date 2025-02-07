import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  newNotificationCount: 0,
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      newNotificationCount: state.newNotificationCount + 1,
    })),
  resetNewNotificationCount: () => set({ newNotificationCount: 0 }),
}));

export default useNotificationStore;
