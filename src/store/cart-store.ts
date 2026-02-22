"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "@/types";

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          const items = existing
            ? state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
              )
            : [...state.items, { ...product, quantity }];
          return { items };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) return { items: state.items.filter((i) => i.id !== productId) };
          return {
            items: state.items.map((i) =>
              i.id === productId ? { ...i, quantity } : i
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    { name: "srisubham-cart" }
  )
);
