"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store";

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.error("session error response", data);
        }
        setUser(data.user ?? null);
      })
      .catch((err) => {
        console.error("session fetch failed", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [setUser, setLoading]);

  return { user, loading, isLoggedIn: !!user };
}
