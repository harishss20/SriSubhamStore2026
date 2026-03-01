"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders))
      .catch(console.error);
  }, []);

  if (orders && orders.length === 0)
    return <p className="text-center py-20">You have no orders yet.</p>;

  const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <ul className="space-y-6">
        {orders?.map((o) => (
          <li
            key={o._id}
            className="border rounded-xl p-6 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <div

                  className="text-lg font-semibold text-[#3D9AC3]"
                >
                  Order #{o._id}
                </div>
                <p className="text-sm text-zinc-600">
                  {new Date(o.createdAt).toLocaleString()}
                </p>
              </div>
              {o.status && (
                <span className="px-3 py-1 rounded-full text-xs font-medium uppercase bg-zinc-100 text-zinc-700">
                  {capitalize(o.status)}
                </span>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center pt-3">
              <p className="text-sm text-zinc-600">
                {o.items.length} item{o.items.length > 1 ? "s" : ""}
              </p>

              <p className="text-base font-semibold text-zinc-900">
                {formatPrice(o.total)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
