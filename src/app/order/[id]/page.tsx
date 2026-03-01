"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`/api/order/${params.id}`)
      .then((r) => r.json())
      .then((data) => setOrder(data.order))
      .catch(console.error);
  }, [params.id]);

  if (!order) return <p>Loading order...</p>;

  const capitalize = (s?: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Order #{order._id}
      </h1>
      {order.status && (
        <p className="text-center text-sm uppercase tracking-wide text-zinc-700">
          Status: <span className="font-semibold">{capitalize(order.status)}</span>
        </p>
      )}

      <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Items</h2>
        <div className="space-y-2">
          {order.items.map((itm, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{itm.name} × {itm.quantity}</span>
              <span>{formatPrice(itm.price * itm.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-md p-6 space-y-2">
        <h2 className="text-xl font-semibold">Delivery</h2>
        <p>{order.shippingAddress}</p>
        {order.contactPhone && <p>Contact: {order.contactPhone}</p>}
      </section>
    </div>
  );
}
