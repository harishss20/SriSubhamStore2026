"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice, resolveImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui";
import { AuthForm } from "./AuthForm";
import { ROUTES } from "@/lib/constants";

export function CartContent() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { user, loading: authLoading, isLoggedIn } = useAuth();

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto space-y-5 animate-[fade-in_0.3s_ease-out]">
          <div className="h-9 w-56 bg-zinc-200/80 rounded-xl animate-pulse" />
          <div className="h-4 w-full bg-zinc-200/80 rounded-lg animate-pulse" />
          <div className="h-12 w-full bg-zinc-200/80 rounded-xl animate-pulse" />
          <div className="h-12 w-full bg-zinc-200/80 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 max-w-md py-12 animate-[fade-in-up_0.4s_ease-out]">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Login</h1>
        <p className="text-zinc-600 mb-6">Sign in to view your cart and checkout.</p>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-lg shadow-zinc-200/50">
          <AuthForm
            mode={authMode}
            onSuccess={() => {}}
            onSwitchMode={setAuthMode}
          />
        </div>
        <p className="mt-4 text-center text-sm text-zinc-500">
          <Link
            href={ROUTES.products}
            className="text-[#3D9AC3] hover:underline transition-colors duration-200"
          >
            Browse products
          </Link>
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-16 animate-[fade-in-up_0.4s_ease-out]">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-4">Your Cart</h1>
        <p className="text-zinc-600 mb-6">Your cart is empty.</p>
        <Link href={ROUTES.products}>
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 animate-[fade-in_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Your Cart</h1>
        <p className="text-sm text-zinc-500">Logged in as {user?.email}</p>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#3D9AC3]/20 animate-[slide-in_0.3s_ease-out_both]"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageUrl(item.images?.[0] ?? "")}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-zinc-900">{item.name}</h3>
              <p className="text-zinc-700 font-medium">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-9 h-9 rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:border-[#3D9AC3]/30 transition-all duration-200 active:scale-95"
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-9 h-9 rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:border-[#3D9AC3]/30 transition-all duration-200 active:scale-95"
              >
                +
              </button>
            </div>
            <p className="font-medium text-zinc-900 w-24 text-right">
              {formatPrice(item.price * item.quantity)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm animate-[fade-in-up_0.3s_ease-out]">
        <p className="text-xl font-bold text-zinc-900">
          Total: {formatPrice(getTotalPrice())}
        </p>
      </div>
    </div>
  );
}
