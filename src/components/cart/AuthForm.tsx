"use client";

import { Button } from "@/components/ui";
import { useState } from "react";

type Mode = "login" | "signup";

interface AuthFormProps {
  onSuccess: () => void;
  onSwitchMode: (mode: Mode) => void;
  mode: Mode;
}

export function AuthForm({ onSuccess, onSwitchMode, mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    // basic client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }
    if (mode === "signup") {
      if (mobile && !/^\+?[1-9]\d{1,14}$/.test(mobile)) {
        setError("Please enter a valid mobile number");
        setLoading(false);
        return;
      }
      const body: Record<string, unknown> = { email, password };
      if (name) body.name = name;
      if (mobile) body.mobile = mobile;
      if (address) body.address = address; // now storing address string
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      setLoading(false);
      if (!res.ok) {
        setError(data.error ?? "Failed");
        return;
      }
      onSuccess();
      window.location.reload();
      return;
    } else {
      const body: Record<string, unknown> = { email, password };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      setLoading(false);
      if (!res.ok) {
        setError(data.error ?? "Failed");
        return;
      }
      onSuccess();
      window.location.reload();
      return;
    }
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
      {mode === "signup" && (
        <>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Full Name (optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#3D9AC3] focus:border-[#3D9AC3] transition-all duration-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Mobile Number (optional)
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#3D9AC3] focus:border-[#3D9AC3] transition-all duration-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Address (optional)
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City, Country"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#3D9AC3] focus:border-[#3D9AC3] transition-all duration-200 outline-none"
            />
          </div>
        </>
      )}
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
