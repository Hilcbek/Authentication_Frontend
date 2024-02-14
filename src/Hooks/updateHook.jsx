import { create } from "zustand";

let useUpdate = create((set) => ({
  reload: true,
  setReload: () => set({ reload: true }),
}));
export default useUpdate;
