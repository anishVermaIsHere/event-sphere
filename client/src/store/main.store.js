import { create } from "zustand";

const useMainStore = create((set) => ({
  events: [],
  guests: [],
  setEvents: (events) =>
    set((state) => ({
      ...state,
      events
    })),
  setGuests: (guests) =>
    set((state) => ({
      ...state,
      guests
    }))
}));

export default useMainStore;
