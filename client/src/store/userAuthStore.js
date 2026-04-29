import api from "../api/axiosInstance";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  userLoading: true,
  error: null,
  fetchUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      set({ user: data.data });
    } catch (err) {
      set({ error: err.response.data.message });
      localStorage.removeItem("token");
      console.error(`Error: ${err.response.data.message}`);
    } finally {
      set({ userLoading: false });
    }
  },
  setUser: (u) => set({ user: u }),
}));

export default useAuthStore;
