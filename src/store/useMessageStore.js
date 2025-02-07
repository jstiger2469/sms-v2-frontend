import { create } from 'zustand';

const useMessageStore = create((set) => ({
  selectedUser: null,
  message: '',
  setSelectedUser: (user) => set({ selectedUser: user }),
  setMessage: (msg) => set({ message: msg }),
  clear: () => set({ selectedUser: null, message: '' }),
}));

export default useMessageStore;
