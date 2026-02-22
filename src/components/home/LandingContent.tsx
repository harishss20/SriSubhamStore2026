"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { ProductSlider, ProductCard } from "@/components/product";
import { Modal } from "@/components/ui";
import { useCartStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";

interface LandingContentProps {
  products: Product[];
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const BUY_MODAL_MESSAGE =
  "You can buy this product soon in our official SrisubhamStores app. Launching soon!";

const FEATURES: Feature[] = [
  { icon: "🥛", title: "Fresh Daily", desc: "Sourced every morning" },
  { icon: "🌾", title: "Farm Direct", desc: "Straight from local farms" },
  { icon: "✓", title: "100% Pure", desc: "No additives ever" },
];

export function LandingContent({ products }: LandingContentProps) {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const { addItem } = useCartStore();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <section className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f0f9ff_0%,#e0f2fe_30%,#fafafa_70%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#3D9AC3]/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#3D9AC3]/5 blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%233D9AC3%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />

        <div className="relative container mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#3D9AC3]/20 bg-white/80 px-4 py-2 text-sm font-medium text-[#2d7a9a] shadow-sm backdrop-blur-sm mb-6 animate-[fade-in-up_0.6s_ease-out]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D9AC3] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D9AC3]" />
                </span>
                Fresh deliveries daily
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 animate-[fade-in-up_0.6s_ease-out_0.1s_both]">
                Pure dairy,
                <span className="block mt-1 bg-gradient-to-r from-[#3D9AC3] via-[#2d7a9a] to-[#3D9AC3] bg-clip-text text-transparent animate-[fade-in-up_0.6s_ease-out_0.15s_both]">
                  pure delight
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-zinc-600 leading-relaxed mx-auto lg:mx-0 animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
                Farm-fresh milk and butter, delivered to your doorstep. Simple, honest, delicious.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-[fade-in-up_0.6s_ease-out_0.25s_both]">
                <Link
                  href={ROUTES.products}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#3D9AC3]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#3D9AC3]/30 hover:-translate-y-0.5"
                >
                  Shop Products
                </Link>
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 px-8 py-4 text-base font-semibold text-zinc-700 transition-all duration-300 hover:border-[#3D9AC3] hover:text-[#3D9AC3] hover:bg-[#3D9AC3]/5"
                >
                  View Collection
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 animate-[fade-in_0.8s_ease-out_0.2s_both]">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#3D9AC3]/20 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border-2 border-white/80 bg-white/90 shadow-2xl shadow-zinc-300/50 backdrop-blur-sm ring-1 ring-zinc-200/50">
                  <ProductSlider products={products} />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/30 transition-all duration-300 hover:shadow-xl hover:border-[#3D9AC3]/30 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3D9AC3]/10 to-[#3D9AC3]/5 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">{f.title}</h3>
                  <p className="text-sm text-zinc-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
              Our Products
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Handpicked fresh dairy, straight from trusted farms
            </p>
            <div className="mt-6 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
                onBuy={() => setBuyModalOpen(true)}
                isLoggedIn={isLoggedIn}
                index={i}
                compact
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href={ROUTES.products}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#3D9AC3] px-8 py-4 text-base font-semibold text-[#3D9AC3] transition-all duration-300 hover:bg-[#3D9AC3] hover:text-white"
            >
              View All Products
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#3D9AC3]/10 via-[#3D9AC3]/5 to-transparent">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Ready to taste the difference?
          </h2>
          <p className="mt-4 text-zinc-600">
            Join thousands of families who trust SrisubhamStores for fresh dairy every day.
          </p>
          <Link
            href={ROUTES.products}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-[#3D9AC3]/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      <Modal isOpen={buyModalOpen} onClose={() => setBuyModalOpen(false)}>
        <p className="text-zinc-600 leading-relaxed">{BUY_MODAL_MESSAGE}</p>
      </Modal>
    </>
  );
}
