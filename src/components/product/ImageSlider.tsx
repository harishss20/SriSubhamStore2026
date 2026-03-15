"use client";

import { useRef, useState } from "react";

import { createPortal } from "react-dom";
import { resolveImageUrl } from "@/lib/utils";

interface ImageSliderProps {
  image: string;
  alt: string;
  className?: string;
}

export function ImageSlider({ image, alt, className = "" }: ImageSliderProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [showLens, setShowLens] = useState(false);
  const [lensStyle, setLensStyle] = useState({ left: 0, top: 0 });
  const [zoomedStyle, setZoomedStyle] = useState({ backgroundPosition: "0% 0%" });

  const containerRef = useRef<HTMLDivElement>(null);

  const zoomLevel = 2.8;
  const lensSize = 140;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let lensX = x - lensSize / 2;
    let lensY = y - lensSize / 2;

    lensX = Math.max(0, Math.min(lensX, rect.width - lensSize));
    lensY = Math.max(0, Math.min(lensY, rect.height - lensSize));

    setLensStyle({ left: lensX, top: lensY });

    const bgX = (lensX / (rect.width - lensSize)) * 100;
    const bgY = (lensY / (rect.height - lensSize)) * 100;

    setZoomedStyle({
      backgroundPosition: `${bgX}% ${bgY}%`,
    });
  };

  const imageUrl = resolveImageUrl(image);

  return (
    <>
      <div
        ref={containerRef}
        className={`relative size-full overflow-hidden bg-white cursor-crosshair ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        onClick={() => setIsZoomOpen(true)}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="size-full object-cover bg-white"
          draggable={false}
        />

        {showLens && (
          <div
            className="absolute border-2 border-white/80 bg-black/10 pointer-events-none z-10"
            style={{
              width: lensSize,
              height: lensSize,
              left: lensStyle.left,
              top: lensStyle.top,
            }}
          />
        )}

        {showLens && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
            <div
              className="w-72 h-72 md:w-96 md:h-96 border-4 border-white rounded-xl overflow-hidden shadow-2xl bg-white"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${zoomLevel * 100}%`,
                backgroundPosition: zoomedStyle.backgroundPosition,
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        )}
      </div>

      {isZoomOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
            onClick={() => setIsZoomOpen(false)}
          >
            <img
              src={imageUrl}
              alt={alt}
              className="max-h-[90vh] max-w-full object-contain rounded-xl bg-white"
            />
          </div>,
          document.body
        )}
    </>
  );
}