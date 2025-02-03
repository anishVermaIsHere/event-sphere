import { create } from "zustand";
import { getStartEndDates } from "../shared/utils";


const dates = getStartEndDates();

const useMainStore = create((set) => ({
  dates: { from: dates.startDate, to: dates.endDate },
  daysInMonth: [],
  setDaysInMonth: (days)=>set({ daysInMonth: days }),
  setDates: (dates)=>set({ dates }),
}));

export default useMainStore;
