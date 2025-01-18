import { create } from "zustand";

const useFormStore = create((set) => ({
  event: {
    isAddOpen: false,
    isEditOpen: false,
    setIsAddOpen: (isAddOpen) => set((state) => ({ event: { ...state.event, isAddOpen } })),
    setIsEditOpen: (isEditOpen) => set((state) => ({ event: { ...state.event, isEditOpen } })),
  }
}));

export default useFormStore;
