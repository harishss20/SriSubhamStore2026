"use client";

import { useEffect, useState } from "react";

import { createPortal } from "react-dom";
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

    {isZoomOpen &&
  typeof window !== "undefined" &&
  createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center"
      onClick={() => setIsZoomOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl h-[80vh] flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={resolveImageUrl(images[current])}
          alt={`${alt} zoom`}
          className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
        />

        <button
          onClick={() => setIsZoomOpen(false)}
          className="absolute top-4 right-4 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  )}
    </>
  );
}