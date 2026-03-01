import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/order/${params.id}`)
      .then((r) => r.json())
      .then((data) => setOrder(data.order))
      .catch(console.error);
  }, [params.id]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Order Received</h1>
      <pre className="bg-zinc-100 p-4 rounded">{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
}
