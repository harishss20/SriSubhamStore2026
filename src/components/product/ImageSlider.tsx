"use client";

import { useEffect, useState } from "react";

import { resolveImageUrl } from "@/lib/utils";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  autoSlideInterval?: number;
}

export function ImageSlider({
  images,
  alt,
  className = "",
  autoSlideInterval = 3000,
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const total = images.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    if (total <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [total, autoSlideInterval, isHovered]);

  if (!images.length) return null;

  return (
    <>
      <div
        className={`group relative size-full overflow-hidden bg-zinc-100 cursor-zoom-in ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsZoomOpen(true)}
      >
        <img
          src={resolveImageUrl(images[current])}
          alt={`${alt} - image ${current + 1}`}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
                    i === current
                      ? "bg-[#3D9AC3] scale-125"
                      : "bg-white/70 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resolveImageUrl(images[current])}
              alt={`${alt} zoom`}
              className="w-full h-full object-contain rounded-lg"
            />

            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-3 right-3 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
            >
              ✕
            </button>

            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  ←
                </button>

                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}