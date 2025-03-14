import { create } from 'zustand';

// global notification
const useNotificationStore = create((set) => ({
  notification: null,
  notificationType: 'info',
  setNotification: (message, type = 'info') => set({ notification: message, notificationType: type }),
  clearNotification: () => set({ notification: null, notificationType: 'info' }),
}));

export default useNotificationStore;