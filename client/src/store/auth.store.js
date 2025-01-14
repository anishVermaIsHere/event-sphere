import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    user: null,
    accessToken: "",
    refreshToken: "",
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken) => set({ accessToken }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    clearUser: () => set({ user: null }),
    clearTokens: () => set({ accessToken: "", refreshToken: "" }),
  }),
  {
    name: '_auth', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },
)
);

export default useAuthStore;
