"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui";
import { ImageSlider } from "./ImageSlider";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuy?: (product: Product) => void;
  isLoggedIn?: boolean;
  index?: number;
  compact?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onBuy,
  isLoggedIn = false,
  index = 0,
  compact = false,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const images = product.images?.length ? product.images : [""];

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#3D9AC3]/30",
        "animate-[fade-in-up_0.5s_ease-out_both]",
        compact ? "p-3" : "p-5"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={cn(
          "aspect-square overflow-hidden rounded-lg bg-zinc-100 transition-transform duration-500 group-hover:scale-[1.02]",
          compact ? "mb-2" : "mb-4 rounded-xl"
        )}
      >
        <ImageSlider images={images} alt={product.name} className="w-full h-full" />
      </div>
      <h3
        className={cn(
          "truncate font-semibold text-zinc-900 transition-colors duration-200 group-hover:text-[#3D9AC3]",
          compact ? "mb-0.5 text-sm" : "mb-1 text-lg"
        )}
      >
        {product.name}
      </h3>
      <p className={cn("line-clamp-2 text-zinc-500", compact ? "text-xs" : "text-sm")}>
        {product.description}
      </p>
      <p className={cn("font-semibold text-[#3D9AC3]", compact ? "mt-1 text-sm" : "mt-2 text-base")}>
        {formatPrice(product.price)}
      </p>
      <div className={cn("flex flex-wrap gap-1.5", compact ? "mt-3" : "mt-5")}>
        <Button
          size="sm"
          onClick={handleAddToCart}
          className={compact ? "min-w-0 flex-1 px-2 py-1.5 text-xs" : "min-w-[100px] flex-1"}
        >
          {added ? "Added ✓" : "Add"}
        </Button>
        {onBuy && (
          <Button
            size="sm"
            variant="outline"
            disabled={!isLoggedIn}
            onClick={() => onBuy(product)}
            className={compact ? "px-2 py-1.5 text-xs" : undefined}
          >
            Buy
          </Button>
        )}
      </div>
    </article>
  );
}
