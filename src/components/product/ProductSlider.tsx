"use client";

import { useEffect, useRef, useState } from "react";

import type { Product } from "@/types";
import { resolveImageUrl } from "@/lib/utils";

interface ProductSliderProps {
  products: Product[];
  autoSlideInterval?: number;
}

export function ProductSlider({
  products,
  autoSlideInterval = 3000,
}: ProductSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slides = products.flatMap((p) =>
    (p.images?.length ? p.images : []).map((img) => ({
      product: p,
      img,
    }))
  );

  const total = slides.length;

  const next = () => {
    setCurrent((c) => (c + 1) % total);
  };

  const prev = () => {
    setCurrent((c) => (c - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, autoSlideInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [total, autoSlideInterval, isPaused]);

  const slide = slides[current];

  if (!products.length || total === 0) return null;

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
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

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === current
                ? "bg-black scale-110"
                : "bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}