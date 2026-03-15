"use client";

import { cn, formatPrice } from "@/lib/utils";

import { Button } from "@/components/ui";
import { ImageSlider } from "./ImageSlider";
import type { Product } from "@/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuy?: (product: Product) => void;
  isLoggedIn?: boolean;
  index?: number;
  compact?: boolean;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [current, setCurrent] = useState(0);
  const images = product.images?.length ? product.images : [""];

  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">

        <ImageSlider
          image={images[current]}
          alt={product.name}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Zoom hint */}
        <span className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-xs shadow opacity-0 group-hover:opacity-100 transition">
          🔍
        </span>
      </div>

      {/* IMAGE CONTROLS */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            onClick={prev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition hover:bg-zinc-50"
          >
            ←
          </button>

          <span className="text-xs text-zinc-500">
            {current + 1}/{images.length}
          </span>

          <button
            onClick={next}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition hover:bg-zinc-50"
          >
            →
          </button>
        </div>
      )}

      {/* PRODUCT INFO */}
      <div className="mt-4 space-y-2">
        <h3 className="text-base font-semibold text-zinc-900 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <p className="text-lg font-bold text-[#3D9AC3]">
            {formatPrice(product.price)}
          </p>

          <span className="text-xs bg-[#3D9AC3]/10 text-[#3D9AC3] px-2 py-1 rounded-md">
            Fresh
          </span>
        </div>
      </div>

      {/* ADD BUTTON */}
      <Button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a] text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
      >
        Add to Cart
      </Button>
    </article>
  );
}