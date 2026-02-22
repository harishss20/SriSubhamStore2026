"use client";

import { getProducts } from "@/services/products";
import type { Product } from "@/types";

export function useProducts(): { products: Product[]; loading: false; error: null } {
  const products = getProducts();
  return { products, loading: false, error: null };
}
