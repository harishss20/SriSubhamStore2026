"use client";

import { useState } from "react";
import { resolveImageUrl } from "@/lib/utils";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageSlider({ images, alt, className = "" }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;

  const img = images[current];
  const total = images.length;
  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  return (
    <div className={`relative size-full overflow-hidden bg-zinc-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveImageUrl(img)}
        alt={`${alt} - image ${current + 1}`}
        key={current}
        className="size-full object-cover animate-[fade-in_0.3s_ease-out]"
      />
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:bg-white text-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-zinc-200/50"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:bg-white text-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-zinc-200/50"
            aria-label="Next image"
          >
            →
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? "bg-[#3D9AC3] scale-125" : "bg-white/70 hover:bg-white/90"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
