import { create } from "zustand";

const useAppStore = create((set) => ({
  snackbarOpen: false,
  snackbarVertical: "top",
  snackbarHorizontal: "center",
  snackbarColor: "info",
  snackbarMessage: "",
  dialogOpen: false,
  dialogTitle: "",
  dialogContent: "",
  dataView: "list",
  selectedEventRows: [],
  setSelectedEventRows: (selectedEventRows)=>set({ selectedEventRows }),
  setDataView: (dataView )=>set({ dataView }),
  setDialog: ({ dialogOpen, dialogTitle, dialogContent })=> set({ dialogOpen, dialogContent, dialogTitle }),
  setSnackbar: (message, color) =>
    set((state) => ({
      ...state,
      snackbarMessage: message,
      snackbarColor: color,
      snackbarOpen: true
    })),
  closeSnackbar: () =>
    set((state) => ({
      ...state,
      snackbarMessage: "",
      snackbarOpen: false
    }))
}));

export default useAppStore;
