import { create } from "zustand";

const useFormStore = create((set) => ({
  event: {
    isAddOpen: false,
    isEditOpen: false,
    eventId: "",
    setEventId: (eventId)=>set((state)=>({ event: { ...state.event, eventId }})),
    setIsAddOpen: (isAddOpen) => set((state) => ({ event: { ...state.event, isAddOpen } })),
    setIsEditOpen: (isEditOpen) => set((state) => ({ event: { ...state.event, isEditOpen } })),
  }
}));

export default useFormStore;
