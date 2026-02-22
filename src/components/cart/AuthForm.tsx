"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

type Mode = "login" | "signup";

interface AuthFormProps {
  onSuccess: () => void;
  onSwitchMode: (mode: Mode) => void;
  mode: Mode;
}

export function AuthForm({ onSuccess, onSwitchMode, mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Failed");
      return;
    }
    onSuccess();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Gmail / Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@gmail.com"
          className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#3D9AC3] focus:border-[#3D9AC3] transition-all duration-200 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#3D9AC3] focus:border-[#3D9AC3] transition-all duration-200 outline-none"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 animate-[fade-in_0.2s_ease-out]">
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full transition-all duration-200"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {mode === "login" ? "Signing in..." : "Creating account..."}
          </span>
        ) : mode === "login" ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </Button>
      <button
        type="button"
        onClick={() => onSwitchMode(mode === "login" ? "signup" : "login")}
        className="w-full text-sm text-[#3D9AC3] hover:underline transition-colors duration-200"
      >
        {mode === "login" ? "Create account" : "Already have account? Login"}
      </button>
    </form>
  );
}
