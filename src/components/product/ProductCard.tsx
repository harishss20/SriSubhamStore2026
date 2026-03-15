"use client";

import { cn, formatPrice } from "@/lib/utils";

import { Button } from "@/components/ui";
import { ImageSlider } from "./ImageSlider";
import type { Product } from "@/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [current, setCurrent] = useState(0);
  const images = product.images?.length ? product.images : [""];

  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="aspect-square overflow-hidden rounded-xl bg-zinc-100">
        <ImageSlider
          image={images[current]}
          alt={product.name}
          className="w-full h-full"
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            onClick={prev}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 bg-white shadow hover:bg-zinc-50"
          >
            ←
          </button>

          <span className="text-sm text-zinc-500">
            {current + 1} / {images.length}
          </span>

          <button
            onClick={next}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 bg-white shadow hover:bg-zinc-50"
          >
            →
          </button>
        </div>
      )}

      <h3 className="mt-4 text-lg font-semibold text-zinc-900">
        {product.name}
      </h3>

      <p className="text-sm text-zinc-500 line-clamp-2">
        {product.description}
      </p>

      <p className="mt-2 font-semibold text-[#3D9AC3]">
        {formatPrice(product.price)}
      </p>

      <Button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full"
      >
        Add
      </Button>
    </article>
  );
}