import { create } from 'zustand'

// current session user
const useUserStore = create((set) => ({
  username: null,
  isAuthenticated: false,
  setUser: (username) => set({ username, isAuthenticated: true }),
  clearUser: () => set({ username: null, isAuthenticated: false }),
}));

export default useUserStore;
