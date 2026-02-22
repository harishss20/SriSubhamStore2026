import { getProducts } from "@/services/products";
import { LandingContent } from "@/components/home/LandingContent";

export default function Home() {
  const products = getProducts();

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <LandingContent products={products} />
    </main>
  );
}
