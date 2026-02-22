import { getProducts } from "@/services/products";
import { ProductsContent } from "@/components/products/ProductsContent";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <main className="min-h-screen bg-[#fafafa] py-10">
      <ProductsContent products={products} />
    </main>
  );
}
