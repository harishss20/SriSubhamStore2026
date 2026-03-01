"use client";

import { create } from "zustand";

export interface AuthState {
  user:
    | {
        id: string;
        email: string;
        name?: string;
        mobile?: string;
        addresses?: any[];
      }
    | null;
  loading: boolean;
  setUser: (user: AuthState["user"]) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null });
  },
}));
