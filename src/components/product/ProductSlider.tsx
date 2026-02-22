"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { resolveImageUrl } from "@/lib/utils";

interface ProductSliderProps {
  products: Product[];
}

export function ProductSlider({ products }: ProductSliderProps) {
  const [current, setCurrent] = useState(0);

  if (!products.length) return null;

  const slides = products.flatMap((p) =>
    (p.images?.length ? p.images : []).map((img) => ({ product: p, img }))
  );
  const total = slides.length;
  if (total === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  const slide = slides[current];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current}
          src={resolveImageUrl(slide.img)}
          alt={slide.product.name}
          className="w-full h-full object-cover animate-[fade-in_0.4s_ease-out]"
        />
      </div>
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95 border border-zinc-200/50"
        aria-label="Previous"
      >
        ←
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95 border border-zinc-200/50"
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
}
