import { create } from 'zustand';

// global loading
const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export default useLoadingStore;