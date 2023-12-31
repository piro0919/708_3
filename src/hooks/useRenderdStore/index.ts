import { create } from "zustand";

interface RenderdStore {
  onRenderd: () => void;
  renderd: boolean;
}

const useRenderdStore = create<RenderdStore>((set) => ({
  onRenderd: (): void => set(() => ({ renderd: true })),
  renderd: false,
}));

export default useRenderdStore;
