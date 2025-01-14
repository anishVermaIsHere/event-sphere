import { create } from "zustand";

const useAppStore = create((set) => ({
  snackbarOpen: true,
  snackbarVertical: "top",
  snackbarHorizontal: "center",
  snackbarMessage: "Hello",
  setSnackbar: (message) =>
    set((state) => ({
      ...state,
      snackbarMessage: message,
      snackbarOpen: true
    })),
  closeSnackbar: () =>
    set((state) => ({
      ...state,
      snackbarMessage: "Hello",
      snackbarOpen: false
    }))
}));

export default useAppStore;
