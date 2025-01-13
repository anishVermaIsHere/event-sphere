import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  accessToken: "",
  refreshToken: "",
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearUser: () => set({ user: null })
}))


export default useAuthStore