import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { mockLogin } from "@/api/auth/login";
import type { AuthActions, AuthState } from "../@types/store";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          // TODO replace with actual authentication
          const response = await mockLogin(email, password);

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => set({ user }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);

console.log("Store created:", useAuthStore);
