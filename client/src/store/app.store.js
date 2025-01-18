import { create } from "zustand";

const useAppStore = create((set) => ({
  snackbarOpen: true,
  snackbarVertical: "top",
  snackbarHorizontal: "center",
  snackbarMessage: "Hello",
  dialogOpen: false,
  dialogTitle: "",
  dialogContent: "",
  dataView: "list",

  isEditOpen: false,
  setIsEditOpen: ()=>{

  },
  setDataView: (dataView )=>set({ dataView }),
  setDialog: ({ dialogOpen, dialogTitle, dialogContent })=> set({ dialogOpen, dialogContent, dialogTitle }),
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
