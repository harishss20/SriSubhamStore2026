"use client";

import { Button, Modal } from "@/components/ui";
import { useEffect, useState } from "react";

import { Address } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setMobile(user.mobile || "");
        if (user.addresses && user.addresses.length) {
          setSelectedAddressId(user.addresses[0]._id);
        }
      }, 0);
    }
  }, [user]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!user) {
    router.push("/login");
    return null;
  }

  const chosenAddress =
    user.addresses?.find((a: Address) => a._id === selectedAddressId)?.value ||
    "";

  const placeOrder = async () => {
    setError("");
    setErrorModal(false);
    setLoadingOrder(true);

    const address = user.addresses?.find(
      (a: Address) => a._id === selectedAddressId
    )?.value;

    if (!address) {
      setError("Please select or enter a delivery address");
      setLoadingOrder(false);
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        total: getTotalPrice(),
        shippingAddress: address,
        contactPhone: mobile,
      }),
    });

    const data = await res.json();

    if (data.success) {
      clearCart();
      setOrderPlaced(true);
    } else {
      setError(data.error || "Failed to place order");
      setErrorModal(true);
    }

    setLoadingOrder(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-zinc-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-14 tracking-tight text-zinc-900">
          Secure Checkout
        </h1>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-zinc-200 p-10 space-y-12">

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <p className="text-base text-zinc-800">{user.name || user.email}</p>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile number"
                className="w-full rounded-xl border border-zinc-300 px-5 py-4 focus:ring-2 focus:ring-black focus:outline-none transition"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Our Address</h2>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
                <p className="font-semibold text-zinc-900 text-lg">
                  No. 89, Aranmanai Street
                </p>
                <p className="text-zinc-700 mt-1">Vadakarai</p>
                <p className="text-zinc-700">Periyakulam – 625601</p>
                <p className="text-zinc-500 text-sm mt-2">Tamil Nadu, India</p>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-zinc-200 p-8 h-fit sticky top-24">

            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {chosenAddress && (
              <div className="mb-6 text-sm text-zinc-700 leading-relaxed">
                <p className="font-medium text-zinc-900 mb-2">
                  Delivering to:
                </p>
                <div>
                  {chosenAddress.split("\n").map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-green-50 border border-green-300 text-green-800 text-center font-semibold text-sm tracking-wide">
              💵 Cash or UPI accepted only at the time of delivery. No online payments.
            </div>

            <Button
              onClick={placeOrder}
              disabled={loadingOrder}
              className="w-full mt-8 py-4 text-base"
            >
              {loadingOrder ? "Placing Order..." : "Place Order"}
            </Button>

          </div>
        </div>

        <Modal
          isOpen={errorModal}
          onClose={() => setErrorModal(false)}
          title="Checkout Error"
        >
          <p className="text-red-600">{error}</p>
          <div className="mt-4 text-center">
            <Button onClick={() => setErrorModal(false)}>Close</Button>
          </div>
        </Modal>

        <Modal
          isOpen={orderPlaced}
          onClose={() => router.push("/")}
          title="Order Successful"
        >
          <p>Your order has been placed successfully!</p>
          <div className="mt-4 text-center">
            <Button onClick={() => router.push("/")}>
              Go to Home
            </Button>
          </div>
        </Modal>

      </div>
    </div>
  );
}