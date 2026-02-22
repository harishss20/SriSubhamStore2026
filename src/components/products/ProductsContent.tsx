"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product";
import { Modal } from "@/components/ui";
import { useCartStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";

interface ProductsContentProps {
  products: Product[];
}

const BUY_MODAL_MESSAGE =
  "You can buy this product soon in our official SrisubhamStores app. Launching soon!";

export function ProductsContent({ products }: ProductsContentProps) {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl animate-[fade-in-up_0.5s_ease-out]">
            All Products
          </h1>
          <p className="mt-1 text-zinc-500 animate-[fade-in-up_0.5s_ease-out_0.05s_both]">
            Browse our full dairy collection
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
              onBuy={() => setBuyModalOpen(true)}
              isLoggedIn={isLoggedIn}
              index={i}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={buyModalOpen} onClose={() => setBuyModalOpen(false)}>
        <p className="text-zinc-600">{BUY_MODAL_MESSAGE}</p>
      </Modal>
    </>
  );
}
